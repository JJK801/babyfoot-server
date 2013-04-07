var express = require('express');
var config = require('config');
var app = express();
var mongoose = require('mongoose');

mongoose.connect(config.mongo.connection);


app.use(express.bodyParser());

var routes = require('./routes/index.js')(app);

app.listen(config.express.port);
