var Entity = module.exports = function(x, y, draw, options) {

    var defaultOptions = {
        name: "beast",

        attr: {
            speed: 100,
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
    this.attr = options.attr;

    this._sym = options.symbol;
    this._col = options.color;
    this._draw = draw;
    this._draw();

}

// Helper function for the speed-based ROT.Scheduler
Entity.prototype.getSpeed = function() {
    return this.attr.speed;
}

function extend(obj, extension) {
    for (extra in extension) {
        if (!obj.hasOwnProperty(extra)) {
            obj[extra] = extension[extra];
        }
    }
    return obj;
}