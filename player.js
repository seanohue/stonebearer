var Player = module.exports = function (x, y) {
    // keypress handler will always treat the Player as the 'this' object
    this.handleEvent = this.handleEvent.bind(this);
    this._x = x;
    this._y = y;
    this._draw();
}

Player.prototype.getSpeed = function () {
    return 100;
}
Player.prototype.getX = function () {
    return this._x;
}
Player.prototype.getY = function () {
    return this._y;
}

Player.prototype.act = function () {
    Game.engine.lock();
    process.stdin.on("keypress", this.handleEvent);
}

