//game variables
var gameVars = {
	minerCost: 100,
	builderCost: 200,
	brickWidth: 7,
	brickHeight: 2,
	bricksPerRow: 6
};

// player variables
var playerVars = {
	bricks: 1, // total bricks
	firstBrickX: 80, // where to start new row
	lastBrickX: 80, // X coordinate of last brick
	lastBrickY: 136, // Y coordinate of last brick
	numBricksRow: 1, // number of bricks in current row
	money: 200,
	numMiners: 1,
	numBuilders: 1,
	//mine: new Mine(),
	miners: [],
	builders: [],
	spawnX: 90, // X coordinate of where new units will spawn
	spawnY: 25 // Y coordinate of where new units will spawn
};

// enemy AI variables
var enemyVars = {
	bricks: 1, // total bricks
	firstBrickX: 176, // where to start new row
	lastBrickX: 176, // X coordinate of last brick
	lastBrickY: 136, // Y coordinate of last brick
	numBricksRow: 1, // number of bricks in current row
	money: 20,
	numMiners: 1,
	numBuilders: 1,
	//mine: new Mine(),
	miners: [],
	builders: [],
	spawnX: 185, // X coordinate of where new units will spawn
	spawnY: 25 // Y coordinate of where new units will spawn
};

function addBrick(playerObj){
	var brickX, brickY;
	// if current width is longer than foundation, start new row
	if (playerObj.numBricksRow >= gameVars.bricksPerRow) {
		brickX = playerObj.firstBrickX;
		brickY = playerObj.lastBrickY - gameVars.brickHeight;
		playerObj.numBricksRow = 0; // restart row counter
		
	}
	// otherwise, calculate next brick position
	else {
		brickX = playerObj.lastBrickX + gameVars.brickWidth;
		brickY = playerObj.lastBrickY;
	}
	
	// create brick
	var newBrick = new createjs.Sprite(spriteSheet, "brick");
	newBrick.x = brickX;
	newBrick.y = brickY;
	newBrick.scaleX = 0.5;
	newBrick.scaleY = 0.25;
	stage.addChild(newBrick);	
	
	// update player vars
	playerObj.lastBrickX = brickX;
	playerObj.lastBrickY = brickY;
	playerObj.numBricksRow = playerObj.numBricksRow + 1;
}

var stage;
var queue;
var spriteSheet;

