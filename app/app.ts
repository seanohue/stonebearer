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
        }

        preload() {

            this.load.image('logo', 'corp-playtime.jpg');

        }

        create() {

            const logo = this.add.sprite(this.world.centerX, this.world.centerY, 'logo');
            logo.anchor.setTo(0.5, 0.5);
            logo.scale.setTo(0.2, 0.2);

            const introAnimation = () => {
                const endScale = { x: 1, y: 1 };
                const duration = 2000;
                const animation = Phaser.Easing.Bounce.Out;
                this.add.tween(logo.scale)
                    .to(endScale, duration, animation, true);
            };

            introAnimation();
            this.state.start('Boot');

        }

    }

}

window.onload = () => {
    var game = new Stonebearer.Game();
    game.preload();
    game.create();
}
