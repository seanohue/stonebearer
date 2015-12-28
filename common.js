var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
chai.should();
chai.use(sinonChai);

// Common options go here as well.

exports.chai = chai;
exports.sinon = sinon;

exports.assert = chai.assert;
exports.expect = chai.expect;