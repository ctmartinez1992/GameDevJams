Game8.Game = function (game) {
    this.game = game;
    this.game.score = 0;
    this.game.highscore = 0;
	hmScore = 0;
	hmScoreMax = 20;
};

var jumpTimer = 0;

var jumping = false;
var doubleJumping = false;

var time = 60;

Game8.Game.prototype = {
	create: function () {
        this.sound.stopAll();
		
		game.physics.startSystem(Phaser.Physics.ARCADE);
	
		//bg
		this.bg = game.add.sprite(0, 0, "bg");	
		this.bg.fixedToCamera = true;
	
		//Completed the game
		this.completeText = game.add.text(695, 70, "GAME DONE", { font: "20px Chunk", fill: "#ffffff", align: "center", stroke: "#000000", strokeThickness: 2 });	
		this.completeText.anchor.setTo(0.5, 0.5);	
		this.completeText.alpha = 0;
		this.completeText.fixedToCamera = true;
		
		//Control variables
		doUpdate = true;
		paused = false;
		
		//Initialize Pause function
		Pause.init();
		
		//Volume handler
		Volume.init(0, game.world.height - 26);
		
		//Game keys
		answer1Button = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
		answer1Button.onDown.add(this.answered1, this);
		answer2Button = game.input.keyboard.addKey(Phaser.Keyboard.TWO);
		answer2Button.onDown.add(this.answered2, this);
		answer3Button = game.input.keyboard.addKey(Phaser.Keyboard.THREE);
		answer3Button.onDown.add(this.answered3, this);
		
		//Spikes
		spikes1 = game.add.sprite(208, 508, 'spikes');
		spikes1.anchor.setTo(0.5, 0.5);
		game.physics.enable(spikes1, Phaser.Physics.ARCADE);
		spikes1.body.allowRotation = false; spikes1.body.allowGravity = false; spikes1.body.immovable = true;
		
		spikes2 = game.add.sprite(975, 505, 'spikes');
		spikes2.anchor.setTo(0.5, 0.5);
		game.physics.enable(spikes2, Phaser.Physics.ARCADE);
		spikes2.body.allowRotation = false; spikes2.body.allowGravity = false; spikes2.body.immovable = true;
		
		spike1 = game.add.sprite(677, 345, 'spike');
		spike1.anchor.setTo(0.5, 0.5);
		game.physics.enable(spike1, Phaser.Physics.ARCADE);
		spike1.body.allowRotation = false; spike1.body.allowGravity = false; spike1.body.immovable = true;
		
		spike2 = game.add.sprite(280, 232, 'spike');
		spike2.anchor.setTo(0.5, 0.5);
		game.physics.enable(spike2, Phaser.Physics.ARCADE);
		spike2.body.allowRotation = false; spike2.body.allowGravity = false; spike2.body.immovable = true;
		
		//Map
		map = game.add.tilemap('map_json');
		map.addTilesetImage('tiles_spritesheet', 'tiles');
		map.setCollisionByExclusion([ 20, 21, 22, 23, 24, 25, 26, 42 ]);
		map.setTileIndexCallback(20, this.lavaHit, this);
		map.setTileIndexCallback(21, this.lavaHit, this);
		map.setTileIndexCallback(22, this.lavaHit, this);
		map.setTileIndexCallback(23, this.lavaHit, this);
		map.setTileIndexCallback(24, this.lavaHit, this);
		map.setTileIndexCallback(25, this.lavaHit, this);
		layer = map.createLayer('tiles');
		layer.resizeWorld();
		
		game.physics.arcade.gravity.y = 1500;

		//Player
		player = game.add.sprite(40, 300, 'player');
		player.anchor.setTo(0.5, 0.5);
		game.physics.enable(player, Phaser.Physics.ARCADE);
		
		player.body.collideWorldBounds = true;
		player.animations.add('walk', [0, 1, 2, 1], 5, true);

		game.camera.follow(player);
		
		//Quiz system
		qs = new Questions(game);
		
		jumpTimer = game.time.now;
		
		//Keys
		cursors = game.input.keyboard.createCursorKeys();
		jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.UP);
		
		game.time.events.loop(1000, function(){ time -= 1; game.score += 1; }, this);
		
		//Sounds
		soundJump = game.add.audio('sound_jump');
		
		//Text
        this.textScore = game.add.text(game.camera.width - 50, 20, "SCORE: " + game.score, { font: "12px Chunk", fill: "#ffffff", align: "center" });
        this.textScore.anchor.setTo(0.5, 0.5);
		this.textScore.fixedToCamera = true;
        this.textTime = game.add.text(game.camera.width - 50, 40, "TIME: " + time, { font: "12px Chunk", fill: "#ffffff", align: "center" });
        this.textTime.anchor.setTo(0.5, 0.5);
		this.textTime.fixedToCamera = true;
	},

	update: function () {
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.ESC)) {            
			game.state.start('MainMenu');
        }
		
		if(wonHomework && wonGame) {
			game.time.events.add(2000, function() { Fade.fadeOut('EndScreen', 2500) }, this);
		}
		
		if(player.x > 1310) {
			game.add.tween(this.completeText).to({ alpha: 1 }, 2500).start();
			wonGame = true;
			doUpdate = false;
		}
		
		if(time == 0) {
			doUpdate = false;
			Fade.fadeOut('GameOver');
		}
		
		qs.cycleQuestions();
		this.textScore.setText("SCORE: " + game.score);
		this.textTime.setText("TIME: " + time);
		
		game.physics.arcade.collide(player, layer);
		game.physics.arcade.collide(player, spikes1, this.spikeHit, null, this);
		game.physics.arcade.collide(player, spikes2, this.spikeHit, null, this);
		game.physics.arcade.collide(player, spike1, this.spikeHit, null, this);
		game.physics.arcade.collide(player, spike2, this.spikeHit, null, this);
		
		if (doUpdate) {		
			this.updatePlayer();
        }		
    },
	
	updatePlayer: function() {
		
		player.body.velocity.x = 0;
		if (cursors.left.isDown) {
			player.body.velocity.x = -150;
			player.scale.x = -1;
			player.animations.play('walk');
		} else if (cursors.right.isDown) {
			player.body.velocity.x = 150;
			player.scale.x = 1;
			player.animations.play('walk');
		} else {
			player.animations.stop();
        }

		if (jumpButton.isDown && game.time.now > jumpTimer && !doubleJumping) {
			soundJump.play('', 0, 0.25);			
			if(jumping) {
				doubleJumping = true;
			}
				
			player.body.velocity.y = -300;			
			jumpTimer = game.time.now + 250;
			jumping = true;
		}
		
		if(player.body.onFloor()) {
			jumping = false;
			doubleJumping = false;
		}
	},
	
	answered1: function() {
		if(readyToAnswer) {
			readyToAnswer = false;
			qs.questionToShow.hideQuestion();	
			game.time.events.add(1000, function() { answering = false; }, this);
			qs.questionToShow.done = true;
			if(qs.questionToShow.correctAnswer == "1") {
				qs.questionToShow.correct = true;
			}
		}
	},
	
	answered2: function() {
		if(readyToAnswer) {
			readyToAnswer = false;
			qs.questionToShow.hideQuestion();	
			game.time.events.add(1000, function() { answering = false; }, this);
			qs.questionToShow.done = true
			if(qs.questionToShow.correctAnswer == "2") {
				qs.questionToShow.correct = true;
			}
		}
	},
	
	answered3: function() {
		if(readyToAnswer) {
			readyToAnswer = false;
			qs.questionToShow.hideQuestion();	
			game.time.events.add(1000, function() { answering = false; }, this);
			qs.questionToShow.done = true;
			if(qs.questionToShow.correctAnswer == "3") {
				qs.questionToShow.correct = true;
			}
		}
	},
	
	lavaHit: function() {
		game.score -= 25;
		player.reset(40, game.world.height - 150);
	},
	
	spikeHit: function() {
		game.score -= 10;
		player.reset(40, game.world.height - 150);
	}
};