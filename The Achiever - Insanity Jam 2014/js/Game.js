Game6.Game = function (game) {
    this.game = game;
    this.game.score = 0;
    this.game.highscore = 0;
};

//Player stuff
var facing = 'left';
var jumpTimer = 0;
var fireTimer = 0;
var changeGunTimer = 0;
var usingGun = 1;
var gun;
var fireGunRate = 0;
var gunDamage = 0;

//Enemies
var enemies;
var enemyTimer = 0;
var sumNewEnemy = 0;
var sumNewEnemyVelocity = 0;
var sumNewEnemyStored = 0;
var sumNewEnemyVelocityStored = 0;
var enemyDirection = 0;
var enemiesJustCollidedTimer = 50;
var vomitStatus = false;

//Bullets
var bullets;
var bulletDirection = 0;

//Collision Groups
var playerCollisionGroup;
var enemiesCollisionGroup;
var bulletsCollisionGroup;
var tilesCollisionGroup;

//Controls
var cursors;
var jumpButton;
var fireButton;
var changeGunButton;

//Life
var lifeImage;
var lifeText;

//Dialog
var firstDialog;
var secondDialog;
var thirdDialog;
var fourthDialog;
var fifthDialog;
var sixthDialog;
var seventhDialog;
var eigthDialog;
var ninthDialog;
var finalDialog;

//Counters
var goomba = 0;
var goombaAchievements = [false, false, false, false, false];
var highestGoombaStreak = 0;
var goombaStreak = 0;
var isGoombaStreaking = false;
var goombaStreakAchievements = [false, false, false, false];
var killed = 0;
var killedAchievements = [false, false, false, false, false, false, false];
var died = 0;
var duded = 0;
var dudedOnce = false;
var fell = 0;
var fellOnce = false;
var respawnedOnce = false;
var dudeFell = 0;
var vomitCount = 0;
var witnessTheVomit = false;
var timePassed = 0;
var timeAchievements = [false, false, false, false, false];
var jumpedOnce = false;
var walkedRightOnce = false;
var walkedLeftOnce = false;

//Sounds
var achievementSound;
var akShotSound;
var dudedSound;
var fellSound;
var GoombaSound;
var JumpSound;
var pistolShotSound;
var shotgunShotSound;
var vomitSound;