function init() {
	queue = new createjs.LoadQueue();
	queue.installPlugin(createjs.Sound);
	queue.addEventListener("complete", loadComplete);
	queue.loadManifest([
		{id:"endgame", src:"media/titlemusic.mp3"}
	]);
	function loadComplete() {
		setupStage();
	//	builderLoaderBar();
	//	startLoad();
		buildSprites();
		startGame();
	}
	function setupStage() {
		stage = new createjs.Stage(document.getElementById('canvas'));
	}
	function builderLoaderBar() {
		loaderBar = new createjs.Shape();
		loaderBar.x = loaderBar.y = 100;
		loaderBar.graphics.setStrokeStyle(2);
		loaderBar.graphics.beginStroke("#000");
		loaderBar.graphics.drawRect(0,0,LOADER_WIDTH,40);
		stage.addChild(loaderBar);
	}
	function startLoad() {
		loadInterval = setInterval(updateLoad, 50);
	}
	function updateLoad() {
		percentLoaded += .005;
		updateLoaderBar();
		if (percentLoaded >= 1) {
			clearInterval(loadInterval);
			stage.removeChild(loaderBar);
		/*	loadComplete(); */
		}
	}
	function updateLoaderBar() {
		loaderBar.graphics.clear();
		loaderBar.graphics.beginFill('#00ff00');
		loaderBar.graphics.drawRect(0, 0, LOADER_WIDTH * percentLoaded, 40);
		loaderBar.graphics.endFill();
		loaderBar.graphics.setStrokeStyle(2);
		loaderBar.graphics.beginStroke("#000");
		loaderBar.graphics.drawRect(0, 0, LOADER_WIDTH, 40);
		loaderBar.graphics.endStroke();
	}
	function buildSprites() {
		spriteSheet = new createjs.SpriteSheet({
			framerate:30,
			images: ["images/spritesheet.png"],
			frames: [
				// x, y, width, height, imageIndex*, regX*, regY*
				/* diamonds */
				[0,0,100,600],
				/* player miner */
				[110,10,32,64], // down, facing right
				[146,10,39,64], // up, facing right
				[190,10,39,64], // up, facing left
				[234,10,32,64], // down, facing left
				/* player builder */
				[269,10,36,64], // down, facing right
				[308,10,40,64], // up, facing right
				[351,10,40,64], // up, facing left
				[392,10,36,64], // down, facing left
				/* player destroyer */
				[110,84,46,64], // down, facing right
				[156,81,51,66], // up, facing right
				[209,81,51,66], // up, facing left
				[259,84,46,64], // down, facing left
				/* enemy miner */
				[110,158,32,64], // down, facing right
				[146,158,39,64], // up, facing right
				[190,158,39,64], // up, facing left
				[234,158,32,64], // down, facing left
				/* enemy builder */
				[269,158,36,64], // down, facing right
				[308,158,40,64], // up, facing right
				[351,158,40,64], // up, facing left
				[392,158,36,64], // down, facing left
				/* enemy destroyer */
				[317,84,46,64], // down, facing right
				[363,81,51,66], // up, facing right
				[415,81,51,66], // up, facing left
				[467,84,46,64], // down, facing left
				/* brick */
				[122,251,15,10]
			],
			animations: {
				// start, end, next*, speed*
				playerMine: {
					frames: [1,2,1,2,4,3,4,3],
					speed: 0.05
				},
				playerBuildLeft: {
					frames: [7,8,7,8],
					speed: 0.05
				},
				playerBuildRight: {
					frames: [5,6,5,6],
					speed: 0.05
				},
				playerDestroy: {
					frames: [9,10,9,10,12,11,12,11],
					speed: 0.05
				},
				enemyMine: {
					frames: [13,14,13,14,16,15,16,15],
					speed: 0.05
				},
				enemyBuildLeft: {
					frames: [19,20,19,20],
					speed: 0.05
				},
				enemyBuildRight: {
					frames: [17,18,17,18],
					speed: 0.05
				},
				enemyDestroy: {
					frames: [21,22,21,22,24,23,24,23],
					speed: 0.05
				},
				diamonds: [0],
				brick: [25]
			}
		});
		
		// create player and enemy diamond mines
		var playerDiamonds = new createjs.Sprite(spriteSheet, "diamonds");
		playerDiamonds.x = 0;
		playerDiamonds.y = 1;
		playerDiamonds.scaleX = 0.5;
		playerDiamonds.scaleY = 0.25;
		stage.addChild(playerDiamonds);
		
		var enemyDiamonds = new createjs.Sprite(spriteSheet, "diamonds");
		enemyDiamonds.x = 257;
		enemyDiamonds.y = 1;
		enemyDiamonds.scaleX = 0.5;
		enemyDiamonds.scaleY = 0.25;
		stage.addChild(enemyDiamonds);
		
		// create player miner and enemy miner
		var miner = new createjs.Sprite(spriteSheet, "playerMine");
		miner.x = 10;
		miner.y = 1;
		miner.scaleX = 0.5;
		miner.scaleY = 0.25;
		stage.addChild(miner);
		playerVars.miners.push(miner);
		
		var enemyMiner = new createjs.Sprite(spriteSheet, "enemyMine");
		enemyMiner.x = 270;
		enemyMiner.y = 1;
		enemyMiner.scaleX = 0.5;
		enemyMiner.scaleY = 0.25;
		stage.addChild(enemyMiner);
		enemyVars.miners.push(enemyMiner);
		
		// create player builder and enemy builder
		var builder = new createjs.Sprite(spriteSheet, "playerBuildRight");
		builder.x = 60;
		builder.y = 125;
		builder.scaleX = 0.5;
		builder.scaleY = 0.25;
		stage.addChild(builder);
		playerVars.builders.push(builder);
		
		var enemyBuilder = new createjs.Sprite(spriteSheet, "enemyBuildLeft");
		enemyBuilder.x = 215;
		enemyBuilder.y = 125;
		enemyBuilder.scaleX = 0.5;
		enemyBuilder.scaleY = 0.25;
		stage.addChild(enemyBuilder);
		playerVars.builders.push(enemyBuilder);
		
		// create brick at player foundation
		var playerBrick = new createjs.Sprite(spriteSheet, "brick");
		playerBrick.x = 80;
		playerBrick.y = 136;
		playerBrick.scaleX = 0.5;
		playerBrick.scaleY = 0.25;
		stage.addChild(playerBrick);
		
		// create brick at enemy foundation
		var enemyBrick = new createjs.Sprite(spriteSheet, "brick");
		enemyBrick.x = 176;
		enemyBrick.y = 136;
		enemyBrick.scaleX = 0.5;
		enemyBrick.scaleY = 0.25;
		stage.addChild(enemyBrick);
		
		// create text
/*		var txt = new createjs.Text("Game Over", "20px Arial", "#ff7700");
		txt.textBaseline = "middle";
		txt.textAlign = "center";
		txt.x = stage.canvas.width / 2;
		txt.y = stage.canvas.height / 2;
		stage.addChild(txt);
		stage.update(); */
	}
/*	function loadComplete() {
		createjs.Sound.play("endgame");
	}*/
	// buy a miner
	var buyMiner = document.getElementById("miner");
	buyMiner.onclick = function() {
		if (playerVars.money - gameVars.minerCost < 0) {
			// placeholder error, fix to display error in game
			alert("Not enough money!");
			
			//pause game
			//grey out game and display "not enough money"
			//unpause game
		}
		else {
			// update money and miner count
			playerVars.money = playerVars.money - gameVars.minerCost;
			playerVars.numMiners = playerVars.numMiners + 1;
			playerVars.miners.push();
			
			// display miner on canvas
			var miner = new createjs.Sprite(spriteSheet, "playerMine");
			miner.x = playerVars.spawnX;
			miner.y = playerVars.spawnY;
			miner.scaleX = 0.5;
			miner.scaleY = 0.25;
			miner.paused = true;
			stage.addChild(miner);
/*			var placeArea = document.getElementById("player-main");
			placeArea.addEventListener('click', function() {
				miner.x = stage.mouseX;
				miner.y = stage.mouseY;
				miner.paused = false;
			}); */
		}

		// display updated player stats
		document.getElementById("miners").innerHTML = playerVars.numMiners;
		document.getElementById("money").innerHTML = playerVars.money;
	}
	// buy a builder
	var buyBuilder = document.getElementById("builder");
		buyBuilder.onclick = function() {
			if (playerVars.money - gameVars.builderCost < 0) {
				// placeholder error, fix to display error in game
				alert("Not enough money!");
				
				//pause game
				//grey out game and display "not enough money"
				//unpause game
			}
			else {
				// update money and builder count
				playerVars.money = playerVars.money - gameVars.builderCost;
				playerVars.numBuilders = playerVars.numBuilders + 1;
				playerVars.builders.push();
				
				// display builder on canvas
				var builder = new createjs.Sprite(spriteSheet, "playerBuildLeft");
				builder.x = playerVars.spawnX;
				builder.y = playerVars.spawnY;
				builder.scaleX = 0.5;
				builder.scaleY = 0.25;
				builder.paused = true;
				stage.addChild(builder);
/*				var placeArea = document.getElementById("player-main");
				placeArea.addEventListener('click', function() {
					builder.x = stage.mouseX;
					builder.y = stage.mouseY;
					builder.paused = false;
				}); */
			}

		// display updated player stats
		document.getElementById("builders").innerHTML = playerVars.numBuilders;
		document.getElementById("money").innerHTML = playerVars.money;
	}
	var time = 0;
	function startGame() {
		createjs.Ticker.setFPS(60);
		createjs.Ticker.addEventListener("tick", function(e) {
			stage.update();
			// increment money every second
			if (time % 60 == 0 && time != 0) {
				playerVars.money = playerVars.money + playerVars.numMiners * 1;
				enemyVars.money = enemyVars.money + enemyVars.numMiners * 1;
			}
			
			// increment bricks every minute
			if (time % 3600 == 0 && time != 0) {
				playerVars.bricks = playerVars.bricks + playerVars.numBuilders * 1;
				for (i = 0; i < playerVars.numBuilders; i++) {
					addBrick(playerVars);
				}
				enemyVars.bricks = enemyVars.bricks + enemyVars.numBuilders * 1;
				for (i = 0; i < enemyVars.numBuilders; i++) {
					addBrick(enemyVars);
				}
			}
			document.getElementById("player_bricks").innerHTML = playerVars.bricks;
			document.getElementById("enemy_bricks").innerHTML = enemyVars.bricks;
			document.getElementById("money").innerHTML = playerVars.money;
			document.getElementById("miners").innerHTML = playerVars.numMiners;
			document.getElementById("builders").innerHTML = playerVars.numBuilders;
			time++; // increase time counter
		});
	}
}