'use strict'
var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;
var fs = require('fs');
var server = require(__dirname + "/../server");

describe('a root request', function() {
  it('should return an html string', function() {
    chai.request('localhost:3000')
      .get('/')
      .end(function(err, res) {
        expect(err).to.eql(null);

      })
  });
});

describe('the server time request', function() {

  before(function() {
    var d = new Date();
    this.testTime = d.getTime();
  });

  it('should return a later time than test', function(done) {
    chai.request('localhost:3000')
      .get('/time')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.be.above(this.testTime);
        done();
      }).bind(this);
  });

});

