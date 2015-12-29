var common = require('../common');
var Player = require('../player');
var Entity = require('../entity');
var Combat = require('../combat');
var expect = common.expect;

var drawStub = function() {
    console.log("Drawing");
};

describe("Combat should return a results object", function() {
    var testPlayer = new Player(10, 10);
    var testEntity = new Entity(10, 10, drawStub);
    var result = new Combat(testPlayer, testEntity);

    it("should have result message with text", function() {
        expect(result).to.have.ownProperty('text');
    });

});