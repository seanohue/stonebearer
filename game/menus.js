var inquirer = require('inquirer');
var Q = require('Q');


var Menus = module.exports = {
    startMainMenu: startMainMenu
};

function startMainMenu() {
	var deferred = Q.defer();
    var mainMenuPrompt = {
        type: 'list',
        name: 'mainPrompt',
        message: 'Main Menu',
        default: 'New Game',
        choices: [
            'New Game',
            'Quit'
        ],
    };

    var mainMenuPromptList = [
        mainMenuPrompt
    ];

    inquirer.prompt(mainMenuPromptList, mainMenuResponseHandler);

    return deferred.promise;

    function mainMenuResponseHandler(input) {
        console.log("Player input: ", input);
        if (input.mainPrompt === 'New Game') deferred.resolve();
        if (input.mainPrompt === 'Quit') quitGame();
    }

    function quitGame() {
    	deferred.reject();
        console.log(":(");
        process.exit();
    }

}