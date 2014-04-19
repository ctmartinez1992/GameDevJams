var Question = function (game, id, question, answer1, answer2, answer3, correctAnswer) {
    this.game = game;
	
	this.id = id;
	this.question = question;
	this.answer1 = answer1;
	this.answer2 = answer2;
	this.answer3 = answer3;
	this.correctAnswer = correctAnswer;
	
	this.questionText = game.add.text(20, 20, this.question, { font: "14px Arial", fill: "#ffffff", align: "center" });	
	this.answer1Text = game.add.text(40, 50, "1. " + this.answer1, { font: "16px Arial", fill: "#ffffff", align: "center" });
	this.answer2Text = game.add.text(40, 80, "2. " + this.answer2, { font: "16px Arial", fill: "#ffffff", align: "center" });
	this.answer3Text = game.add.text(40, 110, "3. " + this.answer3, { font: "16px Arial", fill: "#ffffff", align: "center" });
	
	this.questionText.fixedToCamera = true;
	this.answer1Text.fixedToCamera = true;
	this.answer2Text.fixedToCamera = true;
	this.answer3Text.fixedToCamera = true;
	
	this.questionText.visible = false;
	this.answer1Text.visible = false;
	this.answer2Text.visible = false;
	this.answer3Text.visible = false;
	
	this.done = false;
	this.correct = false;
};

Question.prototype.showQuestion = function () {
	this.questionText.visible = true;
	this.answer1Text.visible = true;
	this.answer2Text.visible = true;
	this.answer3Text.visible = true;
	readyToAnswer = true;
};

Question.prototype.hideQuestion = function () {
	game.add.tween(this.questionText).to({ alpha: 0 }, 750).start();
	game.add.tween(this.answer1Text).to({ alpha: 0 }, 750).start();
	game.add.tween(this.answer2Text).to({ alpha: 0 }, 750).start();
	game.add.tween(this.answer3Text).to({ alpha: 0 }, 750).start();
	readyToAnswer = false;
};