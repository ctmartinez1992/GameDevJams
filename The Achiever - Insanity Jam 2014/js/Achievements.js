achieving = false;

var Achievements = function (game) {
    this.game = game;
        
	this.achievements = [];
	this.achievementsToShow = [];
	this.achievementsDone = [];
	
	this.achievements.push(new Achievement(game, "a001", 1, -1, "So... It Begins", "Start the game"));
	this.achievements.push(new Achievement(game, "a002", 2, 1, "Lose 1 Point", "[PASSIVE] After 001"));
	this.achievements.push(new Achievement(game, "a003", 3, 1, "MURDERER!!!", "Kill 1 guy"));
	this.achievements.push(new Achievement(game, "a004", 4, 2, "Double Murder", "Kill 2 guys"));
	this.achievements.push(new Achievement(game, "a005", 5, 5, "5FDP", "Kill 5 guys"));
	this.achievements.push(new Achievement(game, "a006", 6, 10, "10/10", "Kill 10 guys"));
	this.achievements.push(new Achievement(game, "a007", 7, 100, "100 Likes", "Kill 100 guys"));
	this.achievements.push(new Achievement(game, "a008", 8, 140, "La Bestia", "Kill 140 guys"));
	this.achievements.push(new Achievement(game, "a009", 9, 1000, "1000MG", "Kill 1000 guys"));
	this.achievements.push(new Achievement(game, "a010", 10, 1, "Nice Moves", "Walk to the Right"));
	this.achievements.push(new Achievement(game, "a011", 11, -1, "Not the Right Path", "Walk to the Left"));
	this.achievements.push(new Achievement(game, "a012", 12, 1, "JUMP", "In-Game Jump"));
	this.achievements.push(new Achievement(game, "a013", 13, 1, "Much Focus", "Play the Game for 1 minute"));
	this.achievements.push(new Achievement(game, "a014", 14, 2, "Such Concentration", "Play the Game for 2 minutes"));
	this.achievements.push(new Achievement(game, "a015", 15, 5, "Many Brain", "Play the Game for 5 minutes"));
	this.achievements.push(new Achievement(game, "a016", 16, 10, "So Persistent", "Play the Game for 10 minutes"));
	this.achievements.push(new Achievement(game, "a017", 17, 100, "Very God", "Play the Game for 1 hour"));
	this.achievements.push(new Achievement(game, "a018", 18, 0, "Get an Achievement", "[Passive] After 002"));
	this.achievements.push(new Achievement(game, "a019", 19, 0, "Get an Achievement for getting an Achievement", "[Passive] After 018"));
	this.achievements.push(new Achievement(game, "a020", 20, 0, "Get an Achievement for getting an Achievement for getting an Achievement", "[Passive] After 019"));
	this.achievements.push(new Achievement(game, "a021", 21, 0, "Get an Achievement for getting an Achievement for getting an Achievement for getting an Achievement", "[Passive] After 020"));
	this.achievements.push(new Achievement(game, "a022", 22, 0, "ENOUGH", "[Passive] After 021"));
	this.achievements.push(new Achievement(game, "a023", 23, 1, "Goomba Stomp", "Goomba Stomp 1 dude"));
	this.achievements.push(new Achievement(game, "a024", 24, 5, "Normal Boots", "Goomba Stomp 5 dude"));
	this.achievements.push(new Achievement(game, "a025", 25, 10, "Man Treads", "Goomba Stomp 10 dude"));
	this.achievements.push(new Achievement(game, "a026", 26, 50, "Berserker's Greaves", "Goomba Stomp 50 dude"));
	this.achievements.push(new Achievement(game, "a027", 27, 100, "Mario Himself", "Goomba Stomp 100 dude"));
	this.achievements.push(new Achievement(game, "a028", 28, 4, "Double Stomp", "Stomp 2 dudes without touching the ground"));
	this.achievements.push(new Achievement(game, "a029", 29, 6, "Triple Stomp", "Stomp 3 dudes without touching the ground"));
	this.achievements.push(new Achievement(game, "a030", 30, 10, "Sick Air Bro", "Stomp 5 dudes without touching the ground"));
	this.achievements.push(new Achievement(game, "a031", 31, 20, "Opel Combo", "Stomp 10 dudes without touching the ground"));
	this.achievements.push(new Achievement(game, "a032", 32, 1, "Slipped", "Fall to your death"));
	this.achievements.push(new Achievement(game, "a033", 33, 1, "Duded", "Get killed by a dude"));
	this.achievements.push(new Achievement(game, "a034", 34, 1, "Jesus Status", "Respawn"));
	this.achievements.push(new Achievement(game, "a035", 35, 1, "Vomitory", "Witness the vomit"));
};

Achievements.prototype.queueAchievement = function (id) {
	this.achievementsToShow.push(this.achievements[id-1]);
};

Achievements.prototype.cycleAchievements = function () {
	if(this.achievementsToShow.length > 0 && !achieving) {
		achieving = true;
		
		var id = 0;
		var ach = this.achievementsToShow[id];
		
		ach.showAchievement();
		
		this.achievementsDone.push(ach);
		this.achievementsToShow.splice(id, 1);
	}
};

Achievements.prototype.displayAchievements = function () {
	for(var i=0; i<this.achievementsDone; i++) {
		for(var j=0; j<10; j++) {
			this.achievementsDone[i].displayAchievement(i * 100, j * 100);
		}
	}
};