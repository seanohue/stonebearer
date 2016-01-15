var RNG = require('rot-js').RNG;
var loot = module.exports = {
    getRandomLoot: getRandomLoot,
    getLootBySymbol: getLootBySymbol,
    getSpecificLoot: getSpecificLoot,
    onEquip: onEquip,
    onRemove: onRemove,
};



/*
 *  Lower numbers = rarer loot.
 *  Sorted by dungeon level.
 */

 //TODO: Find a way to include this in the table below.

var lootRarityTable = {
    'mine': {
        'flashlight': 4,
        'armored vest': 3,
        'miner\'s helmet': 2,
        'pickaxe': 3,
        'jumpsuit': 3,
        'torch': 1,
        'rags': 3,
        'goggles': 2,
        'glow-stone': 1,
        'workboots': 2,
        'shovel': 5
    },
};



/*
 *  The actual stats for each item. The key must match the
 *  key of the rarity table. 
 */

 //TODO: Extract into a JSON file or summat.

var lootInventory = {
    'shovel': {
        name: 'a rusty shovel',
        location: 'held',
        symbol: '?',

        effects: {
            speed: -10,
            defense: 1,
            damage: 4
        }
    },
    'glow-stone': {
        name: 'a glowing stone',
        location: 'stones',
        symbol: ',',

        effects: {
            sight: 2
        }
    },
    'sandals': {
        name: 'a pair of sandals',
        location: 'feet',
        symbol: '=',

        effects: {
            speed: 10,
            defense: 1
        }
    },
    'workboots': {
        name: 'a pair of heavy work boots',
        location: 'feet',
        symbol: 'b',

        effects: {
            speed: 5,
            defense: 2
        }
    },
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
            damage: 2,
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

/* 
 *   Gets loot based on weighted value in rarity table and returns the corresponding item.
 *   Optional param "level" can be used to change which level of the dungeon the loot comes from. 
 */

function getRandomLoot(level) {
    level = level || 'mine';
    var chosenLoot = RNG.getWeightedValue(lootRarityTable[level]);
    return lootInventory[chosenLoot];
}

/*
 *   These functions are for getting a specific kind of loot for 
 *   hardcoded drops and for picking up dropped items.
 *   Defaults to returning undefined upon error, basically.
 */

function getLootBySymbol(symbol) {
    if (symbol) {
        for (var item in lootInventory) {
            if (lootInventory[item].symbol === symbol) {
                return lootInventory[item];
            }
        }
    }
}

function getSpecificLoot(name) {
    if (!name) return;
    return lootInventory[name];
}


/*
 *   Helper functions to add/remove status effects when equipping and removing items.
 */

//TODO: Add ability to have effects that stack in procedurally generated items. So, an item will be made with a prefix and postfix (i.e. "The Lightning-Quick Dagger of Bloodletting"), and the prefix effects (i.e. +2 to speed) will be added to the default effects and the postfix effects (i.e. +2 to damage). Use common.extends for this and have a function that creates rare procedurally-generated items.

function onEquip(player, item) {
    if (item && item.effects) {

        for (var effect in item.effects) {
            player.attributes[effect] += item.effects[effect];
        }
    }
}

function onRemove(player, item) {
    if (item && item.effects) {
        for (var effect in item.effects) {
            player.attributes[effect] -= item.effects[effect];
        }
    }
}