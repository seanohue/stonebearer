// This is built on the node roguelike tutorial found at http://www.roguebasin.com/index.php?title=Rot.js_tutorial
// Thanks to its author, 'blinkdog'

/*
 * NPM modules
 */

var ROT = require('rot-js');
var keypress = require('keypress');
var inquirer = require("inquirer");



/*
 * Game modules
 */

var Player = require('./player.js');
var Entity = require('./entity.js');
var Loot = require('./loot.js');
var Lore = require('./lore.js');
var Combat = require('./combat.js');
var common = require('./common.js');


/*
 * Game engine/scheduler, methods, and main loop
 */

var Game = {
    display: null,
    map: {},
    engine: null,
    player: null,

    _entities: [],

    init: function() {
        this.display = new ROT.Display({
            width: process.stdout.columns,
            height: process.stdout.rows,
            layout: "term"
        });

        this._generateMap();

        var scheduler = new ROT.Scheduler.Speed();
        this._entities.map(function(entity) {
            scheduler.add(entity, true);
        });

        this.engine = new ROT.Engine(scheduler);
        this.engine.start();
    },

    showMessage: function(message, duration, color) {
        color = color || "%c{#ff0}";
        duration = duration || 1000;
        this.display.drawText(0, 1, (color + message));
        setTimeout((function() {

            //TODO: Use stuff like this for making menus cleaner
            this.display.clear();
            this._drawWholeMap();
            this._entities.map(function(entity) {
                try {
                    entity._draw();
                } catch (e) {
                    console.log("Entity: ", entity);
                    console.log("Exception: ", e);
                }
            });
        }).bind(this), duration);
    },

    _generateMap: function() {
        var width = process.stdout.columns;
        var height = process.stdout.rows;

        var levelOptions = {
            roomWidth: [2, 20],
            roomHeight: [2, 20],
            corridorLength: [3, 6],
            dugPercentage: 0.5,
            timeLimit: 1500
        };

        var digger = new ROT.Map.Digger(width, height, levelOptions);
        var freeCells = [];
        var digCallback = function(x, y, value) {
            if (value) {
                return;
            }

            var key = x + "," + y;
            this.map[key] = ".";
            freeCells.push(key);
        };

        digger.create(digCallback.bind(this));

        this._generateLoot(freeCells, 45);
        this._drawWholeMap();

        this.player = this._createBeing(Player, freeCells);
        this._entities.push(this.player);
        this._generateBeings("mine", freeCells, 10);
    },

    _generateBeings: function(level, freeCells, quantity) {
        level = level || "mine";
        while (quantity) {
            var chosenBeing = ROT.RNG.getWeightedValue(entityRarityTable[level]);
            var being = Entities[chosenBeing];

            this._entities.push(this._createBeing(being, freeCells));
            quantity--;
        }
    },

    _createBeing: function(being, freeCells) {
        var index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
        var key = freeCells.splice(index, 1)[0];
        var coords = key.split(",");
        var x = parseInt(coords[0]);
        var y = parseInt(coords[1]);
        return new being(x, y);
    },

    _generateLoot: function(freeCells, lootQuantity) {
        lootQuantity = lootQuantity || 10;

        for (var i = 0; i < lootQuantity; i++) {
            var index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
            var key = freeCells.splice(index, 1)[0];
            this.map[key] = "*";
        }
    },

    _drawWholeMap: function() {
        for (var key in this.map) {
            var parts = key.split(",");
            var x = parseInt(parts[0]);
            var y = parseInt(parts[1]);
            this.display.draw(x, y, this.map[key]);
        }
    }
};



/*
 * Player scripting
 */

//TODO: Break handleEvent into various functions.

Player.prototype.handleEvent = function(ch, key) {
    if (typeof key === "undefined" || key === null) {
        return;
    }
    var name = key.name;

    if (typeof name === "undefined" || name === null) {
        return;
    }

    if (name === "return") {
        this._checkForItem();
        return;
    }

    if (name === "space") {
        process.stdin.removeListener("keypress", this.handleEvent);
        Game.engine.unlock();
        return;
    }

    if (name === "i") {
        Game.showMessage(Game.player.getInventory(), 3500);
        return;
    }

    if (name === "s") {
        Game.showMessage(Game.player.getAttributes(), 3500);
        return;
    }

    // Item removal hotkeys

    if (name === "b") {
        removeItemFrom('body');
        return;
    }

    if (name === "p") {
        removeItemFrom('backpack');
    }

    if (name === "h") {
        removeItemFrom('held');
    }

    if (name === "f") {
        removeItemFrom('feet');
    }

    function removeItemFrom(location) {

        var item = Game.player.getInventory(location);
        if (item && noItemInSpot()) {
            Game.player.removeFromInventory(location);
            if (location === "held") {
                Game.showMessage("You drop " + item.name + ".");
            } else {
                Game.showMessage("You remove " + item.name + " from your " + location + " and drop it.");
            }
            addToSpot(item.symbol);

        } else if (noItemInSpot()) {
            Game.showMessage("You have no item equipped as " + location + ".");

        } else {
            Game.showMessage("There is already an item here, taking up space.");
        }

        return;

        function addToSpot(symbol) {
            var key = Game.player._x + "," + Game.player._y;
            Game.map[key] = symbol;
        }

        function noItemInSpot() {
            var key = Game.player._x + "," + Game.player._y;
            return Game.map[key] == '.';
        }
    }



    var dirMap = {
        up: 0,
        pageup: 1,
        right: 2,
        pagedown: 3,
        down: 4,
        end: 5,
        left: 6,
        home: 7
    };

    if (!(name in dirMap)) {
        return;
    }

    var dir = ROT.DIRS[8][dirMap[name]];
    var newX = this._x + dir[0];
    var newY = this._y + dir[1];

    var newKey = newX + "," + newY;
    if (!(newKey in Game.map)) {
        return;
    }

    Game.display.draw(this._x, this._y, Game.map[this._x + "," + this._y]);
    this._x = newX;
    this._y = newY;
    this._draw();

    process.stdin.removeListener("keypress", this.handleEvent);
    Game.engine.unlock();
};

