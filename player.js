var Player = module.exports = function (x, y) {
    // keypress handler will always treat the Player as the 'this' object
    this.handleEvent = this.handleEvent.bind(this);
    this._x = x;
    this._y = y;
    this._draw();

    this.inventory = {
        backpack: null,
        held: {
            name: 'a torch',
            location: 'held'
        },
        body: {
            name: 'some rags',
            location: 'body'
        },
        head: null,
        stones: []
    }
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

Player.prototype.getInventory = function (key) {
    if (key) return this.inventory[key];
    return this.inventory;
}

Player.prototype.addToInventory = function (item) {
    if (!this.inventory[item.location]) {
        this.inventory[item.location] = item;
        return "You equip " + item.name + ".";
    } else if (!this.inventory.backpack) {
        this.inventory.backpack = item;
        return "You put " + item.name + " in your backpack.";
    } else {
        // do a thing where you ask if they want to swap it?
        // if backpack is empty, ask if they want to store it there (one item at a time)
    }
}