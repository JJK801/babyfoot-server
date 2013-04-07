var model = require('../schema/schema.js');

var tables = {};
/**
* tables action
*/
tables.getAll = function(req, res) {
    model.Table.find().exec(function (error, tables) {
        res.send(tables);
    });
};

tables.getById = function(req, res) {
    model.Table.findById(req.params.id).exec(function (error, table) {
        if (error) {
            throw error;
        }
        if (!table) {
            res.send(404);
        }
        res.send(table);
    });
};

tables.new = function(req, res) {
    var table = new model.Table();
    table.label = req.body.label;

    table.save(function (err) {
        if (err) {
            throw err;
        }

        res.send(table);
    });


};

tables.update = function(req, res) {
    model.Table.findById(req.params.id).exec(function (error, table) {

        if (error) {
            throw error;
        }

        if (!table) {
            res.send(404);
            return;
        }

		table.label = req.body.label;
		table.save();

    	res.send(table);

    });
};

tables.remove = function(req, res) {
    model.Table.findById(req.params.id).exec(function (error, table) {

        if (error) {
            throw error;
        }

        if (!table) {
            res.send(404);
            return;
        }

        table.remove();

        res.send();


    });
};

module.exports = tables;