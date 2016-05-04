module Stonebearer {

    export class MainMenu extends Phaser.State {

        background: Phaser.Sprite
        logo: Phaser.Sprite

        create() {

            this.background = this.add.sprite(0, 0, 'titlepage');
            this.background.alpha = 0

            this.logo = this.add.sprite(this.world.centerX, -300, 'logo');
            this.logo.anchor.setTo(0.5, 0.5);

            const duration = 2000;

            this.add.tween(this.background)
                .to({ alpha: 1}, duration, Phaser.Easing.Bounce.InOut, true);
            this.add.tween(this.logo)
                .to({ y: 220 }, duration, Phaser.Easing.Elastic.Out, true, duration);

            this.input.onDown.addOnce(this.fadeOut, this);

        }

        fadeOut() {

            const duration = 2000;

            this.add.tween(this.background)
                .to({ alpha: 0 }, duration, Phaser.Easing.Linear.None, true);

            const logoBounce = this.add.tween(this.logo)
                                   .to({ y: 800 }, duration, Phaser.Easing.Linear.None, true);

            logoBounce.onComplete.add(this.startGame, this);

        }

        startGame() {

          console.log('yey');

        }

    }

}
