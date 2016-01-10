var common = require('../common');
var Game = require('../game');
var Player = require('../player');
var Entity = require('../entity');
var Loot = require('../loot');
var Lore = require('../lore');

describe("Player event handling", function() {
    var testPlayer = new Player(10, 10);

    // TODO: find a way to mock keypress events (stdin?)
    // TODO: add sinon to stub out methonds like stdout to see if they are called as needed.
    
});