/// <reference path="../node_modules/phaser/typescript/phaser.d.ts" />
var Game = (function () {
    function Game() {
        var width = 800;
        var height = 600;
        var renderer = Phaser.AUTO;
        var parentElement = 'content';
        var gameStates = {
            preload: this.preload,
            create: this.create
        };
        this.game = new Phaser.Game(width, height, renderer, parentElement, gameStates);
    }
    Game.prototype.preload = function () {
        this.game.load.image('logo', 'phaser2.png');
    };
    Game.prototype.create = function () {
        var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
        logo.anchor.setTo(0.5, 0.5);
    };
    return Game;
}());
window.onload = function () {
    var game = new Game();
};
