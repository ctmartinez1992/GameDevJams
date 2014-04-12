Game6.Preloader = function (game) {
	this.background = null;
};

Game6.Preloader.prototype = {
	preload: function () {	
        //Preload bar and Loading text
        this.loadingText = this.add.text(this.world.centerX, this.world.centerY - ((this.world.height / 2) / 2), "Loading", { font: "36px Chunk", fill: "#ffffff", align: "center" });
        this.loadingText.anchor.setTo(0.5, 0.5);

        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadBar');
        this.preloadBar.anchor.setTo(0.5, 0.5);
        this.load.setPreloadSprite(this.preloadBar);
		
		//Assets Menu
        this.load.image('logo1', 'assets/menu_stuff/logo_the.png');
        this.load.image('logo2', 'assets/menu_stuff/logo_achiever.png');
		
        this.load.audio('logo_the_sound', 'assets/menu_stuff/logo_the_sound.wav');
        this.load.audio('logo_achiever_sound', 'assets/menu_stuff/logo_achiever_sound.wav');
		
		this.game.load.tilemap('main_menu_level', 'assets/menu_stuff/menu_tiles.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.image('main_menu_tiles', 'assets/menu_stuff/menu_tiles_png.png');
		
		//Assets Game
		//Achievements
        this.load.image('a001', 'assets/achievements/ach_001_so_it_begins_-1.png');
        this.load.image('a002', 'assets/achievements/ach_002_lose_1_point_1.png');
        this.load.image('a003', 'assets/achievements/ach_003_murderer!!!_1.png');
        this.load.image('a004', 'assets/achievements/ach_004_double_murder_2.png');
        this.load.image('a005', 'assets/achievements/ach_005_5FDP_5.png');
        this.load.image('a006', 'assets/achievements/ach_006_10_10_10.png');
        this.load.image('a007', 'assets/achievements/ach_007_100_likes_100.png');
        this.load.image('a008', 'assets/achievements/ach_008_La_Bestia_140.png');
        this.load.image('a009', 'assets/achievements/ach_009_1OOOMG_1000.png');
        this.load.image('a010', 'assets/achievements/ach_010_nice_moves_1.png');
        this.load.image('a011', 'assets/achievements/ach_011_not_the_right_path_-2.png');
        this.load.image('a012', 'assets/achievements/ach_012_JUMP_1.png');
        this.load.image('a013', 'assets/achievements/ach_013_much_focus_1.png');
        this.load.image('a014', 'assets/achievements/ach_014_such_concentration_2.png');
        this.load.image('a015', 'assets/achievements/ach_015_many_brain_5.png');
        this.load.image('a016', 'assets/achievements/ach_016_so_persistent_10.png');
        this.load.image('a017', 'assets/achievements/ach_017_very_god_100.png');
        this.load.image('a018', 'assets/achievements/ach_018_get_an_achievement_0.png');
        this.load.image('a019', 'assets/achievements/ach_019_gaa_fgaa_0.png');
        this.load.image('a020', 'assets/achievements/ach_020_gaa_fgaa_fgaa_0.png');
        this.load.image('a021', 'assets/achievements/ach_021_gaa_fgaa_fgaa_fgaa_0.png');
        this.load.image('a022', 'assets/achievements/ach_022_enough_0.png');
        this.load.image('a023', 'assets/achievements/ach_023_goomba_stomp_1.png');
        this.load.image('a024', 'assets/achievements/ach_024_normal_boots_5.png');
        this.load.image('a025', 'assets/achievements/ach_025_man_treads_10.png');
        this.load.image('a026', 'assets/achievements/ach_026_berserkers_greaves_50.png');
        this.load.image('a027', 'assets/achievements/ach_027_mario_himself_100.png');
        this.load.image('a028', 'assets/achievements/ach_028_double_stomp_4.png');
        this.load.image('a029', 'assets/achievements/ach_029_triple_stomp_6.png');
        this.load.image('a030', 'assets/achievements/ach_030_sick_air_bro_10.png');
        this.load.image('a031', 'assets/achievements/ach_031_opel_combo_20.png');
        this.load.image('a032', 'assets/achievements/ach_032_slipped_1.png');
        this.load.image('a033', 'assets/achievements/ach_033_duded_1.png');
        this.load.image('a034', 'assets/achievements/ach_034_jesus_status_1.png');
        this.load.image('a035', 'assets/achievements/ach_035_vomitory_1.png');
		
		this.game.load.tilemap('level', 'assets/level.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.tilemap('end_level', 'assets/end_game/end_level.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.image('tiles', 'assets/menu_tiles_png.png');
		
		//Player
		this.load.spritesheet('player', 'assets/player.png', 36, 52);
		
		//Enemies
		this.load.spritesheet('enemy', 'assets/enemy.png', 36, 52);
		
		//Boss
		this.load.spritesheet('boss', 'assets/boss.png', 36, 52);
		
		//Guns
		this.game.load.image('handgun', 'assets/handgun.png');
		this.game.load.image('ak', 'assets/ak_47.png');
		this.game.load.image('shotgun', 'assets/shotgun.png');
		this.game.load.image('bullet', 'assets/bullet.png');
		
		this.game.load.image('life', 'assets/life.png');
		this.game.load.image('dialog', 'assets/dialog.png');
		this.game.load.image('rain', 'assets/end_game/rain.png');
		this.game.load.image('r_key', 'assets/end_game/r_key.png');
		
		//Audio
        this.load.audio('achievement', 'assets/sounds/achievement.wav');
        this.load.audio('ak_shot', 'assets/sounds/ak_shot.wav');
        this.load.audio('duded', 'assets/sounds/duded.wav');
        this.load.audio('fell', 'assets/sounds/fell.wav');
        this.load.audio('goomba', 'assets/sounds/goomba.wav');
        this.load.audio('jump', 'assets/sounds/jump.wav');
        this.load.audio('pistol_shot', 'assets/sounds/pistol_shot.wav');
        this.load.audio('shotgun_shot', 'assets/sounds/shotgun_shot.wav');
        this.load.audio('vomit', 'assets/sounds/vomit.wav');
	},

	create: function () {
        //Draw loaded text
		this.loadingText.content = "Loaded";
        this.loadingText.anchor.setTo(0.5, 0.5);

        this.add.tween(this.loadingText).to({ alpha: 0 }, 1000, Phaser.Easing.Exponential.In, true);
        this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Exponential.In, true);
		var tween = this.add.tween(this.preloadBar).to({ y: (this.game.canvas.height / 2) }, 1000, Phaser.Easing.Exponential.In, true);

		tween.onComplete.add(this.startLevel, this);
	},

	startLevel: function () {
		this.game.state.start('Game', true, false);
	}
};