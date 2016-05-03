module Stonebearer {

  /*
   * BOOT: Starts the game and initializes global Phaser settings.
   *       Please comment any non-self-explanatory settings.
   */

  export class Boot extends Phaser.State {

    preload() {
      this.load.image('preloadBar', 'assets/corp-playtime.jpg');
    }

    create() {
      this.input.maxPointers = 1;                // No multi-touch.
      this.stage.disableVisibilityChange = true; // Pause on losing focus.

      if (this.game.device.desktop) {
        // Desktop-specific settings
      }
      else {
        // Mobile-specific settings.
      }

      this.game.state.start('Preloader', true, false);

    }

  }

}
