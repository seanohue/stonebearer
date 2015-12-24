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
        stones: []
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
        if (item && location !== 'stones') {
            inventoryString += location + ": " + item.name + "\n";
        }
    }
    return inventoryString;
}



/*
 * Handles adding new items of any kind to the player's inventory.
 */

Player.prototype.addToInventory = function(item) {
    item.location = item.location || 'backpack';

    if (item.location === 'stones') {
        console.log("item is ", item);
        var heldStones = this.inventory.stones;
        console.log("heldStones: ", heldStones);
        if (heldStones.length && heldStones.reduce(isInStones).length) {
            console.log("Already there, holmes");
            return;
        }

        this.inventory.stones.push(item);
        return;

        function isInStones(heldStone) {
            return heldStone.name === item.name;
        }
    }

    if (!this.inventory[item.location]) {
        this.inventory[item.location] = item;
        loot.onEquip(this, item);
        return "You equip " + item.name + ".";

    } else if (!this.inventory.backpack) {
        this.inventory.backpack = item;
        return "You put " + item.name + " in your backpack.";

    } else {
        return "There is no room for " + item.name + " so you leave it behind.";
    }
}