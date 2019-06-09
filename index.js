
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

const product = require('./route/routes');

var axios = require("axios");
var cors = require('cors');
var dotenv = require('dotenv');

var controller = require('./controller/controller');
var db = require('./config/connection.js')

var port = process.env.PORT || 4000;;

// Initialize Express

var path = require('path');

var app = express();
app.use(cors());

require('dotenv').config();

app.use("/products", product);

// app.use(express.static(path.join(__dirname+ 'public')));
// app.use(express.static('public'));
// app.use(express.static(path.join(__dirname, 'client/build')));

if(process.env.NODE_ENV === "production")
{
  app.use(express.static('client/build'));
  app.get('*', (req,res)=>{
    res.sendFile(path.join(__dirname, 'client','build','index.html'));
  })
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.Promise = global.Promise;
mongoose.connect(db.connection,{
// mongoose.connect('mongodb://islam:islammongo1@ds127954.mlab.com:27954/inventory', {

    }).then(() => {
      console.log("Successfully connected to the database");
    }).catch(err => {
      console.log('Could not connect to the database. Exiting now...', err);
      process.exit();
});

// Start the server
app.listen(port, function () {
  console.log("App running on port " + port + "!");
});