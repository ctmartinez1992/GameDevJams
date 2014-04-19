function Pause() { }

//Pause button and text
var pauseButton;
var pauseText;

//Game music and pause music
var music;
var pauseMusic;

Pause.init = function() {
	//Initialize pause button and text
    pauseButton = game.input.keyboard.addKey(Phaser.Keyboard.P);
    pauseButton.onDown.add(this.pauseGame, this);
    pauseText = game.add.text(game.world.centerX, game.world.centerY, "PAUSED", { font: "64px Chunk", fill: "#ffffff", align: "center" });
    pauseText.anchor.setTo(0.5, 0.5);
    pauseText.visible = false;
		
	//Add music
	music = game.add.audio('music');
	pauseMusic = game.add.audio('pause_music');
	music.play('', 0, 0.25, true);
	pauseMusic.play('', 0, 0.25, true);
	pauseMusic.pause();
};

Pause.pauseGame = function() {
    doUpdate = !doUpdate;
	pauseText.visible = doUpdate;
	if (pauseText.visible) {
		game.sound.pauseAll();
		pauseMusic.resume();
    } else {
		game.sound.pauseAll();
		music.resume();
	}
};