Player.prototype._draw = function() {
    Game.display.draw(this._x, this._y, "@", "#ff0");
};

Player.prototype._checkForItem = function() {
    var key = this._x + "," + this._y;
    var item = Game.map[key];

    if (item === ".") {
        Game.showMessage("There are no items here");
        return;
    }

    if (item === "*") {

        // generate loot from chest
        var newLoot = Loot.getRandomLoot();
        pickUp(newLoot);

    } else {
        var droppedLoot = Loot.getLootBySymbol(item);
        pickUp(droppedLoot, true);
    }

    function pickUp(item, wasDropped) {
        var message = {
            text: "That's useless.",
            duration: 1000
        };

        var openInventory = Game.player.addToInventory(item);

        if (openInventory && !wasDropped) {
            message = Lore.pickupMsg(item, openInventory);
            Game.map[key] = '.';

        } else if (wasDropped) {
            Game.map[key] = '.';
            message.text = "You pick up " + item.name + " from the ground.";

        } else {
            message = Lore.abandonMsg(item);
            Game.map[key] = item.symbol;

        }

        Game.showMessage(message.text, message.duration);
    }
};

Player.prototype.act = function() {
    Game.engine.lock();
    process.stdin.on("keypress", this.handleEvent);
};



/*
 *   Non-player Entities
 */

var Entities = {};

Entities.Assassin = function(x, y) {
    var options = {
        name: "assassin",
        symbol: "A",
        color: "red",
        attributes: {
            defense: 5,
            damage: 5
        },
        action: Pathing.movesToPlayer
    };

    return new Entity(x, y, drawEntity, options);
};

Entities.Strangler = function(x, y) {
    var options = {
        name: "strangler",
        symbol: "S",
        color: "red",
        action: Pathing.movesToPlayer,
        attributes: {
            defense: 2,
            speed: 30,
            damage: 4
        }
    };

    return new Entity(x, y, drawEntity, options);
};

var entityRarityTable = {
    "mine": {
        "Assassin": 1,
        "Strangler": 15
    }
};


function drawEntity(sym, col) {
    return Game.display.draw(this._x, this._y, this._symbol, this._color);
}



/*
 *   Entity scripting
 */

var Pathing = {

    none: function() {},

    //TODO: Break into functions
    movesToPlayer: function() {

        var x = Game.player.getX();
        var y = Game.player.getY();

        var passableCallback = function(x, y) {
            return (x + "," + y in Game.map);
        };
        var astar = new ROT.Path.AStar(x, y, passableCallback, {
            topology: 4
        });

        var path = [];
        var pathCallback = function(x, y) {
            path.push([x, y]);
        };
        astar.compute(this._x, this._y, pathCallback);

        path.shift();

        if (path.length <= 1) {
            var combatResult = new Combat(Game.player, this, Game.showMessage);
            Game.showMessage(combatResult.text, combatResult.duration);
        } else {
            x = path[0][0];
            y = path[0][1];
            Game.display.draw(this._x, this._y, Game.map[this._x + "," + this._y]);
            this._x = x;
            this._y = y;
            this._draw();
        }
    }
};



/*
 *   Basic keypress set up
 */


function setupKeypress() {
    process.stdout.write("\x1b[?25l");
    keypress(process.stdin);
    process.stdin.setRawMode(true);
    process.stdin.resume();

    process.stdin.on("keypress", exitIfEscapeChars);

    function exitIfEscapeChars(ch, key) {
        if (ch === "\u0003" || ch === "\u001b") {
            process.exit(0);
        }
    }

    process.on("exit", function() {
        handleExit();
    });

    function handleExit() {
        process.stdout.write("\x1b[" + (process.stdout.rows + 1) + ";1H");
        process.stdout.write("\x1b[?25h");
    }
}



/*
 *   Set up necessary handlers and begin game loop
 */

setupKeypress();
Game.init();