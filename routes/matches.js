/**
* matches action
*/
var model = require('../schema/schema.js');

var matches = {};

matches.getAll = function(req,res) {
    model.Match.find().exec(function(error, matches) {
        res.send(matches);
    });
};

matches.getById = function(req, res) {
    model.Match.findById(req.params.id).exec(function(error, match) {
        res.send(match);
    });
};


module.exports = matches;