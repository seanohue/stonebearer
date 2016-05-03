module Stonebearer {

  export class Preloader extends Phaser.State {

    preloadBar: Phaser.Sprite;

    preload() {

        // Set-up our preloader sprite
        this.preloadBar = this.add.sprite(200, 250, 'preloadBar');
        this.load.setPreloadSprite(this.preloadBar);

        // Load our actual games assets
        // this.load.image('titlepage', 'assets/titlepage.jpg');
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
        console.log('lol');
        //this.game.state.start('MainMenu', true, false);
    }

  }

}
