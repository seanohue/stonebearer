var RNG = require('rot-js').RNG;

/*
*	Returns a message object with the results of combat.
*/

var Combat = module.exports = function(player, enemy) { 
    var combatResults = {
        text: "%c{red}You are attacked by a " + enemy._name + "!\nYou defend yourself.",
        duration: 6000
    };

    var attackedString = calculateEnemyAttackResult();
    var attackingString = calculatePlayerAttackResult();

    combatResults.text = combatResults.text + attackedString + attackingString;

    return combatResults;

    /// Helper functions

    function calculateEnemyAttackResult() {
        var enemyDamageRoll =
            Math.ceil(
                Math.max(
                    RNG.getNormal(
                        1 + enemy.attributes.damage - player.attributes.defense, 1), 0));
        var playerHealth = player.damage(enemyDamageRoll);
        var dead = checkForPlayerDeath(playerHealth);

        return dead || "\nYou are dealt " + enemyDamageRoll + " by the " + enemy._name + ".";


        function checkForPlayerDeath(playerHealth) {
            if (playerHealth < 1) {
                return "You were killed by the " + enemy._name + ".";
            }
        }
    }

    function calculatePlayerAttackResult() {
        var playerDamageRoll =
            Math.ceil(
                Math.max(
                    RNG.getNormal(
                        1 + player.attributes.damage - enemy.attributes.defense, 1), 0));
        var enemyHealth = enemy.damage(playerDamageRoll);
        var killed = checkForEnemyDeath(enemyHealth);
        return killed || "\nYou deal " + playerDamageRoll + " to the " + enemy._name + ".";

        function checkForEnemyDeath(enemyHealth) {
            if (enemyHealth < 1) {
                return "You killed the " + enemy._name + ".";
            }
        }
    }
}