function Fade() { }

/**
* @parameter {nextState} - String - The state you want to move on to
* @parameter {time} - Integer - (OPTIONAL) time it takes to make said transition
*/
Fade.fadeOut = function(nextState, time) {
    this.nextState = nextState;
	this.time = (time === 'undefined') ? 500 : time;
	
    var bg = game.add.graphics(0, 0);
    bg.beginFill('#000000', 1);
    bg.drawRect(0, 0, game.width, game.height);
    bg.alpha = 0;
    bg.endFill();

    var tween = game.add.tween(bg);
    tween.to({ alpha: 1 }, this.time, Phaser.Easing.Linear.None);
    tween.onComplete.add(
		function() {
			game.state.start(this.nextState);
			
			var bg2 = game.add.graphics(0, 0);
			bg2.beginFill('#000000', 1);
			bg2.drawRect(0, 0, game.width, game.height);
			bg2.alpha = 1;
			bg2.endFill();

			return game.add.tween(bg2).to({ alpha: 0 }, this.time, Phaser.Easing.Linear.None);
		}, this);
    tween.start();
};