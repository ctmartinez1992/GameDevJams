Game8.IntroScreen = function (game) {
    this.game = game;
};

Game8.IntroScreen.prototype = {
	create: function () {
        this.sound.stopAll();
		
		text1 = game.add.text(game.camera.width / 2, 100, '', { font: "14px Chunk", align: "center", fill: "#22bb22", stroke: "#000000", strokeThickness: 2 });
		text2 = game.add.text(game.camera.width / 2, 130, '', { font: "14px Chunk", align: "center", fill: "#22bb22", stroke: "#000000", strokeThickness: 2 });
		text3 = game.add.text(game.camera.width / 2, 160, '', { font: "14px Chunk", align: "center", fill: "#22bb22", stroke: "#000000", strokeThickness: 2 });
		text4 = game.add.text(game.camera.width / 2, 190, '', { font: "14px Chunk", align: "center", fill: "#22bb22", stroke: "#000000", strokeThickness: 2 });
		text5 = game.add.text(game.camera.width / 2, 250, '', { font: "14px Chunk", align: "center", fill: "#22bb22", stroke: "#000000", strokeThickness: 2 });
		
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
		
		text1.setText('YO......            HEY DUDE');
		text2.setText('THIS IS YOUR BRAIN SPEAKING');
		text3.setText('YOU FORGOT YOUR HOMEWORK AND YOU STILL HAVE TO FINISH YOUR GAME');
		text4.setText('YOU HAVE 1 MINUTE BEFORE SCHOOL');
		text5.setText('START WORKING ON IT');
		
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
							game.time.events.add(2000, function() { Fade.fadeOut('Game', 2000); }, this);
						}, this);
					}, this);
				}, this);
			}, this);
		}, this);
	},
};