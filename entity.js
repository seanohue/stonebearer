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
  console.log(options);
  this._x = x;
  this._y = y;

  this._name = options.name;
  this.act = options.action;
  this.attr = options.attr;

  this._sym = options.symbol;
  this._col = options.color;
  this._draw = draw;
  this._draw();

  this.getSpeed = function
}

Entity.prototype.getSpeed = function() {
  return this.attr.speed;
}

function extend(obj, extension) {
  for (extra in extension) {
    if (!obj.hasOwnProperty(extra)) {
      console.log("changing");
      obj[extra] = extension[extra];
    }
  }
  return obj;
}