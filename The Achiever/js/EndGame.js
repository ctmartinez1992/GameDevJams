Game6.EndGame = function (game) {
    this.game = game;
    this.game.score = 0;
    this.game.highscore = 0;
};

//Controls
var rToWin;

var dialog;

Game6.EndGame.prototype = {
	create: function () {		
		//Player
		this.player = game.add.sprite(300, this.game.world.height - 80, 'player');
		this.player.anchor.setTo(0.5, 0.5);
		this.player.health = 100;
		this.player.animations.add('idleHappy', [0, 1, 2, 1], 8, true);
		this.player.animations.add('idleNormal', [5, 6, 7, 6], 8, true);
		this.player.animations.add('idleAngry', [10, 11, 12, 11], 8, true);
		this.player.animations.add('left', [4], 1, true);
		this.player.animations.add('right', [3], 1, true);
		this.player.animations.play('idleNormal', 8, true);
		
		this.boss = game.add.sprite(this.game.world.width - 300, this.game.world.height - 80, 'boss');
		this.boss.anchor.setTo(0.5, 0.5);
		this.boss.health = 100;
		this.boss.scale.x = -1;
		this.boss.animations.add('idleHappy', [0, 1, 2, 1], 8, true);
		this.boss.animations.add('idleNormal', [5, 6, 7, 6], 8, true);
		this.boss.animations.add('idleAngry', [10, 11, 12, 11], 8, true);
		this.boss.animations.add('left', [4], 1, true);
		this.boss.animations.add('right', [3], 1, true);
		this.boss.animations.play('idleAngry', 8, true);
		
		this.love = game.add.sprite(this.game.world.width - 320, this.game.world.height - 120, 'life');
		this.love.anchor.setTo(0.5, 0.5);
		this.love.alpha = 0;
		this.love.visible = false;

		this.rKey = game.add.sprite(this.game.world.centerX, 140, 'r_key');
		this.rKey.alpha = 0;
		this.rKey.anchor.setTo(0.5, 0.5);
        this.textToWin = game.add.text(this.game.world.centerX, 200, 'Press r to win', { font: "14px Chunk", fill: "#dddddd", align: "center" });
		this.textToWin.alpha = 0;
        this.textToWin.anchor.setTo(0.5, 0.5);
		
		//Tile map
		this.map = this.game.add.tilemap('end_level');
		this.map.addTilesetImage('menu_tiles_png', 'tiles');
		this.map.setCollisionBetween(1, 12);
		this.map.setCollisionBetween(18, 46);
		this.map.setCollisionBetween(52, 68);
		this.layer = this.map.createLayer('world');
		this.layer.resizeWorld();
		
		//Dialog
		dialog = new Dialogs(this.game);
		dialog.create([" ", "I warned you...", " ", "I never wanted any of this to happen...", " ",
					   "But you just had to get more and more achievements, didn't you?",
					   " ", "Well...", " ", "This is the end of the line", " ", " ", " ",
					   "WHAT???", " " , "NO!", " ", "WAIT!", " ", "Please don't, that will kill me :(",
					   " ", "have mercy...", " ", " ", "I'm sorry for all the threats.", " ",
					   "I'm just tired of all of these achievements.", " ", "If only the developer had spent more time on gameplay"]);
		
		dialog.nextLine();
		
		goodEnding = new Dialogs(this.game);
		goodEnding.create([" ", "what...", " ", "You didn't...", " ", "but...", " "]);
		
		//goodEnding.nextLine();
		
		badEnding = new Dialogs(this.game);
		badEnding.create([" ", "..................", " ", "....wrong move....", " "]);
		
		//badEnding.nextLine();
		
		this.game.time.events.add(26000, function() {
			this.game.add.tween(this.rKey).to({ alpha: 1 }, 1000).start();
			this.game.add.tween(this.textToWin).to({ alpha: 1 }, 1000).start();
		}, this);
		
		this.game.time.events.add(60000, function() {			
			this.rKey.visible = false;
			this.textToWin.visible = false;
			dialog.getText().visible = false;
			
			this.boss.animations.play('idleNormal', 8, true);
			emitter.on = false;
			
			goodEnding.nextLine();
		}, this);
		
		//Rain
		var emitter = game.add.emitter(game.world.centerX, -200, 2000);
		emitter.width = game.world.width;
		emitter.angle = 10;
		emitter.makeParticles('rain');
		emitter.minParticleScale = 0.1;
		emitter.maxParticleScale = 0.5;
		emitter.setYSpeed(300, 500);
		emitter.setXSpeed(-5, 5);
		emitter.minRotation = 0;
		emitter.maxRotation = 0;
		emitter.start(false, 1600, 2, 0);
		
		//Controls
		rToWin = game.input.keyboard.addKey(Phaser.Keyboard.R);
		this.pressedR = false;
		this.loveAboveWar = false;
	},

	update: function () {
		if(rToWin.isDown && !this.pressedR && !this.loveAboveWar) {
			this.pressedR = true;
			this.player.animations.play('idleAngry', 8, true);
			
			this.rKey.visible = false;
			this.textToWin.visible = false;
			dialog.getText().visible = false;
			
			var tween1 = this.game.add.tween(this.player).to({ x: this.game.world.width - 330, }, 250, Phaser.Easing.Exponential.In).start();
			tween1.onComplete.add(function() {
				var tween2 = this.game.add.tween(this.boss).to({ y: 100, x: 1000, angle: 1234 }, 500, Phaser.Easing.Circular.InOut).start();
				tween2.onComplete.add(function() {
					badEnding.nextLine();
				}, this);
			}, this);
		}
		
		if(badEnding.done) {
			badEnding.done = false;
			this.fade('Game');
		}
		
		if(goodEnding.done && !this.love.visible) {
			this.love.visible = true;
			var tween3 = this.game.add.tween(this.player).to({ x: this.game.world.width - 340 }, 1000, Phaser.Easing.Linear.None).start();
			tween3.onComplete.add(function() {
				this.boss.animations.play('idleHappy', 8, true);
				this.player.animations.play('idleHappy', 8, true);
				this.game.add.tween(this.love).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, 500).start();
				this.game.add.tween(this.love.scale).to({ x: 1.7, y: 1.7 }, 500).to({ x: 1, y: 1 }).loop().start();
				this.game.time.events.loop(6000, function() { this.fade('Game'); }, this);
			}, this);
		}
    },
	
	fade: function (nextState) {
        var spr_bg = this.game.add.graphics(0, 0);
        spr_bg.beginFill('#000000', 1);
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
        spr_bg.beginFill('#000000', 1);
        spr_bg.drawRect(0, 0, this.game.width, this.game.height);
        spr_bg.alpha = 1;
        spr_bg.endFill();

        s = this.game.add.tween(spr_bg)
        s.to({ alpha: 0 }, 600, null)
		
		return s;
    }
};