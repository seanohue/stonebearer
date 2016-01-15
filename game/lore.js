var RNG = require('rot-js').RNG;
var Lore = module.exports = {
    pickupMsg: pickupMsg,
    abandonMsg: abandonMsg
};


// Possible outcomes of finding an item.

function pickupMsg (item, openInventorySpot) {

    if (!item) return;

    var placeMsg = {
        'equip': 'equip',
        'backpack': 'use your pack to carry',
        'undefined': 'contemplate your existence while staring at'
    };

    var dropMessage = randomDropMsg(item);
    var ending = "\n\nYou " + placeMsg[openInventorySpot] + " " + item.name + ".";

    return finalizeLootEncounter(dropMessage, ending);
}

function abandonMsg (item) {
    var dropMessage = randomDropMsg(item);
    var ending = "\n\nYou abandon " + item.name + ".";

    return finalizeLootEncounter(dropMessage, ending);
}

function finalizeLootEncounter(msg, ending) {
    msg.text = msg.text + ending;
    msg.duration = msg.duration || 5000;
    return msg;
}



// Picks a message to describe a random loot encounter.
function randomDropMsg(item) {
    var defaultLoot = FlavorText.loot.box(item);

    if (item && item.name) {
        var msgTitle = RNG.getWeightedValue(FlavorText.loot.rarity);
        return FlavorText.loot[msgTitle](item) || defaultLoot;
    }

    return defaultLoot;
}



// Messages for random encounters
var FlavorText = {
    loot: {
        rarity: {
            'box': 1,
            'miner_corpse': 4,
            'rubble_pile': 7
        },

//TODO: Refactor to not need to use functions -- there has to be a more intuitive way of doing this.

        'box': function(item) {
            return {
                text: "You find a box with " + item.name + " in it.",
                duration: 1000
            };
        },

        'miner_corpse': function(item) {
            return {
                text: "You find the corpse of a miner, its face a puffy blue, and limbs stiff with rigor mortis. You pry " + item.name + " from their stiff, cold hands.",
                duration: 2000
            };
        },

        'rubble_pile': function(item) {
            return {
                text: "You see " + item.name + " peeking from under a pile of bloodstained rubble. A quick tug is all it takes to unearth the artifact.",
                duration: 2000
            };
        },
    }
};