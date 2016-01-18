var common = require('../common.js');
var gameDir = common.gameDir;
var Lore = require(gameDir + 'lore.js');
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

    it("Returns a string if the item needs to be abandoned", function(){
        testMsg = Lore.abandonMsg({
            name: "a potato cannon"
        });
        expect(testMsg).to.be.a.String;
    });

    it("Returns undefined if item is undefined.", function() {
        testMsg = Lore.pickupMsg();
        expect(testMsg).to.equal(undefined);
    });


});