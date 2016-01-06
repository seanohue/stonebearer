var Entity = require('../entity.js');
var common = require('../common.js');
var expect = common.expect;

var drawStub = function() {
    console.log("Drawing");
};

describe("Initialization of entity", function() {

    var testEntity = new Entity(42, 420, drawStub);
    it("should have the right speed", function() {
        expect(testEntity.getSpeed()).to.equal(100);
    });

})