const express = require("express");
const cors = require("cors")
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
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
});

// Start the API server
server.listen(PORT, function() {
  console.log(`Server now listening on PORT ${PORT}!`);
});
