var RNG = require('rot-js').RNG;

var loot = module.exports = {};

/* 
 *   Gets loot based on weighted value in rarity table and returns the corresponding item.
 *   Optional param "floor" can be used to change which floor/level of the dungeon the loot comes from. 
 */

loot.getRandomLoot = function(floor) {
    floor = floor || 'mine';
    var chosenLoot = RNG.getWeightedValue(lootRarityTable[floor]);
    return lootInventory[chosenLoot];
};

/*
 *  Lower numbers = rarer loot.
 *  Sorted by dungeon floor.
 */

var lootRarityTable = {
    'mine': {
        'flashlight': 5,
        'armored vest': 2,
        'miner\'s helmet': 1,
        'pickaxe': 4,
        'jumpsuit': 3,
        'torch': 3,
        'rags': 3,
        'goggles': 2
    },
};

/*
 *   These functions are for getting a specific kind of loot for 
 *   hardcoded drops and for picking up dropped items.
 *   Defaults to returning undefined upon error, basically.
 */

loot.getSpecificLoot = function(name) {
    if (!name) return;
    return lootInventory[name];
}

loot.getLootBySymbol = function(symbol) {
    if (!symbol) return;
    for (loot in lootInventory) {
        if (loot.hasOwnProperty(symbol) &&
            loot.symbol === symbol) {
            return loot;
        }
    }
}

/*
 *   Helper functions to add/remove status effects when equipping and removing items.
 */

loot.onEquip = function(player, item) {
    if (item.hasOwnProperty('effects')) {

        for (effect in item.effects) {
            player.attributes[effect] += item.effects[effect];
        }
    }
};

loot.onRemove = function(player, item) {
    if (item.hasOwnProperty('effects')) {
        for (effect in item.effects) {
            player.attributes[effect] -= item.effects[effect];
        }
    }
};

/*
 *  The actual stats for each item. The key must match the
 *  key of the rarity table. 
 */

var lootInventory = {
    'goggles': {
        name: 'some goggles',
        location: 'head',
        symbol: '∞',

        effects: {
            sight: -1,
            defense: 1
        }
    },
    'torch': {
        name: 'a torch',
        location: 'held',
        symbol: '/',

        effects: {
            sight: 5,
            damage: 1,
            speed: -5
        }
    },
    'rags': {
        name: 'some rags',
        location: 'body',
        symbol: '#',

        effects: {
            defense: 1,
            speed: -5
        }
    },
    'flashlight': {
        name: 'a flashlight',
        location: 'held',
        symbol: '\`',

        effects: {
            sight: 8,
            damage: 1,
            speed: -1
        }
    },
    'armored vest': {
        name: 'an armored vest',
        location: 'body',
        symbol: '"',

        effects: {
            defense: 4,
            speed: -10
        }
    },
    'miner\'s helmet': {
        name: 'a miner\'s helmet',
        location: 'head',
        symbol: '^',

        effects: {
            sight: 6,
            defense: 1,
            speed: -2
        }
    },
    'pickaxe': {
        name: 'a pickaxe',
        location: 'held',
        symbol: '!',

        effects: {
            damage: 4,
            speed: -12,
            defense: 1
        }
    },
    'jumpsuit': {
        name: 'a jumpsuit',
        location: 'body',
        symbol: '%',

        effects: {
            defense: 3
        }
    }
};