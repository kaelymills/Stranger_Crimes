'use strict';

var format_names = require('../testServer.js'),
  should = require('chai').should();

describe("format_names", function () {

  it("should throw if user name empty", function () {
    (function () { format_names("") }).should.throw(Error);
  })

  it("should throw error if email empty ", function () {
    (function () { format_names("") }).should.throw(Error);
  });

  it("should throw error if password empty", function () {
    (function () { format_names("") }).should.throw(Error);
  });
})