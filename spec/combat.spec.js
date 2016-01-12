var common = require('../common');
var gameDir = common.gameDir;
var Player = require(gameDir + 'player');
var Entity = require(gameDir + 'entity');
var Combat = require(gameDir + 'combat');
var expect = common.expect;

var drawStub = function() {
    console.log("Drawing");
};

describe("Combat results object", function() {
    var testPlayer = new Player(10, 10);
    var testEntity = new Entity(10, 10, drawStub);
    var result = new Combat(testPlayer, testEntity);

    it("should have result message with text", function() {
        expect(result).to.have.ownProperty('text');
    });

    it("should have result message with duration", function() {
        expect(result).to.have.ownProperty('duration');
    });

    it("should have a flag for player death set to false by default", function() {
        expect(result.death).to.be.false;
    });

    it("should have a flag for player victory set to false by default", function() {
        expect(result.victory).to.be.false;
    });

});

describe("Various combat scenarios", function() {

    var testPlayer = new Player(10, 10);
    var testEntity = new Entity(10, 10, drawStub);

    it("should return victory if the player kills the enemy", function() {
        testPlayer.attributes.damage = 9001;
        testEntity.attributes.defense = 0;

        var result = new Combat(testPlayer, testEntity);


        expect(result.victory).to.be.true;
    });

    it("should return death if the player is killed", function() {
        testEntity.attributes.damage = 9001;
        testPlayer.attributes.defense = 0;
        testPlayer.attributes.health = 1;

        var result = new Combat(testPlayer, testEntity);


        expect(result.victory).to.be.true;
    });

});