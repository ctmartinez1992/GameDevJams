Game8.MainMenu = function (game) {
    this.game = game;
};

Game8.MainMenu.prototype = {
	create: function () {
        this.sound.stopAll();
		
		tYo = game.add.sprite(400, 100, 'text_yo');
		tYo.visible = false;
		
        this.textTitle = game.add.text(game.camera.width / 2, 50, "HOMEWORK", { font: "28px Chunk", fill: "#ffffff", align: "center" });
        this.textTitle.anchor.setTo(0.5, 0.5);
		this.textTitle.alpha = 0;
		this.textTitle.fixedToCamera = true;
		game.add.tween(this.textTitle).to({ alpha: 1 }, 1000).start();
		
        this.textInst = game.add.text(game.camera.width / 2, game.camera.height / 2, "Arrows to move and jump; You can triple jump", { font: "12px Chunk", fill: "#ffffff", align: "center" });
        this.textInst.anchor.setTo(0.5, 0.5);
		this.textInst.alpha = 0;
		this.textInst.fixedToCamera = true;
		game.add.tween(this.textInst).to({ alpha: 1 }, 500, null, false, 1000).start();
		
        this.textInst2 = game.add.text(game.camera.width / 2, game.camera.height / 2 + 35, "P to pause; 1 2 or 3 to do your homework", { font: "12px Chunk", fill: "#ffffff", align: "center" });
        this.textInst2.anchor.setTo(0.5, 0.5);
		this.textInst2.alpha = 0;
		this.textInst2.fixedToCamera = true;
		game.add.tween(this.textInst2).to({ alpha: 1 }, 500, null, false, 1000).start();
		
        this.textObj = game.add.text(game.camera.width / 2, game.camera.height / 2 + 125, "SAVE THE PRINCESS AND FINISH YOUR HOMEWORK", { font: "18px Chunk", fill: "#ff69b4", align: "center" });
        this.textObj.anchor.setTo(0.5, 0.5);
		this.textObj.alpha = 0;
		this.textObj.fixedToCamera = true;
		game.add.tween(this.textObj).to({ alpha: 1 }, 500, null, false, 1500).start();
		game.add.tween(this.textObj.scale).to({ x: 1.1, y: 1.1 }, 250).to({ x: 1, y: 1 }, 250).loop().start();	
		
        this.text = game.add.text(game.camera.width / 2, game.camera.height - 50, "SPACE TO START", { font: "18px Chunk", fill: "#ffffff", align: "center" });
        this.text.anchor.setTo(0.5, 0.5);
		this.text.alpha = 0;
		this.text.fixedToCamera = true;
		game.add.tween(this.text).to({ alpha: 1 }, 500, null, false, 2000).start();
		game.add.tween(this.text).to({ angle: -1 }, 250).to({ angle: 1 }, 250).loop().start();	
		
		game.time.events.add(2500, function() { tYo.visible = true }, this);
		game.time.events.add(5000, function() { tYo.visible = false }, this);
	},

	update: function () {	
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            this.startGame();
        }
	},

	startGame: function () {
		Fade.fadeOut('IntroScreen');
	}
};
