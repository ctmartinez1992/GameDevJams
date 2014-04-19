Game8.EndScreen = function (game) {
    this.game = game;
};

Game8.EndScreen.prototype = {
	create: function () {
        this.sound.stopAll();
		
		this.readyToEnd = false;
		
		text1 = game.add.text(game.camera.width / 2, 100, '', { font: "20px Chunk", align: "center", fill: "#22bb22", stroke: "#000000", strokeThickness: 2 });
		text2 = game.add.text(game.camera.width / 2, 130, '', { font: "20px Chunk", align: "center", fill: "#22bb22", stroke: "#000000", strokeThickness: 2 });
		text3 = game.add.text(game.camera.width / 2, 160, '', { font: "20px Chunk", align: "center", fill: "#22bb22", stroke: "#000000", strokeThickness: 2 });
		text4 = game.add.text(game.camera.width / 2, 190, '', { font: "20px Chunk", align: "center", fill: "#22bb22", stroke: "#000000", strokeThickness: 2 });
		text5 = game.add.text(game.camera.width / 2, 250, '', { font: "20px Chunk", align: "center", fill: "#22bb22", stroke: "#000000", strokeThickness: 2 });
		
		text1.anchor.setTo(0.5, 0.5);
		text2.anchor.setTo(0.5, 0.5);
		text3.anchor.setTo(0.5, 0.5);
		text4.anchor.setTo(0.5, 0.5);
		text5.anchor.setTo(0.5, 0.5);
		text1.alpha = 0;
		text2.alpha = 0;
		text3.alpha = 0;
		text4.alpha = 0;
		text5.alpha = 0;
		text1.fixedToCamera = true;
		text2.fixedToCamera = true;
		text3.fixedToCamera = true;
		text4.fixedToCamera = true;
		text5.fixedToCamera = true;
		
		if(hmScore == 0) {
			text1.setText('MISERABLE');
			text2.setText('YOU GOT YOUR HOMEWORK ALL WRONG');
			text3.setText('YOU DONT DESERVE TO KNOW YOUR GAME SCORE');
			text4.setText('DISASTROUS');
			//text5.setText('TOTAL SCORE: ' + (game.score + (hmScore * hmScore)));
		} if(hmScore == 20) {
			text1.setText('OUTSTANDING');
			text2.setText('YOU GOT YOUR HOMEWORK ALL RIGHT');
			text3.setText('FIREWORKS AND UNICORNS AND POPCORNS');
			text4.setText('CONGRATULATIONS');
			text5.setText('TOTAL SCORE: ' + ((60 - game.score) + (hmScore * hmScore)));
		} else if(hmScore < 10 && game.score < 30) {
			text1.setText('AWFUL');
			text2.setText('YOU ONLY SCORED ' + hmScore + " OUT OF " + hmScoreMax);
			text3.setText('AND ' + game.score + ' IN THE GAME');
			text4.setText('TERRIBLE');
			text5.setText('TOTAL SCORE: ' + ((60 - game.score) + (hmScore * hmScore)));
		} else if(hmScore > 10 && game.score > 50) {
			text1.setText('AWESOME');
			text2.setText('YOU SCORED ' + hmScore + " OUT OF " + hmScoreMax);
			text3.setText('AND ' + game.score + ' IN THE GAME');
			text4.setText('GOOD JOB');
			text5.setText('TOTAL SCORE: ' + ((60 - game.score) + (hmScore * hmScore)));
		} else if(hmScore < 10) {
			text1.setText('AVERAGE JOB');
			text2.setText('YOU ONLY SCORED ' + hmScore + " OUT OF " + hmScoreMax);
			text3.setText('AT LEAST YOU GOT ' + game.score + ' IN THE GAME');
			text4.setText('NICE');
			text5.setText('TOTAL SCORE: ' + ((60 - game.score) + (hmScore * hmScore)));
		} else if(game.score < 30) {
			text1.setText('AVERAGE JOB');
			text2.setText('YOU SCORED ' + hmScore + " OUT OF " + hmScoreMax);
			text3.setText('BUT YOU ONLY GOT ' + game.score + ' IN THE GAME');
			text4.setText('NICE');
			text5.setText('TOTAL SCORE: ' + ((60 - game.score) + (hmScore * hmScore)));
		} else {
			text1.setText('GOOD JOB');
			text2.setText('YOU SCORED ' + hmScore + " OUT OF " + hmScoreMax);
			text3.setText('AND YOU GOT ' + game.score + ' IN THE GAME');
			text4.setText('EXCELLENT');
			text5.setText('TOTAL SCORE: ' + ((60 - game.score) + (hmScore * hmScore)));
		}
		
		var tween1 = game.add.tween(text1).to({ alpha: 1 }, 1000, null, true, 500).start();
        tween1.onComplete.add(function() {
			var tween2 = game.add.tween(text2).to({ alpha: 1 }, 1000, null, true, 500).start();
			tween2.onComplete.add(function() {
				var tween3 = game.add.tween(text3).to({ alpha: 1 }, 1000, null, true, 500).start();
				tween3.onComplete.add(function() {
					var tween4 = game.add.tween(text4).to({ alpha: 1 }, 1000, null, true, 500).start();
					tween4.onComplete.add(function() {
						var tween5 = game.add.tween(text5).to({ alpha: 1 }, 1000, null, true, 500).start();
						tween5.onComplete.add(function() {
							this.text = game.add.text(game.camera.width / 2, game.camera.height / 2 + 120, "SPACE TO GO TO THE MENU", { font: "18px Chunk", fill: "#ffffff", align: "center" });
							this.text.anchor.setTo(0.5, 0.5);
							this.text.alpha = 0;
							this.text.fixedToCamera = true;
							game.add.tween(this.text).to({ alpha: 1 }, 500).start();
							game.add.tween(this.text).to({ angle: -1 }, 250).to({ angle: 1 }, 250).loop().start();
							this.readyToEnd = true;
						}, this);
					}, this);
				}, this);
			}, this);
		}, this);
	},

	update: function () {	
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && this.readyToEnd) {
            this.startGame();
        }
    },

	startGame: function () {
		game.state.start('MainMenu', true, true);
	}
};