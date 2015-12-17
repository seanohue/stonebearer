var RNG = require('rot-js').RNG;

var lootGenerator = module.exports = {};

lootGenerator.getLoot = function (floor) {
    floor = floor || 'mine';
    var chosenLoot = RNG.getWeightedValue(lootRarityTable[floor]);
    return lootInventory[chosenLoot];
};

/*
 *	Lower numbers = rarer loot.
 *	Sorted by dungeon floor.
 */

var lootRarityTable = {
    'mine': {
        'flashlight': 5,
        'armored vest': 2,
        'miner\'s helmet': 1,
        'pickaxe': 4,
        'jumpsuit': 3
    },
};

/*
 *	The actual stats for each item. The key must match the
 *	key of the rarity table. 
 */

var lootInventory = {
    'flashlight': {
        name: 'a flashlight'
    },
    'armored vest': {
        name: 'an armored vest'
    },
    'miner\'s helmet': {
        name: 'a miner\'s helmet'
    },
    'pickaxe': {
        name: 'a pickaxe'
    },
    'jumpsuit': {
        name: 'a jumpsuit'
    }
};