var common = require('../common');
var Loot = require('../loot');
var Player = require('../player');
var expect = common.expect;

describe("getting randomized loot", function() {
    var testLoot = Loot.getRandomLoot('mine');

    it("has normal properties that all loot has, ever", function() {
        var typicalLootProperty = {
            'name': '',
            'location': '',
            'symbol': '',
            'effects': ''
        };
        for (var prop in typicalLootProperty) {
            expect(testLoot[prop]).to.exist;
        }
    });
});

describe("getting specific loot", function() {
    var specificLoot = {
        name: 'a miner\'s helmet',
        location: 'head',
        symbol: '^',

        effects: {
            sight: 6,
            defense: 1,
            speed: -2
        }
    };

    it("returns an object equivalent to a specific named item", function() {
        expect(Loot.getSpecificLoot('miner\'s helmet')).to.eql(specificLoot);
    });

    it("returns an object equivalent to a specific symbol for an item", function() {
        expect(Loot.getLootBySymbol('^')).to.eql(specificLoot);
    });

});

describe("onEquip and onRemove functions", function() {

    var basicItem = Loot.getSpecificLoot('miner\'s helmet');

    var initialPlayerState;
    var player = new Player(42, 420);
    initialPlayerState = player;

    it("equips an item and changes player attributes accordingly: ", function() {
    	Loot.onEquip(player, basicItem);
    	var attrString = "Attributes: \nsight: 12\ndefense: 3\ndamage: 2\nhealth: 10\nspeed: 98\n";
        expect(player.getAttributes()).to.equal(attrString);
    });

    it("removes an item and changes player attributes accordingly", function() {
        Loot.onRemove(player, basicItem);

        expect(player.attributes).to.equal(initialPlayerState.attributes);
    });

});