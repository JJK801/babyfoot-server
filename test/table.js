var request = require('supertest')
	,mocha = require('mocha');

process.env.NODE_ENV = 'test'

request = request('http://localhost:3000');


// launch server
require('../index.js');

var model = require('../schema/schema.js');

describe('Test table api', function(){

	before(function() {
		model.Table.remove({}, function(err) {

		});
	});

	it('get /tables', function(done){
		request.get('/tables').expect(200, done);
	});

	it('post new /tables', function(done){
		request.post('/tables')
			.send({label: 'table n°1'})
			.expect(200, done);
	});

	it('get /table/:id', function(done){
		model.Table.findOne(function(error, table) {
			if (error) {
				throw error;
			}

			request.get('/tables/' + table.id)
				.send()
				.expect(200, done);
		});
	});

	it('get /table/:id 404', function(done){
		request.post('/tables/515c710f157a35da41000501')
			.send()
			.expect(404, done);
	});



	it('delete /table/:id', function(done){
		model.Table.findOne(function(error, table) {
			if (error) {
				throw error;
			}

			request.del('/tables/' + table.id)
				.send()
				.expect(200, done);

		});

	});

	it('del /table/:id 404', function(done){
		request.del('/tables/515c710f157a35da41000501')
			.send()
			.expect(404, done);
	});



});