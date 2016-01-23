var ROT = require('rot-js');
var Game = require('./game.js');
var Combat = require('./combat.js');
var common = require('../common.js');

var Pathing = module.exports = {

    none: common.noop,

    movesToPlayer: function() {

        var game = Game.getMultiple(['player', 'map', 'display', 'showMessage']);

        // var player = Game.get('player');
        // var map = Game.get('map');
        // var display = Game.get('display');
        // var showMessage = Game.get('showMessage');

        var x = game.player.getX();
        var y = game.player.getY();

        var isPassableCallback = function(x, y) {
            return (x + "," + y in game.map);
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
            var combatResult = new Combat(game.player, this, game.showMessage);
            game.showMessage(combatResult.text, combatResult.duration);
            //TODO: A combat-resolution function (death/victory)
        } else {
            x = path[0][0];
            y = path[0][1];
            game.display.draw(this._x, this._y, game.map[this._x + "," + this._y]);
            this._x = x;
            this._y = y;
            this._draw();
        }
    }
};