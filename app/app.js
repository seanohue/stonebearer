var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Stonebearer;
(function (Stonebearer) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            var width = 800;
            var height = 600;
            var renderer = Phaser.AUTO;
            var parentElement = 'content';
            _super.call(this, width, height, renderer, parentElement, null);
            this.state.add('Boot', Stonebearer.Boot, false);
            this.state.add('Preloader', Stonebearer.Preloader, false);
            this.state.start('boot');
        }
        return Game;
    }(Phaser.Game));
    Stonebearer.Game = Game;
})(Stonebearer || (Stonebearer = {}));
var Stonebearer;
(function (Stonebearer) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            _super.apply(this, arguments);
        }
        Boot.prototype.preload = function () {
            this.load.image('preloadBar', 'assets/corp-playtime.jpg');
        };
        Boot.prototype.create = function () {
            this.input.maxPointers = 1;
            this.stage.disableVisibilityChange = true;
            if (this.game.device.desktop) {
            }
            else {
            }
            this.game.state.start('Preloader', true, false);
        };
        return Boot;
    }(Phaser.State));
    Stonebearer.Boot = Boot;
})(Stonebearer || (Stonebearer = {}));
var Stonebearer;
(function (Stonebearer) {
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            _super.apply(this, arguments);
        }
        Preloader.prototype.preload = function () {
            this.preloadBar = this.add.sprite(200, 250, 'preloadBar');
            this.load.setPreloadSprite(this.preloadBar);
        };
        Preloader.prototype.create = function () {
            var settings = { alpha: 0 };
            var duration = 1000;
            var animation = Phaser.Easing.Linear.None;
            var loadingTween = this.add.tween(this.preloadBar)
                .to(settings, duration, animation, true);
            loadingTween.onComplete.add(this.startMainMenu, this);
        };
        Preloader.prototype.startMainMenu = function () {
            console.log('lol');
        };
        return Preloader;
    }(Phaser.State));
    Stonebearer.Preloader = Preloader;
})(Stonebearer || (Stonebearer = {}));
//# sourceMappingURL=app.js.map