Game6.EndScreen = function (game) {
    this.game = game;
};

Game6.EndScreen.prototype = {
	create: function () {
		
		//Logo and text animations
        this.logo1 = game.add.sprite(this.game.world.centerX, 100, 'logo1');
        this.logo2 = game.add.sprite(this.game.world.centerX, this.game.world.height - 100, 'logo2');

        /*this.logo1.anchor.setTo(0.5, 0.5);
        this.logo2.anchor.setTo(0.5, 0.5);
		var tweenThe = this.game.add.tween(this.logo1).delay(250).to({ y: 100 }, 1250, Phaser.Easing.Linear.None).start();
		var tweenAchiever = this.game.add.tween(this.logo2).delay(750).to({ y: 200 }, 1750, Phaser.Easing.Linear.None).start();
		tweenThe.onComplete.add(this.playLogoTheSound, this);
		tweenAchiever.onComplete.add(this.playLogoAchieverSound, this);
		
        this.text = game.add.text(this.game.world.width / 2, this.game.world.height / 2 + 50, "SPACE TO START", { font: "18px Chunk", fill: "#228822", align: "center" });
        this.text.anchor.setTo(0.5, 0.5);
		this.text.alpha = 0;
		game.add.tween(this.text).delay(2500).to({ alpha: 1 }, 500).start();
		game.add.tween(this.text).to({ angle: -1 }, 250).to({ angle: 1 }, 250).loop().start();
		
        this.textAch = game.add.text(this.game.world.width - 10, 10, achievs + " / " + achievsMax, { font: "14px Chunk", fill: "#dddddd", align: "center" });
        this.textAch.anchor.setTo(1, 0);
		this.textAch.alpha = 0;
		game.add.tween(this.textAch).delay(2500).to({ alpha: 1 }, 500).start();
		
		//Audio
		this.logoTheSound = game.add.audio('logo_the_sound', 0.2);
		this.logoAchieverSound = game.add.audio('logo_achiever_sound', 0.4);*/
	},

	update: function () {
	},
	
	fade: function (nextState) {
        var spr_bg = this.game.add.graphics(0, 0);
        spr_bg.beginFill(this.fadeColor, 1);
        spr_bg.drawRect(0, 0, this.game.width, this.game.height);
        spr_bg.alpha = 0;
        spr_bg.endFill();

        this.nextState = nextState;

        s = this.game.add.tween(spr_bg)
        s.to({ alpha: 1 }, 500, null)
        s.onComplete.add(this.changeState, this)
        s.start();
    },

    changeState: function () {
        this.game.state.start(this.nextState);
        this.fadeOut();
    },

    fadeOut: function () {
        var spr_bg = this.game.add.graphics(0, 0);
        spr_bg.beginFill(this.fadeColor, 1);
        spr_bg.drawRect(0, 0, this.game.width, this.game.height);
        spr_bg.alpha = 1;
        spr_bg.endFill();

        s = this.game.add.tween(spr_bg)
        s.to({ alpha: 0 }, 600, null)
        s.start();
    }
};
