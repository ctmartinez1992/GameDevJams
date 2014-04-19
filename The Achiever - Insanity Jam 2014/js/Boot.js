Game6 = {};

Game6.Boot = function (game) {
};

Game6.Boot.prototype = {
    preload: function () {
        this.load.image('preloadBar', 'assets/loader.png');
    },

    create: function () {
        this.game.input.maxPointers = 1;
        this.game.stage.disableVisibilityChange = true;
        this.game.stage.backgroundColor = '#000000';

        if (this.game.device.desktop) {
            this.game.stage.scale.pageAlignHorizontally = true;
        } else {
        }

        this.game.state.start('Preloader', true, false);
    }
};
