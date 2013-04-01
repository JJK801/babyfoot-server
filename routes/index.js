/**
* index.js babyfoot-server routing
*/
var model = require('../schema/schema.js');

module.exports = function (app) {

	var tables = require('./tables.js');

	app.get('/tables', tables.getAll);
	app.get('/tables/:id', tables.getById);
	app.post('/tables', tables.new);
	app.put('/tables/:id', tables.update);
	app.delete('/tables/:id', tables.remove);


	var matches = require('./matches.js');
	app.get('/matches', matches.getAll);
	app.get('/matches/:id', matches.getById);

};