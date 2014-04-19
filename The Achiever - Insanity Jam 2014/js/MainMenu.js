Game6.MainMenu = function (game) {
    this.game = game;
};

Game6.MainMenu.prototype = {
	create: function () {
		//Logo and text animations
        this.logo1 = game.add.sprite(this.game.world.centerX, -100, 'logo1');
        this.logo2 = game.add.sprite(this.game.world.centerX, this.game.world.height + 100, 'logo2');

        this.logo1.anchor.setTo(0.5, 0.5);
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
		
        this.textIns = game.add.text(this.game.world.width / 2, this.game.world.height / 2 + 100, 'SPACE to shoot; C to change weapons; Arrows to move', { font: "14px Chunk", fill: "#dddddd", align: "center" });
        this.textIns.anchor.setTo(0.5, 0.5);
		this.textIns.visible = false;
		
        this.textObj = game.add.text(this.game.world.width / 2, this.game.world.height / 2 + 150, 'Get 200 achievement points', { font: "14px Chunk", fill: "#dddddd", align: "center" });
        this.textObj.anchor.setTo(0.5, 0.5);
		this.textObj.visible = false;
		
		//Audio
		this.logoTheSound = game.add.audio('logo_the_sound', 0.2);
		this.logoAchieverSound = game.add.audio('logo_achiever_sound', 0.4);
	},

	update: function () {
	},

	playLogoTheSound: function () {
		this.logoTheSound.play('', 0, 0.02);
	},

	playLogoAchieverSound: function () {	
		this.logoAchieverSound.play('', 0, 0.02);
		
		this.textIns.visible = true;
		this.textObj.visible = true;
		
		//Add ability to press space to start
		startButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		startButton.onDown.add(this.clearToStart, this);
		
		//Player
		this.player = game.add.sprite(100, 508, 'player');
		this.player.animations.add('idle', [0, 1, 2, 1]);
		this.player.animations.play('idle', 8, true);
		
		//Tile map
		this.map = this.game.add.tilemap('main_menu_level');
		this.map.addTilesetImage('menu_tiles_png', 'main_menu_tiles');
		this.layer = this.map.createLayer('main_menu_world');
		this.layer.resizeWorld();
	},

	clearToStart: function () {
		this.player.animations.stop('idle');
		this.player.frame = 3;
		var tween = this.game.add.tween(this.player).to({ x: this.game.world.width + 100 }, 3000, Phaser.Easing.Linear.None).start();
		tween.onComplete.add(this.startGame, this);
	},

	startGame: function () {
		this.game.state.start('Game', true, false);
	}
};
