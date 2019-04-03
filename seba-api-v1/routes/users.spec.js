/**
 * users.spec.js
 */
var should = require('should');
var users = require('./users');
const models = require('../models');

var httpMocks = require('node-mocks-http');
var sinon = require('sinon');

describe('users/me', function() {
  before(function() {
    sinon.stub(models.User, 'findOne').returns({
      then: function(fn) {
        fn({
          name: 'seba0',
          email: 'seba0@gmail.com'
        });
      }
    });
  });

  it('should return the statusCode 200', function() {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    users.me(req, res);
    res.statusCode.should.be.equal(200);
  });

  it('should return a user', function() {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    users.me(req, res);
    JSON.parse(res._getData())
      .should.be.instanceOf(Object)
      .and.have.a.property('name');
  });
});
