var Entity = require('../entity.js');
var common = require('../common.js');
var expect = common.expect;

var drawStub = function() {
    console.log("Drawing");
};
var testEntity;


describe("Initialization of entity", function() {

    var testEntity = new Entity(42, 420, drawStub);
    it("Has the right speed", function() {
        expect(testEntity.getSpeed()).to.equal(100);
    });

})