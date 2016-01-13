var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
chai.should();
chai.use(sinonChai);


exports.chai = chai;
exports.sinon = sinon;

exports.assert = chai.assert;
exports.expect = chai.expect;

exports.gameDir = '../game/';

exports.levels = ['mine'];

exports.isJunk = isJunk;

exports.extend = extend;

function extend(obj, extension) {
    obj = obj || {};
    for (var extra in extension) {
        if (!obj.hasOwnProperty(extra)) {
            obj[extra] = extension[extra];
        }
    }
    return obj;
}

function isJunk(obj) {
    return (typeof obj === "undefined" || obj === null);
}