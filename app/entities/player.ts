module Stonebearer {
    export class Player extends Phaser.Sprite {

        constructor(game: Phaser.Game, x: number, y: number) {

            super(game, x, y, 'simon', 0);

            this.anchor
                .setTo(0.5, 0);

            this.animations
                .add('walk', [0, 1, 2, 3, 4], 10, true);

            game.add
                .existing(this);

        }

        update() {

            this.body.velocity.x = 0;

            // Helper functions for keypress events.
            const pressed = key => this.game.input.keyboard.isDown(key);
            const move = direction => {
                this.body.velocity.x = 150 * direction.x;
                this.animations.play('walk');

                if (this.scale.x == -direction.x) {
                    this.scale.x = direction.x;
                }
            };


            if (pressed(Phaser.Keyboard.LEFT)) {
                move({ x: -1 });
            }
            else if (pressed(Phaser.Keyboard.RIGHT)) {
                move({ x: 1 });
            }
            else {
                this.animations.frame = 0;
            }

        }

    }

}
