module Stonebearer {
    export class Map extends Phaser.State {

        background: Phaser.Sprite;
        music: Phaser.Sound;
        player: Stonebearer.Player;

        create() {

            this.background = this.add.sprite(0, 0, 'level1');

            this.music = this.add.audio('music', 1, false);
            this.music.play;

            this.game.physics.startSystem(Phaser.Physics.P2JS);

            this.player = new Player(this.game, 130, 284);

            this.game.physics.enable(this.player, Phaser.Physics.P2JS)

        }

    }
}
