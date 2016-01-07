var extend = require('./common.js').extend;

var Entity = module.exports = function(x, y, draw, options) {

    var defaultOptions = {
        name: "beast",

        attributes: {
            speed: 100,
            health: 10,
            damage: 2,
            defense: 2
        },
        symbol: "&",
        color: "red",

        action: function() {},
    };

    options = extend(options, defaultOptions);

    this._x = x;
    this._y = y;

    this._name = options.name;
    this.act = options.action;
    this.attributes = options.attributes;

    this._symbol = options.symbol;
    this._color = options.color;
    this._draw = draw;
    this._draw();

}

// Helper function for the speed-based ROT.Scheduler
Entity.prototype.getSpeed = function() {
    return this.attributes.speed;
}

Entity.prototype.damage = function(amount) {
    this.attributes.health -= amount;
    return this.attributes.health;
}