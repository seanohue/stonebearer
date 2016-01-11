var Entity = require('../entity.js');
var common = require('../common.js');
var expect = common.expect;

var drawStub = function() {
    console.log("Drawing");
};

describe("Initialization of entity", function() {

    var testEntity = new Entity(42, 420, drawStub);
    it("should be able to get speed for the scheduler", function() {
        expect(testEntity.getSpeed()).to.equal(100);
    });

    it("should have initialized with default settings", function() {
        var defaultEntity = {
            name: "beast",

            attributes: {
                speed: 100,
                health: 10,
                damage: 2,
                defense: 2
            },
            symbol: "&",
            color: "red",

            action: function() {},
        };

        expect(testEntity.attributes).to.eql(defaultEntity.attributes);
        expect(testEntity._name).to.equal(defaultEntity.name);
        expect(testEntity._color).to.equal(defaultEntity.color);
        expect(testEntity._symbol).to.equal(defaultEntity.symbol);
        expect(testEntity._draw).to.equal(drawStub);

    });

});