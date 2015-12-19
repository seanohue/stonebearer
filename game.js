// This is built on the node roguelike tutorial found at http://www.roguebasin.com/index.php?title=Rot.js_tutorial
// Thanks to its author, 'blinkdog'

var ROT = require('rot-js');
var keypress = require('keypress');
var inquirer = require("inquirer");

var Player = require('./player.js');
var Entity = require('./entity.js');
var Loot = require('./loot.js');


process.on("exit", function () {
    handleExit();
});

setupKeypress();

var Game = module.exports = {
    display: null,
    map: {},
    engine: null,
    player: null,
    assassin: null,

    entities: [
        this.player,
        this.assassin
    ],

    init: function () {
        this.display = new ROT.Display({
            width: process.stdout.columns,
            height: process.stdout.rows,
            layout: "term"
        });

        this._generateMap();

        var scheduler = new ROT.Scheduler.Simple();
        scheduler.add(this.player, true);
        scheduler.add(this.assassin, true);

        this.engine = new ROT.Engine(scheduler);
        this.engine.start();
    },

    // display a message for the user
    showMessage: function (message, duration) {
        duration = duration || 1000;
        // draw the message in the upper left corner, in yellow
        this.display.drawText(0, 1, ("%c{#ff0}" + message));
        setTimeout((function () {
            this.display.clear();
            this._drawWholeMap();
            this.player._draw();
            this.assassin._draw();
        }).bind(this), 1000);
    },

    _generateMap: function () {
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

        var digCallback = function (x, y, value) {
            if (value) {
                return;
            }

            var key = x + "," + y;
            this.map[key] = ".";
            freeCells.push(key);
        }
        digger.create(digCallback.bind(this));

        this._generateLoot(freeCells);
        this._drawWholeMap();

        this.player = this._createBeing(Player, freeCells);
        this.assassin = this._createBeing(Assassin, freeCells);
    },

    _createBeing: function (being, freeCells) {
        var index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
        var key = freeCells.splice(index, 1)[0];
        var parts = key.split(",");
        var x = parseInt(parts[0]);
        var y = parseInt(parts[1]);
        return new being(x, y);
    },

    _generateLoot: function (freeCells) {
        for (var i = 0; i < 10; i++) {
            var index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
            var key = freeCells.splice(index, 1)[0];
            this.map[key] = "*";
        }
    },

    _drawWholeMap: function () {
        for (var key in this.map) {
            var parts = key.split(",");
            var x = parseInt(parts[0]);
            var y = parseInt(parts[1]);
            this.display.draw(x, y, this.map[key]);
        }
    }
};

Player.prototype.handleEvent = function (ch, key) {
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

    var keyMap = {};
    keyMap["up"] = 0;
    keyMap["pageup"] = 1;
    keyMap["right"] = 2;
    keyMap["pagedown"] = 3;
    keyMap["down"] = 4;
    keyMap["end"] = 5;
    keyMap["left"] = 6;
    keyMap["home"] = 7;

    if (!(name in keyMap)) {
        return;
    }

    var dir = ROT.DIRS[8][keyMap[name]];
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
}

Player.prototype._draw = function () {
    Game.display.draw(this._x, this._y, "@", "#ff0");
}

Player.prototype._checkForItem = function () {
    var key = this._x + "," + this._y;
    var item = Game.map[key];

    if (item === ".") {
        Game.showMessage("There are no items here");
    } else if (item === "*") {

        // generate loot from chest
        var newLoot = Loot.getRandomLoot();
        var message = Game.player.addToInventory(newLoot);
        if (message === "There is no room for " + newLoot.name + " so you leave it behind.") {
            Game.map[key] = newLoot.symbol;
        } else {
            Game.map[key] = '.'
        }
        Game.showMessage(message);
    } else {

        // implement this
        // var loot = Loot.getLootBySymbol(item);

        // check for various items based on the map icon
        // this could probably be merged with the above statement once implemented.
        // for now there is essentially this error message:
        Game.showMessage("That's useless.");
    }
}

Player.prototype.act = function () {
    Game.engine.lock();
    process.stdin.on("keypress", this.handleEvent);
}

var Assassin = function (x, y) {
    var draw = function drawAssassin() {
        return Game.display.draw(this._x, this._y, "A", "red");
    };
    return new Entity(x, y, "Assassin", draw, entityMovesToPlayer);
}

// TODO: extract to AI/scripting module

function entityMovesToPlayer() {
    var x = Game.player.getX();
    var y = Game.player.getY();

    var passableCallback = function (x, y) {
        return (x + "," + y in Game.map);
    }
    var astar = new ROT.Path.AStar(x, y, passableCallback, {
        topology: 4
    });

    var path = [];
    var pathCallback = function (x, y) {
        path.push([x, y]);
    }
    astar.compute(this._x, this._y, pathCallback);

    path.shift();

    // TODO: make this part less crappy and more generic.
    // but also allow for custom combat messages/scripting
    // <=, in case the player jumps into Entity's arms (path.length === 0)
    if (path.length <= 1) {
        Game.engine.lock();
        Game.showMessage("%c{red}Game over - you were captured by assassin!");
        setTimeout(function () {
            process.exit(0);
        }, 750);
    } else {
        x = path[0][0];
        y = path[0][1];
        Game.display.draw(this._x, this._y, Game.map[this._x + "," + this._y]);
        this._x = x;
        this._y = y;
        this._draw();
    }
}

function handleExit() {
    process.stdout.write("\x1b[" + (process.stdout.rows + 1) + ";1H");
    process.stdout.write("\x1b[?25h");
}

function setupKeypress() {
    process.stdout.write("\x1b[?25l");
    keypress(process.stdin);
    process.stdin.setRawMode(true);
    process.stdin.resume();

    // Exit listener for ctrl+c or ESC
    process.stdin.on("keypress", function (ch, key) {
        if (ch === "\u0003" || ch === "\u001b") {
            process.exit(0);
        }
    });
}

Game.init();