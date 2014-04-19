answering = false;
showing = false;
readyToAnswer = false;
nextQuestionCounter = 0;

var Questions = function (game) {
    this.game = game;
        
	this.questions = [];
	this.questionToShow;
	this.questionsDone = [];
	
	this.completeText = game.add.text(650, 100, "HOMEWORK DONE", { font: "20px Chunk", fill: "#ffffff", align: "center", stroke: "#000000", strokeThickness: 2 });	
	this.completeText.anchor.setTo(0.5, 0.5);	
	this.completeText.alpha = 0;
	this.completeText.fixedToCamera = true;
	
	this.questions.push(new Question(game, 1, "1 + 1 = ", "2", "a billion", "11", 1));
	this.questions.push(new Question(game, 2, "10 - 3 = ", "cat", "007", "-3", 2));
	this.questions.push(new Question(game, 3, "2 * 4 = ", "ATE", "24", "7", 1));
	this.questions.push(new Question(game, 4, "20 / 5 = ", "25", "4", "15", 2));
	this.questions.push(new Question(game, 5, "How much is 300?", "a bunch", "3 thousand", "SPARTA", 3));
	this.questions.push(new Question(game, 6, "1, 11, 21, 1211, 111221, ...", "312211", "wut...", "111122211", 1));
	this.questions.push(new Question(game, 7, "Was the previous problem too hard?", "yes", "no", "Dis 2 eazy dawg", 1));
	this.questions.push(new Question(game, 8, "SORRY...", "it's alright", "*sigh* faggot", "shut up", 1));
	this.questions.push(new Question(game, 9, "HALF OF 5 = 3   BASED ON THAT PROPORTION, WHAT IS ONE-THIRD OF 10", "5", "3", "4", 3));
	this.questions.push(new Question(game, 10, "((3 * 3) / 3) + 3 * (3 - 3) = ", "3", "0", "33", 2));
	this.questions.push(new Question(game, 11, "How many steps are required to break an m * n bar of chocolate into 1 * 1 pieces?", "m * n - 1", "2m * 2n", "m * n", 1));
	this.questions.push(new Question(game, 12, "Use 8 exactly eight times to make 1000", "888 + 88 + 8 + 8 + 8", "88 * 88 * 88 / 88", "8888 + 88 / 88", 1));
	this.questions.push(new Question(game, 13, "2x + 4 = 0 Solve for x", "2", "-2", "x", 2));
	this.questions.push(new Question(game, 14, "1, 1, 2, 3, 5, 8, 13, 21, 34 WHAT THE HECK IS THIS?", "Fibonacci sequence", "bill gates sequence", "einstein sequence", 1));
	this.questions.push(new Question(game, 15, "2 + 4 / (1 + 1)", "2", "7", "4", 3));
	this.questions.push(new Question(game, 16, "What is the odd element?", "34", "22", "Medium PEPPERONI PIZZA", 3));
	this.questions.push(new Question(game, 17, "Pie Value is ", "3.14", "4", "3.2", 1));
	this.questions.push(new Question(game, 18, "33/333", "1/10", "333.33", "1", 3));
	this.questions.push(new Question(game, 19, "Al's dad is 45. He is 15 years older than twice Al's age. How old is Al? ", "30", "15", "45", 2));
	this.questions.push(new Question(game, 20, "I am an odd number. Take away one letter and I become even. What number am I? ", "7", "3", "25", 1));
	
	answering = false;
	showing = false;
	nextQuestionCounter = 0;
	
	this.nextQuestion();
};

Questions.prototype.nextQuestion = function () {
	if(nextQuestionCounter < this.questions.length) {
		this.questionToShow = this.questions[nextQuestionCounter];
		nextQuestionCounter += 1;
	} else {
		var tween6 = game.add.tween(this.completeText).to({ alpha: 1 }, 2500).start();
		wonHomework = true;
		for(var i=0; i<this.questionsDone.length; i++) {
			if(this.questionsDone[i].correct) {
				hmScore += 1;
			}
		}
	}
};

Questions.prototype.cycleQuestions = function () {
	if(!answering && !showing) {
		answering = true;	
		showing = true;
		this.questionToShow.showQuestion();
	}
	
	if(!answering && showing) {
		showing = false;	
		qs.questionsDone.push(qs.questionToShow);
		qs.nextQuestion();
	}
};