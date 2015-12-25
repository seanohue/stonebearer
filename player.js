var loot = require('./loot.js');

var Player = module.exports = function(x, y) {

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
        feet: loot.getSpecificLoot('sandals'),
        held: loot.getSpecificLoot('torch'),
        body: loot.getSpecificLoot('rags'),
        head: null,
        stone: null
    };
}

Player.prototype.getX = function() {
    return this._x;
}
Player.prototype.getY = function() {
    return this._y;
}



/* 
 * Attributes/Inventory:
 * getAttributes and getInventory work similarly:
 * you can pass in a specific attribute/inventory item
 * to get that object back, if it exists.
 *
 * If you don't pass in a key, you get back a stringified
 * version of the whole attribute/inventory object.
 */

Player.prototype.getAttributes = function(attr) {
    if (attr) return this.attributes(attr);
    return this.prettifiedAttributes();
}

Player.prototype.prettifiedAttributes = function() {
    var attrString = "Attributes: \n";
    for (attr in this.attributes) {
        var stat = this.attributes[attr];
        if (stat) {
            attrString += attr + ": " + stat + "\n";
        }
    }
    return attrString;
}

// Helper function for the speed-based ROT.Scheduler
Player.prototype.getSpeed = function() {
    return this.attributes.speed;
}

Player.prototype.getInventory = function(key) {
    if (key) return this.inventory[key];
    return this.prettifiedInventory();
}

Player.prototype.prettifiedInventory = function() {
    var inventoryString = "Inventory: \n";
    for (location in this.inventory) {
        var item = this.inventory[location];
        if (item) {
            inventoryString += location + ": " + item.name + "\n";
        }
    }
    return inventoryString;
}



/*
 * Handles adding and removing items of any kind to/from the player's inventory.
 * Adds the item, or not, and returns a string to be displayed 
 * or
 * Removes the item in the location passed in as a string, or displays a message.
 */

Player.prototype.addToInventory = function(item) {
    if (item) {
        item.location = item.location || 'backpack';

        if (!this.inventory[item.location]) {
            this.inventory[item.location] = item;
            loot.onEquip(this, item);
            return 'equip';

        } else if (!this.inventory.backpack) {
            this.inventory.backpack = item;
            return 'backpack';
        }
    }

    return false;

}

Player.prototype.removeFromInventory = function(location) {
    location = location || 'backpack';
    var item = this.inventory[location];
    if (item) {
        this.inventory[location] = null;
        return item.symbol;
    }
}