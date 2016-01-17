var inquirer = require('inquirer');


var Menus = module.exports = {
    startMainMenu: startMainMenu
};

function startMainMenu() {
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


}