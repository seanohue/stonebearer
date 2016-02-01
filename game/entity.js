var extend = require('../common.js').extend;

var Entity = module.exports = function(x, y, draw, template) {

    var defaultTemplate = {
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

    options = extend(template, defaultTemplate);

    this._x = x;
    this._y = y;

    this._name = template.name;
    this.act = template.action;
    this.attributes = template.attributes;

    this._symbol = template.symbol;
    this._color = template.color;
    this._draw = draw;
    this._draw();

};

// Helper function for the speed-based ROT.Scheduler
Entity.prototype.getSpeed = function() {
    return this.attributes.speed;
};

// Helper function for combat.
Entity.prototype.damage = function(amount) {
    this.attributes.health -= amount;
    return this.attributes.health;
};