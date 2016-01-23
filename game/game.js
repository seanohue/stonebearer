// This is built on the node roguelike tutorial found at http://www.roguebasin.com/index.php?title=Rot.js_tutorial
// Thanks to its author, 'blinkdog'

//TODO: Savegame
//TODO: Menu
//TODO: Combat works (player/mobs can die)
//TODO: FOV computation for player char (fog of war)
//TODO: FOV computation for mobs
//TODO: More variation in AI
//TODO: Lighting, affected by character's sight stat
//TODO: Extract everything to do with map into its own module.
//FIXME: Some messages stay on the screen even when another message is displayed. Handle two messages at once or create a message section of the display, separate from the map.

/*
 * NPM modules
 */

var ROT = require('rot-js');
var keypress = require('keypress');
var Q = require('Q');



/*
 * Game modules
 */

var Player = require('./player.js');
var Entity = require('./entity.js');
var Loot = require('./loot.js');
var Lore = require('./lore.js');
var Combat = require('./combat.js');
var Maps = require('./maps.js');
var Menus = require('./menus.js');

var common = require('../common.js');



/*
 * Game engine/scheduler, methods, and main loop
 */

var Game = module.exports = {
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
        this._entities.forEach(function(entity) {
            scheduler.add(entity, true);
        });

        this.engine = new ROT.Engine(scheduler);
        this.engine.start();
    },

    redrawMap: function() {
        this.display.clear();
        this._drawWholeMap();
        this._entities.forEach(function(entity) {
            try {
                entity._draw();
            } catch (exception) {
                console.log("Entity: ", entity);
                console.log("Exception: ", exception);
            }
        });
    },

    showMessage: function(message, duration, color) {
        if (message) {
            color = color || "%c{#ff0}";
            duration = duration || 1000;
            this.display.drawText(0, 1, (color + message));
            setTimeout(this.redrawMap.bind(this), duration);
        }
    },


    _generateMap: function() {
        var width = process.stdout.columns;
        var height = process.stdout.rows;

        var levelOptions = Maps.getOptions('mines');
        var digger = new ROT.Map.Digger(width, height, levelOptions);
        var freeCells = []; //TODO: Store on game object to pass into Pathing functions.
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
        quantity = quantity || 1;
        level = level || "mine";
        while (quantity) {
            var chosenBeing = ROT.RNG.getWeightedValue(entityRarityTable[level]);
            var being = Entities[chosenBeing];

            this._entities.push(this._createBeing(being, freeCells));
            quantity--;
        }
    },

    _createBeing: function(being, freeCells) {
        var randomFreeCell = Math.floor(ROT.RNG.getUniform() * freeCells.length);
        var cellKey = freeCells.splice(randomFreeCell, 1)[0];
        var coords = cellKey.split(",");
        var x = parseInt(coords[0]);
        var y = parseInt(coords[1]);
        return new being(x, y);
    },

    _generateLoot: function(freeCells, lootQuantity) {
        lootQuantity = lootQuantity || 10;

        for (var i = 0; i < lootQuantity; i++) {
            Maps.placeLoot.call(this, freeCells);
        }
    },

    _drawWholeMap: function() {
        for (var key in this.map) {
            Maps.drawMapTile.call(this, key);
        }

    }
};



/*
 * Player scripting
 */

Player.prototype.handleEvent = function(ch, key) {
    if (common.isUndefined(key)) {
        return;
    }

    var name = key.name;

    if (common.isUndefined(name)) {
        return;
    }

    var commandMap = {
        "return": Game.player._checkForItem.bind(Game.player),
        "space": endTurn,
        "i": checkInventory,
        "s": checkStats,
        "b": removeItemFrom('body'),
        "f": removeItemFrom('feet'),
        "w": removeItemFrom('held'),
        "h": removeItemFrom('head')
    };

    checkIfValidCommand(name);

    function checkIfValidCommand(name) {
        if (commandMap[name]) {
            runCommand(name);
        } else {
            movePlayer.call(Game.player, name);
        }
        return;
    }

    function runCommand(name) {
        commandMap[name]();
        return;
    }

    function endTurn() {
        process.stdin.removeListener("keypress", this.handleEvent);
        Game.engine.unlock();
    }

    function checkInventory() {
        Game.showMessage(Game.player.getInventory());
    }

    function checkStats() {
        Game.showMessage(Game.player.getAttributes());
    }

    function removeItemFrom(location) {
        return function() {
            var item = Game.player.getInventory(location);
            if (item && noItemInSpot()) {
                dropItem();
            } else if (noItemInSpot()) {
                Game.showMessage("You have no item equipped as " + location + ".");
            } else {
                Game.showMessage("There is already an item here, taking up space.");
            }
            return;

            function dropItem() {
                Game.player.removeFromInventory(location);
                if (location === "held") {
                    Game.showMessage("You drop " + item.name + ".");
                } else {
                    Game.showMessage("You remove " + item.name + " from your " + location + " and drop it.");
                }
                addToSpot(item.symbol);
            }

            function addToSpot(symbol) {
                var key = Game.player._x + "," + Game.player._y;
                Game.map[key] = symbol;
            }

            function noItemInSpot() {
                var key = Game.player._x + "," + Game.player._y;
                return Game.map[key] == '.';
            }
        };
    }

    function movePlayer(direction) {
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

        if (!(direction in dirMap)) {
            return;
        }

        var dir = ROT.DIRS[8][dirMap[direction]];
        var newX = this._x + dir[0];
        var newY = this._y + dir[1];

        var newKey = newX + "," + newY;
        if (!(newKey in Game.map)) {
            return;
        }

        Game.display.draw(this._x, this._y, Game.map[this._x + "," + this._y]);
        this._x = newX;
        this._y = newY;
    }

    this._draw();
    endTurn();

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


        if (leaveFoundItem()) {
            message.text = Lore.abandonMsg(item);
            Game.map[key] = item.symbol;
        } else if (leaveDroppedItem()) {
            message.text = "You must leave " + item.name + " behind.";
        } else if (!wasDropped) {
            message = Lore.pickupMsg(item, openInventory);
            Game.map[key] = '.';
        } else {
            Game.map[key] = '.';
            message.text = "You pick up " + item.name + " from the ground.";
        }


        console.log("Back in game.js, message is ", message);
        Game.showMessage(message.text, message.duration);

        function leaveDroppedItem() {
            return (!openInventory && wasDropped);
        }

        function leaveFoundItem() {
            return (!openInventory && !wasDropped);
        }

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

//TODO: Extract into module.
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
//FIXME: Get this to work. Right now it hangs after the menu.
// Q.fcall(Menus.startMainMenu)
//     .then(Game.init);