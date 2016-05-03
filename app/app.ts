/// <reference path="../node_modules/phaser/typescript/phaser.d.ts" />

 /*
  *
  */

module Stonebearer {

  export class Game extends Phaser.Game {

    constructor() {

      const width = 800;
      const height = 600;
      const renderer = Phaser.AUTO;
      const parentElement = 'content';

      super(width, height, renderer, parentElement, null);

      this.state.add('Boot', Boot, false);
      this.state.add('Preloader', Preloader, false);
      // this.state.add('MainMenu', MainMenu, false);
      // this.state.add('Level1', Level1, false);

      this.state.start('boot');

    }

  }

}

// class Game {
//
//     constructor() {
//
//     }
//
//     game: Phaser.Game;
//
//     preload() {
//         this.game.load.image('logo', 'corp-playtime.jpg');
//     }
//
//     create() {
//         const logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
//         logo.anchor.setTo(0.5, 0.5);
//         logo.scale.setTo(0.2, 0.2);
//
//         const introTween = () => {
//             const endScale = { x: 1, y: 1 };
//             const duration = 2000;
//             const animation = Phaser.Easing.Bounce.Out;
//             this.game.add
//                 .tween(logo.scale)
//                 .to(endScale, duration, animation, true);
//         };
//
//         introTween();
//
//     }
//
// }

// window.onload = () => {
//     var game = new Game();
//     game.preload();
//     game.create();
// };
