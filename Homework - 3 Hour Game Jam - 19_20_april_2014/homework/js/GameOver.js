Game8.GameOver = function (game) {
    this.game = game;
};

Game8.GameOver.prototype = {
	create: function () {
        this.sound.stopAll();
		
        this.textTitle = game.add.text(game.camera.width / 2, 50, "GAME OVER", { font: "28px Chunk", fill: "#ffffff", align: "center" });
        this.textTitle.anchor.setTo(0.5, 0.5);
		this.textTitle.alpha = 0;
		this.textTitle.fixedToCamera = true;
		game.add.tween(this.textTitle).to({ alpha: 1 }, 1000).start();
		
        this.textInst = game.add.text(game.camera.width / 2, game.camera.height / 2, "YOU FAILED TO COMPLETE BOTH MISSIONS", { font: "12px Chunk", fill: "#ffffff", align: "center" });
        this.textInst.anchor.setTo(0.5, 0.5);
		this.textInst.alpha = 0;
		this.textInst.fixedToCamera = true;
		game.add.tween(this.textInst).to({ alpha: 1 }, 500, null, false, 1000).start();
		
        this.text = game.add.text(game.camera.width / 2, game.camera.height - 50, "SPACE TO GO TO MENU", { font: "18px Chunk", fill: "#ffffff", align: "center" });
        this.text.anchor.setTo(0.5, 0.5);
		this.text.alpha = 0;
		this.text.fixedToCamera = true;
		game.add.tween(this.text).to({ alpha: 1 }, 500, null, false, 1500).start();
		game.add.tween(this.text).to({ angle: -1 }, 250).to({ angle: 1 }, 250).loop().start();	
	},

	update: function () {	
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            this.startGame();
        }
	},

	startGame: function () {
		Fade.fadeOut('MainMenu');
	}
};
