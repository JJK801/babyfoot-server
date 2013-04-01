/**
* Model Schema
*/
var mongoose = require('mongoose')
  , Schema = mongoose.Schema
mongoose.connect('mongodb://localhost/test');

var model = {};

// Babyfoot table
var tableSchema = new Schema({
    label: String
});

model.Table = mongoose.model('Table', tableSchema);

// Babyfoot match
var matchSchema = new Schema({
    startAt: Date,
    endAt: Date,
    table: {type: Schema.Types.ObjectId, ref:'Table'},
    team1: [{type: Schema.Types.ObjectId, ref:'Player'}],
    team2: [{type: Schema.Types.ObjectId, ref:'Player'}]
});

model.Match = mongoose.model('Match', matchSchema);

// Player
var playerSchema = new Schema({
    name: String
});

model.Player = mongoose.model('Player', playerSchema);


module.exports = model;