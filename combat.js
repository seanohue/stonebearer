var RNG = require('rot-js').RNG;

/*
 *  Returns a message object with the results of combat.
 */

var Combat = module.exports = function(player, enemy) {
    var combatResults = {
        text: "%c{red}You are attacked by a " + enemy._name + "!\nYou defend yourself.",
        duration: 6000,
        victory: false,
        death: false
    };

    var defendingString = calculateEnemyAttackResult();
    var attackingString = calculatePlayerAttackResult();

    combatResults.text = combatResults.text + defendingString + attackingString;

    return combatResults;

    /// Helper functions

    function calculateEnemyAttackResult() {
        var enemyDamageRoll = rollForDamage(enemy, player);

        var playerHealth = player.damage(enemyDamageRoll);
        var dead = checkForPlayerDeath(playerHealth);

        return dead || "\nYou are dealt " + enemyDamageRoll + " by the " + enemy._name + ".";


        function checkForPlayerDeath(playerHealth) {
            if (playerHealth < 1) {
                combatResults.death = true;
                return "You were killed by the " + enemy._name + ".";
            }
        }
    }

    function calculatePlayerAttackResult() {
        var playerDamageRoll = rollForDamage(player, enemy);

        var enemyHealth = enemy.damage(playerDamageRoll);
        var killed = checkForEnemyDeath(enemyHealth);
        return killed || "\nYou deal " + playerDamageRoll + " to the " + enemy._name + ".";

        function checkForEnemyDeath(enemyHealth) {
            if (enemyHealth < 1) {
                combatResults.victory = true;
                return "You killed the " + enemy._name + ".";
            }
        }
    }

    function rollForDamage(attacker, defender) {
        var damage = attacker.attributes.damage || 1;
        var defense = defender.attributes.defense || 1;
        var averageDamage = 1 + damage - defense;
        
        with(Math) {
            return ceil(max(RNG.getNormal(averageDamage)));
        }
    }

}