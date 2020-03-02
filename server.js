require('dotenv').config()
const express = require("express");
const cors = require("cors")
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const path = require("path")
const axios = require("axios");
const Stat = require("./models/stats");

const PORT = process.env.PORT || 3001;
// const whitelist = ['https://covid-update.herokuapp.com/'];
// const corsOptions = {
//   credentials: true,
//   origin: (origin, callback) => {
//     if(whitelist.includes(origin))
//       return callback(null, true)

//       callback(new Error('Not allowed by CORS'));
//   }
// }

const http = require("http");
// server instance
const server = http.createServer(app);
const socketIO = require("socket.io").listen(server)

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));



// app.use(cors(corsOptions));
app.use(cors());
// Add routes, both API and view
app.use(routes);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/covidupdate", {useNewUrlParser: true});



// socket using server instance


socketIO.on("connection", socket =>{
  console.log("New client connected" + socket.id); 
  let url = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/"

  socket.on("update_data", check => {
    let date_ob = new Date()
    let hours = date_ob.getHours();

    if (hours < 19) {
      date_ob.setDate(date_ob.getDate() - 1);
    }
    let year = date_ob.getFullYear();
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let day = ("0" + (date_ob.getDate())).slice(-2);
    hours = date_ob.getHours();
    


    let tail = month + "-" + day + "-" + year + ".csv"
      axios.get(url+tail).then(function (response) {
        var responseList = response.data.split(/\r?\n/);
        for (i = 0; i < responseList.length; i++) {
            responseList[i] = responseList[i].split(",");
            // Certain region entries contain a , creating an extra element
            if (responseList[i].length === 9) {
                var temp = responseList[i][0] + "," + responseList[i][1]
                responseList[i].shift();
                responseList[i][0] = temp;
            }
            
        }
        responseList.shift();
        responseList.pop();
        let promises = [];
        for (let i = 0; i < responseList.length; i++) {
            var query = {};
            query.region = responseList[i][0];
            query.country = responseList[i][1];
            var statBlock = {};
            statBlock.region = responseList[i][0];
            statBlock.country = responseList[i][1];
            statBlock.cases = responseList[i][3];
            statBlock.deaths = responseList[i][4];
            statBlock.recovered = responseList[i][5];
            statBlock.latitude = responseList[i][6];
            statBlock.longitude = responseList[i][7];
            const promise = Stat.findOneAndUpdate(query, statBlock, {upsert:true})
            promises.push(promise);
        }
        Promise.all(promises).then(() => {
          socketIO.sockets.emit("new_data");
        });
      });
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
            if (responseList[i].length === 9) {
                var temp = responseList[i][0] + "," + responseList[i][1]
                responseList[i].shift();
                responseList[i][0] = temp;
            }
            
        }
        responseList.shift();
        responseList.pop();
        let promises = [];
        for (let i = 0; i < responseList.length; i++) {
          var query = {};
          query.region = responseList[i][0];
          query.country = responseList[i][1];
          var statBlock = {};
          statBlock.region = responseList[i][0];
          statBlock.country = responseList[i][1];
          statBlock.cases = responseList[i][3];
          statBlock.deaths = responseList[i][4];
          statBlock.recovered = responseList[i][5];
          statBlock.latitude = responseList[i][6];
          statBlock.longitude = responseList[i][7];
          const promise = Stat.findOneAndUpdate(query, statBlock, {upsert:true})
          promises.push(promise);
      }
        Promise.all(promises).then(() => {
          socketIO.sockets.emit("new_data");
        });
      });
    }
  }, 60*60*100);

});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// Start the API server
server.listen(PORT, function() {
  console.log(`Server now listening on PORT ${PORT}!`);
});
