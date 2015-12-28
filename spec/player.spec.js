var common = require('../common');
var Player = require('../player');
var expect = common.expect;

var testPlayer;

beforeEach(function() {
    testPlayer = new Player(42, 420);
});

describe("Getting player location", function() {
    it("Gets the original setting of the x and y coordinates", function() {
        expect(testPlayer.getX()).equals(42);
        expect(testPlayer.getY()).equals(420);
    });
});

describe("Attributes", function() {

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

describe("Inventory", function() {
    beforeEach(function() {

    });

    it("Returns all of the inventory if there are no arguments", function() {
        var inv = testPlayer.getInventory();
        var expectedInv = "Inventory: \nfeet: a pair of sandals\nheld: a torch\nbody: some rags\n";

        expect(inv).to.eql(expectedInv);
    });

    it("Returns the item in one specific inventory spot if there is a key passed in", function() {
        var inv = testPlayer.getInventory('body');
        var expectedBodyItem = {
            name: 'some rags',
            location: 'body',
            symbol: '#',
            effects: {
                defense: 1,
                speed: -5
            }
        }
        
        expect(inv).to.eql(expectedBodyItem);
    })

});