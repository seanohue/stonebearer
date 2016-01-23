var ROT = require('rot-js');
var Game = require('./game.js');
var Combat = require('./combat.js');
var common = require('../common.js');

var Pathing = module.exports = {

    none: common.noop,

    movesToPlayer: function() {

        console.log("Game is ", Game);

        var player = Game.get('player');
        var map = Game.get('map');
        var display = Game.get('display');
        var showMessage = Game.get('showMessage');

        var x = player.getX();
        var y = player.getY();

        var isPassableCallback = function(x, y) {
            return (x + "," + y in map);
        };

        var pathingOptions = {
            topology: 4
        };

        var astar = new ROT.Path.AStar(x, y, isPassableCallback, pathingOptions);

        var path = [];
        var pathCallback = function(x, y) {
            path.push([x, y]);
        };
        astar.compute(this._x, this._y, pathCallback);

        path.shift();

        //TODO: At some point, better player detection.
        if (path.length <= 1) {
            var combatResult = new Combat(player, this, Game.showMessage);
            showMessage(combatResult.text, combatResult.duration);
            //TODO: A combat-resolution function (death/victory)
        } else {
            x = path[0][0];
            y = path[0][1];
            display.draw(this._x, this._y, map[this._x + "," + this._y]);
            this._x = x;
            this._y = y;
            this._draw();
        }
    }
};