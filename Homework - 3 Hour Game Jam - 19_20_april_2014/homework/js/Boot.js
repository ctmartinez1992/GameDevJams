Game8 = {};

Game8.Boot = function (game) {
};

Game8.Boot.prototype = {
    preload: function () {
        this.load.image('preloadBar', 'assets/loader.png');
    },

    create: function () {
        this.game.input.maxPointers = 1;
        this.game.stage.disableVisibilityChange = true;
        this.game.stage.backgroundColor = '#000000';
		this.game.stage.smoothing = false;

        if (this.game.device.desktop) {
            this.game.stage.scale.pageAlignHorizontally = true;
        } else {
        }

        this.game.state.start('Preloader', true, false);
    }
};
