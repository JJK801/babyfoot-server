var express = require('express');

var app = express();
app.use(express.bodyParser());

var routes = require('./routes/index.js')(app);

app.listen(3000);
