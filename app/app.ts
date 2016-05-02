/// <reference path="../node_modules/phaser/typescript/phaser.d.ts" />

class SimpleGame {

  constructor() {
    const width = 800;
    const height = 600;
    const renderer = Phaser.AUTO;
    const parentElement = 'content';
    const gameStates = {
      preload: this.preload,
      create: this.create,
    };

    this.game = new Phaser.Game(width, height, renderer, parentElement, gameStates);
  }

  game: Phaser.Game;

  preload() {
      this.game.load.image('logo', 'phaser2.png');
  }

  create() {
      const logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
      logo.anchor.setTo(0.5, 0.5);
  }

}

window.onload = () => {
  var game = new SimpleGame();
};
