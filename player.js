var Player = function (x, y) {
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

Player.prototype.handleEvent = function (ch, key) {
    if (typeof key === "undefined" || key === null) {
        return;
    }
    var name = key.name;

    if (typeof name === "undefined" || name === null) {
        return;
    }

    if (name === "return") {
        this._checkBox();
        return;
    }

    if (name === "space") {
        process.stdin.removeListener("keypress", this.handleEvent);
        Game.engine.unlock();
        return;
    }

    handlePlayerMovement();

    function handlePlayerMovement() {
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

}

Player.prototype._draw = function () {
    Game.display.draw(this._x, this._y, "@", "#ff0");
}

Player.prototype._checkBox = function () {
    var key = this._x + "," + this._y;
    if (Game.map[key] != "*") {
        Game.showMessage("There is no box here!");
    } else if (key == Game.ananas) {
        // TODO: add handling for loot here. 
        // also, player inventory?
        Game.showMessage("Hooray! You found an ananas and won this game.");
        setTimeout(function () {
            process.exit(0);
        }, 750);
    } else {
        Game.showMessage("This box is empty.");
    }
}