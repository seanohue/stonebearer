var Game = require('./game.js');

var Entity = module.exports = function (x, y, name, draw, act) {
    this._x = x;
    this._y = y;
    this._name = name;
    this._draw = draw;
    this.act = act;
    this._draw();
}

Entity.prototype.getSpeed = function () {
    return 100;
}

Entity.pathing = {
    movesToPlayer: function () {
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
}