Game6.Game.prototype = {
	create: function () {
		//P2 is neat as fuck
		this.game.physics.startSystem(Phaser.Physics.P2JS);
		this.game.physics.p2.setImpactEvents(true);
		
		//UI
        this.textAch = game.add.text(this.game.world.width - 10, 10, achievs + " As", { font: "14px Chunk", fill: "#dddddd", align: "center" });
        this.textAch.anchor.setTo(1, 0);
        this.vomitAlert = game.add.text(this.game.world.centerX, 150, "VOMIT ALERT", { font: "20px Chunk", fill: "#dddddd", align: "center" });
        this.vomitAlert.anchor.setTo(0.5, 0.5);
		this.vomitAlert.visible = false;
		this.vomitAlert.alpha = 0;
        this.suddenRespawn = game.add.text(this.game.world.centerX, 50, "RESPAWN", { font: "24px Chunk", fill: "#dddddd", align: "center" });
        this.suddenRespawn.anchor.setTo(0.5, 0.5);
		this.suddenRespawn.visible = false;
		this.suddenRespawn.alpha = 0;
		
		//Life
		lifeImage = game.add.sprite(game.world.width - 65, 40, 'life');
		lifeImage.anchor.setTo(0.5, 0.5);
        lifeText = game.add.text(game.world.width - 30, 40, '100', { font: "14px Chunk", fill: "#dddddd", align: "center" });
        lifeText.anchor.setTo(0.5, 0.5);
		
		//Collision groups
		playerCollisionGroup = this.game.physics.p2.createCollisionGroup();
		enemiesCollisionGroup = this.game.physics.p2.createCollisionGroup();
		bulletsCollisionGroup = this.game.physics.p2.createCollisionGroup();
		tilesCollisionGroup = this.game.physics.p2.createCollisionGroup();		
		game.physics.p2.updateBoundsCollisionGroup();
		
		//Player
		this.player = game.add.sprite(50, 400, 'player');
		this.player.anchor.setTo(0.5, 0.5);
		this.player.health = 100;
		this.player.animations.add('idle', [0, 1, 2, 1], 8, true);
		this.player.animations.add('left', [4], 1, true);
		this.player.animations.add('right', [3], 1, true);
		this.player.animations.play('idle', 8, true);
		
		//Gun
		this.handgun = game.add.sprite(this.player.x, this.player.y, 'handgun');
		this.handgun.visible = false;
		this.ak = game.add.sprite(this.player.x, this.player.y, 'ak');
		this.ak.visible = false;
		this.shotgun = game.add.sprite(this.player.x, this.player.y, 'shotgun');
		this.shotgun.visible = false;
		
		//1=handgun; 2=ak; 3=shotgun
		gun = this.handgun;
		gun.anchor.setTo(0.5, 0.5);
		gun.visible = true;
		usingGun = 1;
		firingTimer = 0;
		fireGunRate = 350;
		gunDamage = 35;
		
		//Enemies		
		enemies = game.add.group();
	    enemies.createMultiple(40, 'enemy');
	    enemies.setAll('outOfBoundsKill', true);
	    enemyTimer = 0;
		this.newEnemy();
		
		//Bullets
		bullets = game.add.group();
		bullets.createMultiple(30, 'bullet');
		bullets.setAll('anchor.x', 0.5);
		bullets.setAll('anchor.y', 1);
		bullets.setAll('outOfBoundsKill', true);
		
		//Physics
		this.game.physics.p2.gravity.y = 10000;
		this.game.physics.p2.enable(this.player);
		this.player.body.setCollisionGroup(playerCollisionGroup);
		this.player.body.collides([tilesCollisionGroup, enemiesCollisionGroup]);
		this.player.fixedRotation = true;

		//Materials?
		this.spriteMaterial = game.physics.p2.createMaterial('spriteMaterial', this.player.body);
		this.worldMaterial = game.physics.p2.createMaterial('worldMaterial');		
		this.game.physics.p2.setWorldMaterial(this.worldMaterial, true, true, true, true);
		
		this.contactMaterial = game.physics.p2.createContactMaterial(this.spriteMaterial, this.worldMaterial);
		this.contactMaterial.friction = 0.0;    		//Friction to use in the contact of these two materials.
		this.contactMaterial.restitution = 0.0;  		//Restitution (i.e. how bouncy it is!) to use in the contact of these two materials.
		this.contactMaterial.stiffness = 1e7;    		//Stiffness of the resulting ContactEquation that this ContactMaterial generate.
		this.contactMaterial.relaxation = 0;     		//Relaxation of the resulting ContactEquation that this ContactMaterial generate.
		this.contactMaterial.frictionStiffness = 1e7;   //Stiffness of the resulting FrictionEquation that this ContactMaterial generate.
		this.contactMaterial.frictionRelaxation = 3;    //Relaxation of the resulting FrictionEquation that this ContactMaterial generate.
		this.contactMaterial.surfaceVelocity = 1.0;     //Will add surface velocity to this material. If bodyA rests on top if bodyB, and the surface velocity is positive, bodyA will slide to the right.
    		
		//Tile map
		this.map = this.game.add.tilemap('level');
		this.map.addTilesetImage('menu_tiles_png', 'tiles');
		this.map.setCollisionBetween(1, 12);
		this.map.setCollisionBetween(18, 46);
		this.map.setCollisionBetween(52, 68);
		this.layer = this.map.createLayer('world');
		this.layer.resizeWorld();
		
		var tileObjects = this.game.physics.p2.convertTilemap(this.map, this.layer);
		for (var i = 0; i < tileObjects.length; i++) {
			var tileBody = tileObjects[i];
			tileBody.setCollisionGroup(tilesCollisionGroup);
			tileBody.collides([playerCollisionGroup, enemiesCollisionGroup, bulletsCollisionGroup]);
		}
		
		//Achievements
		achievSystem = new Achievements(this.game);
<<<<<<< HEAD
		achievSystem.queueAchievement(1);
=======
		/*achievSystem.queueAchievement(1);
>>>>>>> 0075b4df6daad40eac3bc30a1fbecd51785b53ab
		achievSystem.queueAchievement(2);
		achievSystem.queueAchievement(18);
		achievSystem.queueAchievement(19);
		achievSystem.queueAchievement(20);
		achievSystem.queueAchievement(21);
<<<<<<< HEAD
		achievSystem.queueAchievement(22);
=======
		achievSystem.queueAchievement(22);*/
>>>>>>> 0075b4df6daad40eac3bc30a1fbecd51785b53ab
		
		//Dialogs
		firstDialog = new Dialogs(this.game);
		firstDialog.create([" ", "Hello!!!", " ", "Welcome to the Dummy Simulator.", " ",
							"Your objective is to have fun on this broken game :D",
							" ", "Please, don't annoy me with achievements", " ", "Thank You..."]);
		
		secondDialog = new Dialogs(this.game);
		secondDialog.create([" ", "Why are these achievements so easy?", " ", "Anyways, have a medal."]);
		
		thirdDialog = new Dialogs(this.game);
		thirdDialog.create([" ", "Who did this game?? What the hell!", " ", "I have to give you a medal for every 5 Achievement points",
							" ", "Do you know how long it takes to process these medals?", " ", "A lot, alright?"]);
							
		fourthDialog = new Dialogs(this.game);
		fourthDialog.create([" ", "*Sigh*", " ", "BRB making another medal..."]);
		
		fifthDialog = new Dialogs(this.game);
		fifthDialog.create([" ", "*heavy breathing*", " ", "*heavy breathing*", " ", "*heavy breathing*"]);
		
		sixthDialog = new Dialogs(this.game);
		sixthDialog.create([" ", "How do you even have patience for this crap?", " ", "Swear to god, one of these days..."]);
		
		seventhDialog = new Dialogs(this.game);
		seventhDialog.create([" ", "Look at how many medals you have!", " ", "Greedy bastard!"]);
		
		eigthDialog = new Dialogs(this.game);
		eigthDialog.create([" ", "Dude, like, this game is boring, there isn't even an AI", " ", "Just stop playing, it's fine!",
							" ", "If you stop playing, i swear i won't kill you in your sleep."]);
							
		ninthDialog = new Dialogs(this.game);
		ninthDialog.create([" ", "If you don't stop getting achievements...", " ", "...I... I, huh...",
							" ", "...I... I, huh...", " ", "I'LL USE A QUICKTIME EVENT!!!"]);
							
		finalDialog = new Dialogs(this.game);
		finalDialog.create([" ", "ENOUGH", " ", "HERE COMES THE QUICKTIME EVENT!!!", " ", "MUHAHAHAHAHAHAHAAAAAA....."]);
		
		firstDialog.nextLine();
		
		//Controls
		cursors = game.input.keyboard.createCursorKeys();
		jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.UP);
		fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		changeGunButton = game.input.keyboard.addKey(Phaser.Keyboard.C);
		
		//Group collision callback
		this.player.body.createGroupCallback(enemiesCollisionGroup, this.playerCollidedEnemy, this);
		this.player.body.createGroupCallback(tilesCollisionGroup, this.playerCollidedGround, this);
		
		//Timed events
		this.game.time.events.loop(1000, this.updateTimeAchievements, this);
		this.game.time.events.loop(1100, this.updateKillAchievements, this);
		this.game.time.events.loop(1200, this.updateGoombaAchievements, this);
		this.game.time.events.loop(1300, this.updateGoombaStreakAchievements, this);
		this.game.time.events.loop(1500, this.updateDialogs, this);
		this.game.time.events.loop(2000, this.checkBulletsOutOfBounds, this);
		this.game.time.events.loop(8000, this.randomVomit, this);

		//Counters
		goomba = 0;
		goombaAchievements = [false, false, false, false, false];
		goombaStreak = 0;
		highestGoombaStreak = 0;
		isGoombaStreaking = false;
		goombaStreakAchievements = [false, false, false, false];
		killed = 0;
		killedAchievements = [false, false, false, false, false, false, false];
		duded = 0;
		dudedOnce = false;
		died = 0;
		fell = 0;
		fellOnce = false;
		respawnedOnce = false;
		dudeFell = 0;
		vomitCount = 0;
		timePassed = 0;
		timeAchievements = [false, false, false, false, false];
		jumpedOnce = false;
		walkedRightOnce = false;
		walkedLeftOnce = false;
		
		//Sounds
		achievementSound = this.game.add.audio('achievement', 0.2);
		akShotSound = this.game.add.audio('ak_shot', 0.2);
		dudedSound = this.game.add.audio('duded', 0.2);
		fellSound = this.game.add.audio('fell', 0.2);
		GoombaSound = this.game.add.audio('goomba', 0.2);
		JumpSound = this.game.add.audio('jump', 0.2);
		pistolShotSound = this.game.add.audio('pistol_shot', 0.2);
		shotgunShotSound = this.game.add.audio('shotgun_shot', 0.2);
		vomitSound = this.game.add.audio('vomit', 0.2);
	},

	update: function () {
		//Achievements system and text
		achievSystem.cycleAchievements();
		this.textAch.setText(achievs + " As");
		
		//Life text
		lifeText.setText(this.player.health + '');
		
		this.updatePlayer();
		this.updateGun();
		this.updateEnemies();
		this.updateBullets();
    },
	
	updateTimeAchievements: function() {
		timePassed += 1000;
		if(timePassed >= 60000 && !timeAchievements[0]) {
			achievSystem.queueAchievement(13);
			timeAchievements[0] = true;
		} else if(timePassed >= 120000 && !timeAchievements[1]) {
			achievSystem.queueAchievement(14);
			timeAchievements[1] = true;
		} else if(timePassed >= 300000 && !timeAchievements[2]) {
			achievSystem.queueAchievement(15);
			timeAchievements[2] = true;
		} else if(timePassed >= 600000 && !timeAchievements[3]) {
			achievSystem.queueAchievement(16);
			timeAchievements[3] = true;
		} else if(timePassed >= 3600000 && !timeAchievements[4]) {
			achievSystem.queueAchievement(17);
			timeAchievements[4] = true;
		}
	},
	
	updateKillAchievements: function() {
		if(killed >= 1 && !killedAchievements[0]) {
			achievSystem.queueAchievement(3);
			killedAchievements[0] = true;
		} else if(killed >= 2 && !killedAchievements[1]) {
			achievSystem.queueAchievement(4);
			killedAchievements[1] = true;
		} else if(killed >= 5 && !killedAchievements[2]) {
			achievSystem.queueAchievement(5);
			killedAchievements[2] = true;
		} else if(killed >= 10 && !killedAchievements[3]) {
			achievSystem.queueAchievement(6);
			killedAchievements[3] = true;
		} else if(killed >= 100 && !killedAchievements[4]) {
			achievSystem.queueAchievement(7);
			killedAchievements[4] = true;
		} else if(killed >= 140 && !killedAchievements[5]) {
			achievSystem.queueAchievement(8);
			killedAchievements[5] = true;
		} else if(killed >= 1000 && !killedAchievements[6]) {
			achievSystem.queueAchievement(9);
			killedAchievements[6] = true;
		}
	},
	
	updateGoombaAchievements: function() {
		if(goomba >= 1 && !goombaAchievements[0]) {
			achievSystem.queueAchievement(23);
			goombaAchievements[0] = true;
		} else if(goomba >= 5 && !goombaAchievements[1]) {
			achievSystem.queueAchievement(24);
			goombaAchievements[1] = true;
		} else if(goomba >= 10 && !goombaAchievements[2]) {
			achievSystem.queueAchievement(25);
			goombaAchievements[2] = true;
		} else if(goomba >= 50 && !goombaAchievements[3]) {
			achievSystem.queueAchievement(26);
			goombaAchievements[3] = true;
		} else if(goomba >= 100 && !goombaAchievements[4]) {
			achievSystem.queueAchievement(27);
			goombaAchievements[4] = true;
		}
	},
	
	updateGoombaStreakAchievements: function() {
		if(highestGoombaStreak >= 2 && !goombaStreakAchievements[0]) {
			achievSystem.queueAchievement(28);
			goombaStreakAchievements[0] = true;
		} else if(goombaStreak >= 3 && !goombaStreakAchievements[1]) {
			achievSystem.queueAchievement(29);
			goombaStreakAchievements[1] = true;
		} else if(goombaStreak >= 5 && !goombaStreakAchievements[2]) {
			achievSystem.queueAchievement(30);
			goombaStreakAchievements[2] = true;
		} else if(goombaStreak >= 10 && !goombaStreakAchievements[3]) {
			achievSystem.queueAchievement(31);
			goombaStreakAchievements[3] = true;
		}
	},
	
	updateDialogs: function() {
		if(firstDialog.done) {
			dialog1 = true;
		}
		if(dialog1 && achievs >= 5 && !dialog2) {
			secondDialog.nextLine();
			dialog2 = true;
		}
		if(dialog1 && dialog2 && achievs >= 10 && !dialog3) {
			thirdDialog.nextLine();
			dialog3 = true;
		}
		if(dialog1 && dialog2 && dialog3 && achievs >= 15 && !dialog4) {
			fourthDialog.nextLine();
			dialog4 = true;
		}
		if(dialog1 && dialog2 && dialog3 && dialog4 && achievs >= 20 && !dialog5) {
			fifthDialog.nextLine();
			dialog5 = true;
		}
		if(dialog1 && dialog2 && dialog3 && dialog4 && dialog5 && achievs >= 50 && !dialog6) {
			sixthDialog.nextLine();
			dialog6 = true;
		}
		if(dialog1 && dialog2 && dialog3 && dialog4 && dialog5 && dialog6 && achievs >= 75 && !dialog7) {
			seventhDialog.nextLine();
			dialog7 = true;
		}
		if(dialog1 && dialog2 && dialog3 && dialog4 && dialog5 && dialog6 && dialog7 && achievs >= 100 && !dialog8) {
			eigthDialog.nextLine();
			dialog8 = true;
		}
		if(dialog1 && dialog2 && dialog3 && dialog4 && dialog5 && dialog6 && dialog7 && dialog8 && achievs >= 150 && !dialog9) {
			ninthDialog.nextLine();
			dialog9 = true;
		}
		if(dialog1 && dialog2 && dialog3 && dialog4 && dialog5 && dialog6 && dialog7 && dialog8 && dialog9 && achievs >= 200 && !dialog10) {
			finalDialog.nextLine();
			dialog10 = true;
			this.fade('EndGame');
		}
	},
	
	updatePlayer: function() {
		if (cursors.left.isDown) {
			this.player.body.moveLeft(500);
			if (facing != 'left') {
				this.player.animations.play('left');
				facing = 'left';
				gun.scale.x = -1;
				this.player.scale.x = 1;
			}
			
			if(walkedLeftOnce == false) {
				walkedLeftOnce = true;
				achievSystem.queueAchievement(11);
			}
		} else if(cursors.right.isDown) {
		    this.player.body.moveRight(500);
			if (facing != 'right') {
				this.player.animations.play('right');
				facing = 'right';
				gun.scale.x = 1;
				this.player.scale.x = 1;
			}
			
			if(walkedRightOnce == false) {
				walkedRightOnce = true;
				achievSystem.queueAchievement(10);
			}
		} else {
			this.player.body.velocity.x = 0;
			if(facing == 'left') {
				this.player.animations.stop();
				this.player.animations.play('idle');
				this.player.scale.x = -1;
				facing = 'leftidle';
			} else if(facing == 'right') {
				this.player.animations.stop();
				this.player.animations.play('idle');
				this.player.scale.x = 1;
				facing = 'rightidle';
			}
		}

		if (jumpButton.isDown && game.time.now > jumpTimer && this.checkIfCanJump()) {
			this.player.body.moveUp(1750);
			jumpTimer = game.time.now + 150;			
			if(jumpedOnce == false) {
				jumpedOnce = true;
				achievSystem.queueAchievement(12);
			}
		}
		
		if (fireButton.isDown && game.time.now > fireTimer) {
			this.fireBullet();
		}
			
		if (this.player.alive == true && this.player.y >= this.game.height + this.player.height / 2) {	
			fell += 1;
			fellOnce = true;
			this.respawnPlayer();
		}
	},
	
	updateGun: function() {
		if(facing == 'left') {
			gun.x = this.player.x - this.player.width / 2 + gun.width;
			gun.y = this.player.y;
		} else if(facing == 'leftidle') {
			gun.x = this.player.x - (this.player.width * -1) / 2 + gun.width;
			gun.y = this.player.y;
		} else if(facing == 'right' || facing == 'rightidle') {
			gun.x = this.player.x + this.player.width / 2 + gun.width;
			gun.y = this.player.y;
		}
		
		if(usingGun == 2 || usingGun == 3) {
			gun.x -= gun.width;
		}
		
		if (changeGunButton.isDown && game.time.now > changeGunTimer) {
			usingGun = usingGun + 1;
			if(usingGun > 3) {
				usingGun = 1;
			}
			
			if(usingGun == 1) {
				gun = this.handgun;
				gun.visible = true;
				this.ak.visible = false;
				this.shotgun.visible = false;
				fireGunRate = 350;
				gunDamage = 35;
			} else if(usingGun == 2) {
				gun = this.ak;
				gun.visible = true;
				this.handgun.visible = false;
				this.shotgun.visible = false;
				fireGunRate = 100;
				gunDamage = 25;
			} else {
				gun = this.shotgun;
				gun.visible = true;
				this.handgun.visible = false;
				this.ak.visible = false;
				fireGunRate = 750;
				gunDamage = 20;
			}
			
			changeGunTimer = game.time.now + 250;
		}
	},
	
	updateEnemies: function() {
		enemies.forEachAlive(this.updateEnemy, this);
		if (this.game.time.now > enemyTimer) {
			this.newEnemy();
			enemyTimer = game.time.now + 5000 - sumNewEnemy - this.game.rnd.integerInRange(100, 1900);
		}
	},
	
	updateEnemy: function(enemy) {
		enemy.body.velocity.x = (200 + sumNewEnemyVelocity);
		if(enemy.scale.x < 0) {
			enemy.body.velocity.x = -(200 + sumNewEnemyVelocity);
		}
		
		if (enemy.alive == true && enemy.y >= this.game.height + enemy.height / 2) {
			enemy.kill();
		}
		
		if(enemyDirection == 0) {
			enemyDirection = 1;
		} else {
			enemyDirection = 0;
		}
	},
	
	newEnemy: function() {
	    var enemy = enemies.create(0, 0, 'enemy');
	    if (enemy) {
			this.game.physics.p2.enable(enemy);
			enemy.body.setCollisionGroup(enemiesCollisionGroup);
			enemy.body.collides([playerCollisionGroup, bulletsCollisionGroup, enemiesCollisionGroup, tilesCollisionGroup]);
			if(!vomitStatus) {
				var xPos = (enemyDirection == 0) ? this.game.width - 20 : 20;
				enemy.reset(xPos, 10);
			} else {
				enemy.reset(this.game.world.centerX, 10);
			}
		    enemy.anchor.setTo(0.5, 0.5);
			enemy.scale.x *= (enemyDirection == 0) ? -1 : 1;
		    enemy.body.gravity.y = 100;
		    enemy.body.velocity.x = 0;
			enemy.health = 100;
			
			enemy.body.createGroupCallback(enemiesCollisionGroup, this.enemyCollidedEnemy, this);			
			enemy.body.createGroupCallback(bulletsCollisionGroup, this.bulletCollidedEnemy, this);
			
			if(!vomitStatus) {
				sumNewEnemy += 5;
				if(sumNewEnemy > 2000) {
					sumNewEnemy = 2000;
				}
				
				sumNewEnemyVelocity += 1;
				if(sumNewEnemyVelocity > 300) {
					sumNewEnemyVelocity = 300;
				}
			}
		}
	},
	
	updateBullets: function() {
		bullets.forEachAlive(this.updateBullet, this);
	},
	
	updateBullet: function(bullet) {
		bullet.body.gravity.y = 0;
		//bullet.body.velocity.x = (bullet.scale.x > 0) ? -1000 : 1000;
		bullet.body.velocity.y = 0;
	},
	
	fireBullet: function() {
		var bulletTMP = bullets.create(20, -20, 'bullet');
		if (bulletTMP) {
			this.game.physics.p2.enable(bulletTMP);
			bulletTMP.body.setCollisionGroup(bulletsCollisionGroup);
			bulletTMP.body.collides([tilesCollisionGroup, enemiesCollisionGroup, bulletsCollisionGroup]);
			if(usingGun == 1) {
				bulletTMP.reset(gun.x + gun.width, gun.y);
			} else {
				bulletTMP.reset(gun.x + gun.width + 5, gun.y + 5);
			}
			
			bulletTMP.scale.x *= (facing == 'left' || facing == 'leftidle') ? 1 : -1;
			bulletTMP.body.gravity.y = 0;
			bulletTMP.body.velocity.x = (bulletTMP.scale.x > 0) ? -1000 : 1000;
			fireTimer = game.time.now + fireGunRate;
        }
		
		if(usingGun == 3) {
			var bulletTMP = bullets.create(20, -20, 'bullet');
			if (bulletTMP) {
				this.game.physics.p2.enable(bulletTMP);
				bulletTMP.body.setCollisionGroup(bulletsCollisionGroup);
				bulletTMP.body.collides([tilesCollisionGroup, enemiesCollisionGroup, bulletsCollisionGroup]);
				if(usingGun == 1) {
					bulletTMP.reset(gun.x + gun.width, gun.y);
				} else {
					bulletTMP.reset(gun.x + gun.width + 5, gun.y);
				}
				
				bulletTMP.scale.x *= (facing == 'left' || facing == 'leftidle') ? 1 : -1;
				bulletTMP.body.gravity.y = 0;
				bulletTMP.body.velocity.x = (bulletTMP.scale.x > 0) ? -1000 : 1000;
				fireTimer = game.time.now + fireGunRate;
			}
			
			var bulletTMP = bullets.create(20, -20, 'bullet');
			if (bulletTMP) {
				this.game.physics.p2.enable(bulletTMP);
				bulletTMP.body.setCollisionGroup(bulletsCollisionGroup);
				bulletTMP.body.collides([tilesCollisionGroup, enemiesCollisionGroup, bulletsCollisionGroup]);
				if(usingGun == 1) {
					bulletTMP.reset(gun.x + gun.width, gun.y);
				} else {
					bulletTMP.reset(gun.x + gun.width + 5, gun.y + 10);
				}
				
				bulletTMP.scale.x *= (facing == 'left' || facing == 'leftidle') ? 1 : -1;
				bulletTMP.body.gravity.y = 0;
				bulletTMP.body.velocity.x = (bulletTMP.scale.x > 0) ? -1000 : 1000;
				fireTimer = game.time.now + fireGunRate;
			}
		}
	},
	
	checkIfCanJump: function() {
		var yAxis = p2.vec2.fromValues(0, 1);
		var result = false;
		for (var i=0; i<this.game.physics.p2.world.narrowphase.contactEquations.length; i++) {
			var c = this.game.physics.p2.world.narrowphase.contactEquations[i];
			if (c.bi === this.player.body.data || c.bj === this.player.body.data) {
				var d = p2.vec2.dot(c.ni, yAxis);
				if (c.bi === this.player.body.data) {
					d *= -1;
				}

				if (d > 0.5) {
					result = true;
				}
			}
		}

		return result;
	},
	
	playerCollidedEnemy: function(player, enemy) {
		if(player.sprite.exists && enemy.sprite.exists) {
			if(player.y < enemy.y) {
				player.velocity.y = -1500;
				enemy.sprite.kill();
				if(this.game.rnd.integerInRange(1, 2) == 1) {
					this.newEnemy();
				}
				
				goomba += 1;
				goombaStreak += 1;
				isGoombaStreaking = true;
				if(goombaStreak > highestGoombaStreak) {
					highestGoombaStreak = goombaStreak;
				}
			} else {
				enemy.velocity.y = -2000;
				this.player.health -= 1;
				if(this.player.health <= 0) {
					this.respawnPlayer();
					died += 1;
					duded += 1;
					dudedOnce = true;
					if(dudedOnce) {
						achievSystem.queueAchievement(33);
					}
				}
			}
		}
	},
	
	playerCollidedGround: function(player, ground) {
		if(player.sprite.exists) {
			goombaStreak = 0;
			isGoombaStreaking = false;
		}
	},
	
	enemyCollidedEnemy: function(enemy1, enemy2) {
		if(enemy1.sprite.exists && enemy2.sprite.exists) {
			if(this.game.time.now > enemiesJustCollidedTimer) {
				enemiesJustCollidedTimer = this.game.time.now + 50;
				if(this.game.rnd.integerInRange(1, 2) == 1) {
					enemy1.sprite.scale.x *= -1;
				} else {
					enemy2.sprite.scale.x *= -1;
				}
			}
		}
	},
	
	bulletCollidedEnemy: function(enemy, bullet) {
		if(enemy.sprite.exists && bullet.sprite.exists) {
			enemy.sprite.health -= gunDamage;
			if(enemy.sprite.health <= 0) {
				enemy.sprite.kill();
				killed += 1;
			}
			
			bullet.sprite.kill();
		}
	},
	
	checkBulletsOutOfBounds: function() {
		bullets.forEachAlive(function(bullet) {
			if(!this.game.world.bounds.contains(bullet.body.x, bullet.body.y)) {
				bullet.kill();
			}
		}, this);		
	},
	
	randomVomit: function() {
		if(this.game.rnd.integerInRange(0, 20) == 5) {
			vomitStatus = true;
			vomitCount += 1;
			witnessTheVomit = true;
			if(witnessTheVomit) {
				achievSystem.queueAchievement(35);
			}
			
			sumNewEnemyStored = sumNewEnemy;
			sumNewEnemyVelocityStored = sumNewEnemyVelocity;
			
			sumNewEnemy = this.game.rnd.integerInRange(4850, 4950);
			enemyTimer = game.time.now + 5000 - sumNewEnemy;
			
			var duration = this.game.rnd.integerInRange(750, 2250);
			
			this.vomitAlert.visible = true;
			this.game.add.tween(this.vomitAlert).to({ alpha: 1 }, duration/4).to({ alpha: 0.2 }, duration/4).to({ alpha:1 }, duration/4).to({ alpha: 0 }, duration/4).start();
			
			this.game.time.events.add(duration, this.stopVomit, this);
		}
	},
	
	stopVomit: function() {
		vomitStatus = false;
		sumNewEnemy = sumNewEnemyStored;
		sumNewEnemyVelocity = sumNewEnemyVelocityStored;
		enemyTimer = game.time.now + 5000 - sumNewEnemy;
	},
	
	respawnPlayer: function() {	
		died += 1;
		respawnedOnce = true;
		if(fellOnce) {
			achievSystem.queueAchievement(32);
		}
		
		if(respawnedOnce) {
			achievSystem.queueAchievement(34);
		}
		
		this.game.time.events.add(100, function() {
			this.player.reset(this.game.world.centerX, 200);
			this.player.health = 100;	
			this.suddenRespawn.visible = true;
			this.game.add.tween(this.suddenRespawn).to({ alpha: 1 }, 250, Phaser.Easing.Bounce.Out).to({ alpha: 0 }, 250, Phaser.Easing.Bounce.In).start();
			this.game.add.tween(this.suddenRespawn.scale).to({ x: 1.5, y: 1.5 }, 250, Phaser.Easing.Exponential.InOut).to({ x: 1, y: 1 }, 250, Phaser.Easing.Exponential.InOut).start();
		}, this);
	},
	
	fade: function (nextState) {
        var spr_bg = this.game.add.graphics(0, 0);
        spr_bg.beginFill('#000000', 1);
        spr_bg.drawRect(0, 0, this.game.width, this.game.height);
        spr_bg.alpha = 0;
        spr_bg.endFill();

        this.nextState = nextState;

        s = this.game.add.tween(spr_bg)
        s.to({ alpha: 1 }, 500, null)
        s.onComplete.add(this.changeState, this)
        s.start();
    },

    changeState: function () {
        this.game.state.start(this.nextState);
        this.fadeOut();
    },

    fadeOut: function () {
        var spr_bg = this.game.add.graphics(0, 0);
        spr_bg.beginFill('#000000', 1);
        spr_bg.drawRect(0, 0, this.game.width, this.game.height);
        spr_bg.alpha = 1;
        spr_bg.endFill();

        s = this.game.add.tween(spr_bg)
        s.to({ alpha: 0 }, 600, null)
		
		return s;
    }
};