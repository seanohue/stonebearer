/*  Art credits:
 *  Title page from Stephen Sanders (http://www.conceptart.org/forums/showthread.php/266427-Symbiosis-a-Creative-Commons-art-book)
 *  Logo from /u/stimpyrules (https://www.reddit.com/r/glitch_art/comments/4gy7sk/i_accidentally_optimized_a_model_too_much_and/)
 */

module Stonebearer {

    export class Preloader extends Phaser.State {

        preloadBar: Phaser.Sprite;

        preload() {

            // Set-up our preloader sprite
            this.preloadBar = this.add.sprite(200, 250, 'preloadBar');
            this.load.setPreloadSprite(this.preloadBar);

            // Load our actual games assets
            this.load.image('logo', 'assets/logo2.png');
            this.load.image('titlepage', 'assets/titlepage.jpg');
            this.load.audio('music', 'assets/title.mp3', true);
            this.load.spritesheet('simon', 'assets/simon.png', 58, 96, 5);
            this.load.image('level1', 'assets/level1.png');

        }

        create() {

            const settings = { alpha: 0 };
            const duration = 1000;
            const animation = Phaser.Easing.Linear.None;

            const loadingTween =
                this.add.tween(this.preloadBar)
                    .to(settings, duration, animation, true);

            loadingTween.onComplete.add(this.startMainMenu, this);

        }

        startMainMenu() {

            const splash = this.game.add.sprite(this.world.centerX, this.world.centerY, 'splash');
            splash.anchor.setTo(0.5, 0.5);
            splash.scale.setTo(0.2, 0.2);

            const introAnimation = () => {
                const endScale = { x: 1, y: 1 };
                const duration = 2000;
                const animation = Phaser.Easing.Bounce.Out;
                this.game.add.tween(splash.scale)
                    .to(endScale, duration, animation, true);
            };

            introAnimation();

            this.game.state.start('MainMenu', true, false);

        }

    }

}
