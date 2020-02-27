const express = require("express");
const cors = require("cors")
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();

const axios = require("axios");
const Stat = require("../models/stats");

const PORT = process.env.PORT || 3001;
const whitelist = ['http://localhost:3000'];
const corsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    if(whitelist.includes(origin))
      return callback(null, true)

      callback(new Error('Not allowed by CORS'));
  }
}

const http = require("http");
// server instance
const server = http.createServer(app);
const socketIO = require("socket.io").listen(server)

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));



app.use(cors(corsOptions));
// Add routes, both API and view
app.use(routes);

mongoose.connect("mongodb://localhost/covidupdate", {useNewUrlParser: true});



// socket using server instance


socketIO.on("connection", socket =>{
  console.log("New client connected" + socket.id); 
  let url = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/"

  socket.on("update_data", check => {
    let date_ob = new Date()
    let year = date_ob.getFullYear();
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let day = ("0" + (date_ob.getDate() - 1)).slice(-2);
    let hours = date_ob.getHours();
    

    if (hours >= 19) {
      day = ("0" + date_ob.getDate()).slice(-2);
    }

    let tail = month + "-" + day + "-" + year + ".csv"
    if (check != tail) {
      axios.get(url+tail).then(function (response) {
        var responseList = response.data.split(/\r?\n/);
        for (i = 0; i < responseList.length; i++) {
            responseList[i] = responseList[i].split(",");
            // Certain region entries contain a , creating an extra element
            if (responseList[i].length === 7) {
                var temp = responseList[i][0] + "," + responseList[i][1]
                responseList[i].shift();
                responseList[i][0] = temp;
            }
            
        }
        responseList.shift();
        responseList.pop();
        let promises = [];
        for (let i = 0; i < responseList.length; i++) {
            var statBlock = {};
            statBlock.region = responseList[i][0];
            statBlock.country = responseList[i][1];
            statBlock.cases = responseList[i][3];
            statBlock.deaths = responseList[i][4];
            statBlock.recovered = responseList[i][5];
            const promise = Stat.findOneAndUpdate(statBlock, statBlock, {upsert:true})
            promises.push(promise);
        }
        Promise.all(promises).then(() => {
          console.log("Data updated")
          socketIO.sockets.emit("new_data");
        });
      });
    }
    else {
      console.log("Update requested but no new data");
    }
  });

  setInterval(() => {
    let date = new Date()
    let year = date.getFullYear();
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);
    let hours = date.getHours();
    let tail = month + "-" + day + "-" + year + ".csv"
    
    if (hours == 19) {
      axios.get(url+tail).then(function (response) {
        var responseList = response.data.split(/\r?\n/);
        for (i = 0; i < responseList.length; i++) {
            responseList[i] = responseList[i].split(",");
            // Certain region entries contain a , creating an extra element
            if (responseList[i].length === 7) {
                var temp = responseList[i][0] + "," + responseList[i][1]
                responseList[i].shift();
                responseList[i][0] = temp;
            }
            
        }
        responseList.shift();
        responseList.pop();
        let promises = [];
        for (let i = 0; i < responseList.length; i++) {
            var statBlock = {};
            statBlock.region = responseList[i][0];
            statBlock.country = responseList[i][1];
            statBlock.cases = responseList[i][3];
            statBlock.deaths = responseList[i][4];
            statBlock.recovered = responseList[i][5];
            const promise = Stat.findOneAndUpdate(statBlock, statBlock, {upsert:true})
            promises.push(promise);
        }
        Promise.all(promises).then(() => {
          socketIO.sockets.emit("new_data");
        });
      });
    }
  }, 60*60*100);

});

// Start the API server
server.listen(PORT, function() {
  console.log(`Server now listening on PORT ${PORT}!`);
});
