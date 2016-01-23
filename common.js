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
exports.levels = ['mine']; //TODO: put this in maps module

exports.isUndefined = isUndefined;
exports.extend = extend;
exports.noop = noop;

function noop(){}

function extend(obj, extension) {
    obj = obj || {};
    for (var extra in extension) {
        if (!obj.hasOwnProperty(extra)) {
            obj[extra] = extension[extra];
        }
    }
    return obj;
}

function isUndefined(obj) {
    return (typeof obj === "undefined" || obj === null);
}