var RNG = require('rot-js').RNG.
var Lore = module.exports = {
    msg: {
        duration = 1000,
            text: "What?"
    }
};

// Possible outcomes of finding an item.

Lore.prototype.pickupMsg = function(item, openInventorySpot) {

    var placeMsg = {
        'equip': 'equip',
        'backpack': 'use your pack to carry',
        'undefined': 'contemplate your existence while staring at'
    };

    return randomDropMsg(item) + "You " + placeMsg[openInventorySpot] + " " + item.name + ".";
}

Lore.prototype.abandonMsg = function(item) {
    return randomDropMsg(item) + "You abandon " + item.name + ".";
}



// Picks a message to describe a random loot encounter.
function randomDropMsg(item) {
    var msgTitle = RNG.getWeightedValue(FlavorText.loot.rarity);
    return FlavorText.loot[msgTitle](item);
}