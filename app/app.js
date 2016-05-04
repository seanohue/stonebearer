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
            this.state.add('MainMenu', Stonebearer.MainMenu, false);
            this.state.start('Boot');
        }
        return Game;
    }(Phaser.Game));
    Stonebearer.Game = Game;
})(Stonebearer || (Stonebearer = {}));
window.onload = function () {
    var game = new Stonebearer.Game();
};
var Stonebearer;
(function (Stonebearer) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            _super.apply(this, arguments);
        }
        Boot.prototype.preload = function () {
            this.load.image('splash', 'assets/corp-playtime.jpg');
            this.load.image('preloadBar', 'assets/loader.png');
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
    var MainMenu = (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu() {
            _super.apply(this, arguments);
        }
        MainMenu.prototype.create = function () {
            this.background = this.add.sprite(0, 0, 'titlepage');
            this.background.alpha = 0;
            this.logo = this.add.sprite(this.world.centerX, -300, 'logo');
            this.logo.anchor.setTo(0.5, 0.5);
            var duration = 2000;
            this.add.tween(this.background)
                .to({ alpha: 1 }, duration, Phaser.Easing.Bounce.InOut, true);
            this.add.tween(this.logo)
                .to({ y: 220 }, duration, Phaser.Easing.Elastic.Out, true, duration);
            this.input.onDown.addOnce(this.fadeOut, this);
        };
        MainMenu.prototype.fadeOut = function () {
            var duration = 2000;
            this.add.tween(this.background)
                .to({ alpha: 0 }, duration, Phaser.Easing.Linear.None, true);
            var logoBounce = this.add.tween(this.logo)
                .to({ y: 800 }, duration, Phaser.Easing.Linear.None, true);
            logoBounce.onComplete.add(this.startGame, this);
        };
        MainMenu.prototype.startGame = function () {
            console.log('yey');
        };
        return MainMenu;
    }(Phaser.State));
    Stonebearer.MainMenu = MainMenu;
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
            this.load.image('logo', 'assets/logo.png');
            this.load.image('titlepage', 'assets/titlepage.jpg');
            this.load.audio('music', 'assets/title.mp3', true);
            this.load.spritesheet('simon', 'assets/simon.png', 58, 96, 5);
            this.load.image('level1', 'assets/level1.png');
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
            var _this = this;
            var splash = this.game.add.sprite(this.world.centerX, this.world.centerY, 'splash');
            splash.anchor.setTo(0.5, 0.5);
            splash.scale.setTo(0.2, 0.2);
            var introAnimation = function () {
                var endScale = { x: 1, y: 1 };
                var duration = 2000;
                var animation = Phaser.Easing.Bounce.Out;
                _this.game.add.tween(splash.scale)
                    .to(endScale, duration, animation, true);
            };
            introAnimation();
            this.game.state.start('MainMenu', true, false);
        };
        return Preloader;
    }(Phaser.State));
    Stonebearer.Preloader = Preloader;
})(Stonebearer || (Stonebearer = {}));
//# sourceMappingURL=app.js.map