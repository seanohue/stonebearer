module Stonebearer {
    export class Map extends Phaser.State {

        background: Phaser.Sprite;
        music: Phaser.Sound;
        player: Stonebearer.Player;

        create() {

            this.background = this.add.sprite(0, 0, 'map_bg');

            this.music = this.add.audio('music', 1, false);
            this.music.play;

            this.player = new Player(this.game, 130, 284);

        }

    }
}
