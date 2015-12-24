var RNG = require('rot-js').RNG;
var Lore = module.exports = {};

// Possible outcomes of finding an item.

Lore.pickupMsg = function(item, openInventorySpot) {

    var placeMsg = {
        'equip': 'equip',
        'backpack': 'use your pack to carry',
        'undefined': 'contemplate your existence while staring at'
    };

    var ending = "You " + placeMsg[openInventorySpot] + " " + item.name + ".";

    var dropMessage = randomDropMsg(item);
    dropMessage.msg += ending;
    dropMessage.duration = dropMessage.duration || 1000;

    return dropMessage;
}

Lore.abandonMsg = function(item) {
    var ending = "You abandon " + item.name + ".";
    var dropMessage = randomDropMsg(item);
    dropMessage.msg += ending;

    return dropMessage;
}



// Picks a message to describe a random loot encounter.
function randomDropMsg(item) {
    if (item && item.name) {
        var msgTitle = RNG.getWeightedValue(FlavorText.loot.rarity);
        var defaultLoot = FlavorText.loot['box'](item);
        return FlavorText.loot[msgTitle](item) || defaultLoot;
    }

    return "You find an object has materialized in your hands, inexplicably.";
}

var FlavorText = {
    loot: {
        rarity: {
            'box': 5,
            'miner_corpse': 4,
            'rubble_pile': 7
        },



        'box': function(item) {
            return {
                msg: "You find a box with " + item.name + "in it.",
                duration: 1000
            }
        },

        'miner_corpse': function(item) {
            return {
                msg: "You find the corpse of a miner, its face a puffy blue, and limbs stiff with rigor mortis. You pry " + item.name + " from their stiff, cold hands.",
                duration: 3200
            }
        },

        'rubble_pile': function(item) {
            return {
                msg: "You see " + item.name + "peeking from under a pile of bloodstained rubble. A quick tug is all it takes to unearth the artifact.",
                duration: 3200
            }
        },
    }
}