var common = require('../common');
var Player = require('../player');
var expect = common.expect;

var testPlayer

describe("Attributes", function() {
    beforeEach(function() {
        testPlayer = new Player(42, 420);
        console.log(testPlayer);
    });

    it("Returns all of the attributes if there are no arguments", function() {
        var attr = testPlayer.getAttributes();
        var expectedAttr = "Attributes: \nsight: 6\ndefense: 2\ndamage: 2\nhealth: 10\nspeed: 100\n";

        expect(attr).to.eql(
            expectedAttr);
    });

    it("Returns an integer attribute when the key to that attribute is passed in.", function() {
        var attr = testPlayer.getAttributes('defense');
        expect(attr).to.eql(2);
    });

});