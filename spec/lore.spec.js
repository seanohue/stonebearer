var Lore = require('../lore.js');
var common = require('../common.js');
var expect = common.expect;

var testMsg;


describe("Random item encounter ->", function() {

    it("Returns a message object from pickupMsg if openInventorySpot is defined", function() {
        testMsg = Lore.pickupMsg({
            name: "a potato cannon"
        }, 'equip');

        expect(testMsg).to.have.ownProperty('text');
        expect(testMsg).to.have.ownProperty('duration');

    });

    it("Returns a message object if openInventorySpot is undefined", function() {
        testMsg = Lore.pickupMsg({
            name: "a potato cannon"
        });

        expect(testMsg).to.have.ownProperty('text');
        expect(testMsg).to.have.ownProperty('duration');

    });

    it("Returns undefined if item is undefined.", function() {
        testMsg = Lore.pickupMsg();
        expect(testMsg).to.equal(undefined);
    });


});