var RNG = require('rot-js').RNG;
var Lore = module.exports = {
    pickupMsg: pickupMsg,
    abandonMsg: abandonMsg
};

function pickupMsg(item, openInventorySpot) {
    if (!item) return;
    var placeMsg = {
        'equip': 'equip',
        'backpack': 'use your pack to carry',
        'undefined': 'contemplate your existence while staring at'
    };
    var dropMessage = {
        text: randomDropMsg(item),
        duration: 1500
    };
    var ending = "\n\nYou " + placeMsg[openInventorySpot] + " " + item.name + ".";
    return finalizeLootEncounter(dropMessage, ending);
}

function abandonMsg(item) {
    var dropMessage = randomDropMsg(item);
    var ending = "\n\nYou abandon " + item.name + ".";
    return finalizeLootEncounter(dropMessage, ending);
}

function finalizeLootEncounter(msg, ending) {
    msg.text = msg.text + ending;
    msg.duration = msg.duration || 2000;
    return msg;
}



function randomDropMsg(item) {
    if (item && item.name) {
        var defaultLoot = interpolateMessage(FlavorText.loot.box, item);
        var messageKey = RNG.getWeightedValue(FlavorText.loot.rarity) || 'box';
        var message = FlavorText.loot[messageKey];
        return interpolateMessage(message, item);
    }
}


function interpolateMessage(message, item) {
    return message.format(item.name);
}

// Messages for random encounters
var FlavorText = {
    loot: {
        rarity: {
            'box': 1,
            'miner_corpse': 4,
            'rubble_pile': 7,
            'mine_cart': 2
        },

        'box': "You find a box with %s in it.",
        'miner_corpse': "You find the corpse of a miner, its face a puffy blue, and limbs stiff with rigor mortis. You pry %s from their stiff, cold hands.",
        'rubble_pile': "You see %s peeking from under a pile of bloodstained rubble. A quick tug is all it takes to unearth the artifact.",
        'mine_cart': "You come across an abandoned dram, filled with stones. Perched precariously on top is %s."
    },
};