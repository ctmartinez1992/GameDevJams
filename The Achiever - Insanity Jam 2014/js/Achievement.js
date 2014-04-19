var Achievement = function (game, path, id, value, name, description) {
    this.game = game;
	
	this.storeX = 20;
	this.storeY = 20;
	
	this.sprite = this.game.add.sprite(20, 20, path);
	this.sprite.visible = false;
	this.sprite.alpha = 0;
	this.id = id;
	this.value = value;
	this.name = name;
	this.description = description;
	this.completed = false;
};

//In-Game achievement appearance
Achievement.prototype.showAchievement = function() {
	achievs += this.value;
	this.completed = true;
	this.sprite.visible = true;
	
	this.game.add.tween(this.sprite).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 100);
	var tween = this.game.add.tween(this.sprite).to({ y: -100 }, 1000, Phaser.Easing.Linear.None, true, 3500);
	tween.onComplete.add(function() { this.sprite.visible = false; achieving = false; }, this);
};

//Menu achievement appearance
Achievement.prototype.displayAchievement = function(x, y) {
	this.sprite.x = x;
	this.sprite.y = y;
	this.sprite.alpha = (this.completed) ? 1 : 0.5;
	this.sprite.visible = true;
	var tmpText = this.game.add.text(x, y + 100, this.description, { font: "14px Chunk", fill: "#dddddd", align: "center" });
	tmpText.alpha = (this.completed) ? 1 : 0.5;
};

//Menu achievement appearance
Achievement.prototype.resetAchievement = function() {
	this.sprite.x = this.storeX;
	this.sprite.y = this.storeY;
	this.sprite.alpha = 0;
	this.sprite.visible = false;
};
