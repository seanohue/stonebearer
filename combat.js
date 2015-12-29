var RNG = require('rot-js').RNG;

var Combat = module.exports = function(player, enemy) { // return a message object

    var combatResults = {
        text: "%c{red}You are attacked by a " + enemy._name + "!\nYou defend yourself.",
        duration: 6000
    };

    var enemyDamageRoll =
        Math.ceil(
            Math.max(
                RNG.getNormal(
                    1 + enemy.attributes.damage - player.attributes.defense, 1), 0));
    var playerHealth = player.damage(enemyDamageRoll);
    var attackedString = "\nYou are dealt " + enemyDamageRoll + " by the " + enemy._name + ".";


    var playerDamageRoll =
        Math.ceil(
            Math.max(
                RNG.getNormal(
                    1 + player.attributes.damage - enemy.attributes.defense, 1), 0));
    var enemyHealth = enemy.damage(playerDamageRoll);
    var attackingString = "\nYou deal " + playerDamageRoll + " to the " + enemy._name + ".";

    combatResults.text = combatResults.text + attackedString + attackingString;

    if (playerHealth < 1) {
        var deathMessage = {
            text: "You were killed by the " + enemy._name + ".",
            duration: 7000
        };
        return deathMessage;
    }

    if (enemyHealth < 1) {
        var victoryMessage = {
            text: "You killed the " + enemy._name + ".",
            duration: 3000
        };
        return victoryMessage;
    }

    return combatResults;

};