var Dialogs = function (game) {
    this.game = game;
        
	this.content;
	this.index;
	this.line;
	this.counter;
	this.done;
	this.text;
}

Dialogs.prototype = {
    constructor: Dialogs,
	
    create: function(lines) {
		this.content = lines;
		this.index = 0;
		this.line = '';
		this.counter = 0;
		this.done = false;
		this.text = this.game.add.text(this.game.world.centerX, 80, '', { font: "14px Chunk", fill: "#dddddd", align: "center" });
		this.text.anchor.setTo(0.5, 0.5);
	},
	
	updateLine: function() {
		if(this.index < this.content.length) {
			if (this.line.length < this.content[this.index].length) {
				this.line = this.content[this.index].substr(0, this.line.length + 1);
				this.text.setText(this.line);
			} else {
				this.game.time.events.add(Phaser.Timer.SECOND * 1, this.nextLine, this);
			}
		} else {
			this.game.time.events.add(Phaser.Timer.SECOND * 1, function() { this.text.visible = false; }, this);
			this.done = true;
		}
	},

	nextLine: function() {
		this.index++;
		if (this.index < this.content.length) {
			this.counter += 1;
			this.line = '';
			this.game.time.events.repeat(100, this.content[this.index].length + 1, this.updateLine, this);
		}
	},

	getText: function() {
		return this.text;
	}
}