// TODO: refactor to use options object of some kind, or to use patterns like loot.js

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