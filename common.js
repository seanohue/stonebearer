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

// Different levels or floors or whatnot go here, too.
exports.levels = ['mine'];

exports.extend = function extend(obj, extension) {
    obj = obj || {};
    for (extra in extension) {
        if (!obj.hasOwnProperty(extra)) {
            obj[extra] = extension[extra];
        }
    }
    return obj;
}