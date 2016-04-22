/* I plan on using two separate script files to run the game:
** easy.js and hard.js.  On the main HTML page, I am going to
** set up a screen so that the user can choose easy or hard mode
** from a main menu.  When the mode is chosen, the user will be
** directed to a new HTML page that links to either easy.js or
** hard.js.  That will allow us to reuse our code from easy.js
** and modify it to include the extra variables and conditions
** for hard mode in hard.js.  I am still working on coding the
** HTML layout.
** This file does not actually display anything on the HTML
** canvas, but it should provide enough background on the inner
** workings of what I have for the game engine.  Please let me know
** if anything is unclear, or if you need additional code.

/* struct GameVars */
function GameVars(winningHeight, minerCost, builderCost) {
	this.winningHeight = winningHeight;
	this.minerCost = minerCost;
	this.builderCost = builderCost;
}

/* struct PlayerVars */
function PlayerVars(money, buildingHeight, miners, builders) {
	this.money = money;
	this.buildingHeight = buildingHeight;
	this.miners = miners;
	this.builders = builders;
}

/* buy miner */
function buyMiner(player, gameVars) {
	if (player.money - gameVars.minerCost < 0) {
		// placeholder error, fix to display error in game
		document.write("<p>Not enough money!</p>");
	}
	else {
		// update money and miner count
		player.money = player.money - gameVars.minerCost;
		player.miners = player.miners + 1;
	}
}

/* buy builder */
function buyBuilder(player, gameVars) {
	if (player.money - gameVars.builderCost < 0) {
		// placeholder error, fix to display error in game
		document.write("<p>Not enough money!</p>");
	}
	else {
		// update money and miner count
		player.money = player.money - gameVars.builderCost;
		player.builders = player.builders + 1;
	}
}

/* I am waiting to hear back from the instructor if we are allowed to use
** Web Workers API: https://html.spec.whatwg.org/multipage/workers.html
** It simulates multi-threading in JavasScript, which is important because
** this is real-time strategy rather than turn-based strategy.
** I plan on having a mine() function and a build() function that run in the
** background until a stopping condition is reached (player finishes tower).
*/
// function mine(player, gameVars) {}
// function build(player, gameVars) {}

/* Start New Game */
function newGame(winningHeight, minerCost, builderCost) {
	// set winning height
	var gameVars = new GameVars(winningHeight, minerCost, builderCost);
	
	// player and computer start with 1 miner each
	var player = new PlayerVars(0, 0, 1, 0);
	var computer = new PlayerVars(0, 0, 1, 0);
}

/* Load Existing Game */
// function loadGame(filename)
// need code for this : Manhing, do you want to take this one since it's loading
// from the database?