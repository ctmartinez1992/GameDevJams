var Bird = function(index, game, x) {
    this.game = game;

    this.x = x || this.game.world.width + 50;
    this.y = this.game.rnd.integerInRange(20, this.game.world.height - 125);
	
    this.bird = this.game.add.sprite(this.x, this.y, 'bird');
    this.bird.name = index;
    this.bird.scale.x *= -1;
    this.bird.animations.add('flap');
    this.bird.animations.play('flap', 24, true);
    this.bird.body.velocity.x = -125;
	
    this.alive = true;
    this.scored = false;
};

Bird.prototype.update = function() {
    if(!this.scored && this.bird.x <= 50) {
        this.scored = true;
        this.game.score++;
		if(this.game.score > this.game.highscore) {
			this.game.highscore = this.game.score;
		}
    }

    if (this.bird.x <= -100) {
        this.bird.x = this.game.world.width + 50;
        this.bird.y = this.game.rnd.integerInRange(20, this.game.world.height - 125);
		this.bird.body.velocity.x--;
		if(this.bird.body.velocity.x < -200) {
			this.bird.body.velocity.x = -200;
		}
        this.scored = false;
    }
};

Bird.prototype.getSprite = function() {
    return this.bird;
};