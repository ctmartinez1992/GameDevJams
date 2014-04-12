var Dialog = function (game, text, time) {
    this.game = game;
	
	this.text = text;
	this.time = time;
};

Dialog.prototype.getText = function () {
	return this.text;
};

Dialog.prototype.getTime = function () {
	return this.time;
};