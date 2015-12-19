var Player = module.exports = function (x, y) {
    // keypress handler will always treat the Player as the 'this' object
    this.handleEvent = this.handleEvent.bind(this);
    this._x = x;
    this._y = y;
    this._draw();

    this.attributes = {
        sight: 6,
        defense: 2,
        damage: 2,
        health: 10,
        speed: 100
    };

    this.inventory = {
        backpack: null,
        held: {
            name: 'a torch',
            location: 'held',
            onEquip: function () {
                this.attributes.sight += 5;
            },
            onRemove: function () {
                this.attributes.sight -= 5;
            }
        },
        body: {
            name: 'some rags',
            location: 'body',
            onEquip: function () {
                this.attributes.defense += 1;
                this.attributes.speed -= 5;
            },
            onRemove: function () {
                this.attributes.defense += 1;
                this.attributes.speed += 5;
            }
        },
        head: null,
        stones: []
    }
}

Player.prototype.getSpeed = function () {
    return this.attributes.speed;
}
Player.prototype.getX = function () {
    return this._x;
}
Player.prototype.getY = function () {
    return this._y;
}

Player.prototype.getInventory = function (key) {
    if (key) return this.inventory[key];
    return this.prettifiedInventory();
}

Player.prototype.prettifiedInventory = function () {
    var inventoryString = "Inventory: \n";
    for (location in this.inventory) {
        var item = this.inventory[location];
        if (item && location !== 'stones') {
            inventoryString += location + ": " + item.name + "\n";
        }
    }
    return inventoryString;
}

Player.prototype.addToInventory = function (item) {
    if (!item.location) {
        throw "ERROR: Item has no set location...";
    }

    if (!this.inventory[item.location]) {
        this.inventory[item.location] = item;
        return "You equip " + item.name + ".";
    } else if (!this.inventory.backpack) {
        this.inventory.backpack = item;
        return "You put " + item.name + " in your backpack.";
    } else {
        return "There is no room for " + item.name + " so you leave it behind.";
        // do a thing where you ask if they want to swap it?
        // if backpack is empty, ask if they want to store it there (one item at a time)
    }
}