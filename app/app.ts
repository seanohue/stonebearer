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

            this.state.start('Boot');

        }

    }

}

window.onload = () => {
    var game = new Stonebearer.Game();
}
