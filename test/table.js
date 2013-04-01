var chai = require('chai')
	,request = require('supertest')
	,mocha = require('mocha');

var assert = chai.assert;

request = request('http://localhost:3000');

// launch server
require('../index.js');

describe('Test table api', function(){

	it('get /tables', function(done){
		request.get('/tables').expect(200, done);
	});

	it('post new /tables', function(done){
		request.post('/tables')
			.send({label: 'table n°1'})
			.expect(200, done);
	});

});