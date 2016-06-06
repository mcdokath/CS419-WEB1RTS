	//game variables
	var gameVars = {
		minerCost: 100,
		builderCost: 200,
		brickWidth: 13,
		brickHeight: 9,
		bricksPerRow: 6,
		winningBrickCount: 180
	};

	// player variables
	var playerVars = {
		bricks: 1, // total bricks
		firstBrickX: 196, // where to start new row
		lastBrickX: 196, // X coordinate of last brick
		lastBrickY: 548, // Y coordinate of last brick
		numBricksRow: 1, // number of bricks in current row
		money: 400,
		numMiners: 1,
		numBuilders: 1,
		lastMinerY: 0, // allows game to automatically place new miners
		lastBuilderX: 0, // allows game to automatically place new builders
		lastBuilderY: 0, // allows game to automatically place new builders
		spawnX: 230, // X coordinate of where new units will spawn
		spawnY: 140 // Y coordinate of where new units will spawn
	};

	// enemy AI variables
	var enemyVars = {
		bricks: 1, // total bricks
		firstBrickX: 420, // where to start new row
		lastBrickX: 420, // X coordinate of last brick
		lastBrickY: 548, // Y coordinate of last brick
		numBricksRow: 1, // number of bricks in current row
		money: 400,
		numMiners: 1,
		numBuilders: 1,
		lastMinerY: 0, // allows game to automatically place new miners
		lastBuilderX: 0, // allows game to automatically place new builders
		lastBuilderY: 0, // allows game to automatically place new builders
		spawnX: 454, // X coordinate of where new units will spawn
		spawnY: 140 // Y coordinate of where new units will spawn
	};

	// global variables
	var canvas, stage, queue, spriteSheet, time;

	function init() {
		canvas = document.getElementById('canvas');
		stage = new createjs.Stage(canvas);
		// display winning brick number
		document.getElementById("winning_bricks").innerHTML = gameVars.winningBrickCount;
		queue = new createjs.LoadQueue();
		queue.installPlugin(createjs.Sound);
		queue.addEventListener("complete", loadComplete);
		queue.loadManifest([
			{id:"endgame", src:"media/titlemusic.mp3"}
		]);
	}

	function loadComplete() {
		setupSpritesheet();
		buildSprites();
		// set time to 0
		time = 0;
		startGame();
	}

	function setupSpritesheet() {
		var data = {
			framerate:30,
			images: [
				"images/spritesheet.png"
			],
			frames: [
				[1, 1, 87, 589, 0, 0, 0],
				[90, 1, 32, 64, 0, 0, 0],
				[90, 67, 32, 63, 0, 0, 0],
				[90, 132, 32, 63, 0, 0, 0],
				[90, 197, 32, 63, 0, 0, 0],
				[90, 262, 13, 9, 0, 0, 0],
				[1, 592, 40, 64, 0, 0, 0],
				[43, 592, 40, 64, 0, 0, 0],
				[85, 592, 38, 64, 0, 0, 0],
				[1, 658, 40, 64, 0, 0, 0],
				[43, 658, 40, 63, 0, 0, 0],
				[85, 658, 38, 63, 0, 0, 0],
				[43, 723, 40, 63, 0, 0, 0],
				[1, 724, 39, 64, 0, 0, 0],
				[1, 790, 39, 63, 0, 0, 0],
				[42, 788, 39, 64, 0, 0, 0],
				[83, 788, 39, 64, 0, 0, 0],
				[85, 723, 37, 63, 0, 0, 0]
			],
			animations: {
				"diamonds": { frames: [0] },
				"playerMine": {
					frames: [1,16,15,4],
					speed: 0.05
					},
				"enemyMine": {
					frames: [2,10,14,3],
					speed: 0.05
				},
				"playerBuildLeft": {
					frames: [8,9],
					speed: 0.05
				},
				"playerBuildRight": {
					frames: [12,13],
					speed: 0.05
				},
				"enemyBuildLeft": {
					frames: [11,6],
					speed: 0.05
				},
				"enemyBuildRight": {
					frames: [17,7],
					speed: 0.05
				},
				"brick": { frames: [5] }
			}
		}
		spriteSheet = new createjs.SpriteSheet(data);
	}

	function buildSprites() {
		// create player and enemy diamond mines
		var playerDiamonds = new createjs.Sprite(spriteSheet, "diamonds");
		playerDiamonds.name = 'playerDiamonds';
		playerDiamonds.x = 50;
		playerDiamonds.y = 300;
		playerDiamonds.regX = playerDiamonds.getBounds().width / 2;
		playerDiamonds.regY = playerDiamonds.getBounds().height / 2;
		stage.addChild(playerDiamonds);

		var enemyDiamonds = new createjs.Sprite(spriteSheet, "diamonds");
		enemyDiamonds.name = 'enemyDiamonds';
		enemyDiamonds.x = 650;
		enemyDiamonds.y = 300;
		enemyDiamonds.regX = enemyDiamonds.getBounds().width / 2;
		enemyDiamonds.regY = enemyDiamonds.getBounds().height / 2;
		stage.addChild(enemyDiamonds);

		// create player miner and enemy miner
		var miner = new createjs.Sprite(spriteSheet, "playerMine");
		miner.name = 'playerMiner' + 0;
		miner.x = 50;
		miner.y = 40;
		miner.regX = miner.getBounds().width / 2;
		miner.regY = miner.getBounds().height / 2;
		playerVars.lastMinerY = miner.y;
		stage.addChild(miner);

		var enemyMiner = new createjs.Sprite(spriteSheet, "enemyMine");
		miner.name = 'enemyMiner' + 0;
		enemyMiner.x = 650;
		enemyMiner.y = 40;
		enemyMiner.regX = enemyMiner.getBounds().width / 2;
		enemyMiner.regY = enemyMiner.getBounds().height / 2;
		enemyVars.lastMinerY = enemyMiner.y;
		stage.addChild(enemyMiner);

		// create player builder and enemy builder
		var builder = new createjs.Sprite(spriteSheet, "playerBuildRight");
		builder.name = 'playerBuilder' + 0;
		builder.x = 161;
		builder.y = 553;
		builder.regX = builder.getBounds().width / 2;
		builder.regY = builder.getBounds().height / 2;
		playerVars.lastBuilderX = builder.x;
		playerVars.lastBuilderY = builder.y
		stage.addChild(builder);

		var enemyBuilder = new createjs.Sprite(spriteSheet, "enemyBuildLeft");
		enemyBuilder.name = 'enemyBuilder' + 0;
		enemyBuilder.x = 537;
		enemyBuilder.y = 553;
		enemyBuilder.regX = enemyBuilder.getBounds().width / 2;
		enemyBuilder.regY = enemyBuilder.getBounds().height / 2;
		enemyVars.lastBuilderX = enemyBuilder.x;
		enemyVars.lastBuilderY = enemyBuilder.y;
		stage.addChild(enemyBuilder);

		// create brick at player foundation
		var playerBrick = new createjs.Sprite(spriteSheet, "brick");
		playerBrick.name = 'playerBrick' + 0;
		playerBrick.x = 196;
		playerBrick.y = 548;
		playerBrick.regX = playerBrick.getBounds().width / 2;
		playerBrick.regY = playerBrick.getBounds().height / 2;
		stage.addChild(playerBrick);

		// create brick at enemy foundation
		var enemyBrick = new createjs.Sprite(spriteSheet, "brick");
		enemyBrick.name = 'enemyBrick' + 0;
		enemyBrick.x = 420;
		enemyBrick.y = 548;
		enemyBrick.regX = enemyBrick.getBounds().width / 2;
		enemyBrick.regY = enemyBrick.getBounds().height / 2;
		stage.addChild(enemyBrick);
	}

	// main game script
	function startGame() {
		// buy a miner
		var buyMiner = document.getElementById("miner");
		buyMiner.onclick = function() {
			if (playerVars.money - gameVars.minerCost < 0) {
				alert("Not enough money!");
			}
			else {
				// update money and miner count
				playerVars.money = playerVars.money - gameVars.minerCost;
				playerVars.numMiners = playerVars.numMiners + 1;
				
				// display miner on canvas
				var miner = new createjs.Sprite(spriteSheet, "playerMine");
				miner.x = playerVars.spawnX;
				miner.y = playerVars.spawnY;
				miner.regX = miner.getBounds().width / 2;
				miner.regY = miner.getBounds().height / 2;
				miner.paused = true;
				stage.addChild(miner);
				// POSITION UNIT
				placeUnit(miner, "playerMiner", playerVars);
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
			}
			else {
				// update money and builder count
				playerVars.money = playerVars.money - gameVars.builderCost;
				playerVars.numBuilders = playerVars.numBuilders + 1;
				
				// display builder on canvas
				var builder = new createjs.Sprite(spriteSheet, "playerBuildLeft");
				builder.x = playerVars.spawnX;
				builder.y = playerVars.spawnY;
				builder.regX = builder.getBounds().width / 2;
				builder.regY = builder.getBounds().height / 2;
				builder.paused = true;
				stage.addChild(builder);
				// POSITION UNIT
				placeUnit(builder, "playerBuilder", playerVars);
			}

			// display updated player stats
			document.getElementById("builders").innerHTML = playerVars.numBuilders;
			document.getElementById("money").innerHTML = playerVars.money;
		}

		createjs.Ticker.setFPS(60);
		createjs.Ticker.addEventListener("tick", function(e) {
			stage.update();
			// if player or AI has reached winningBrickCount, end game
			if (playerVars.bricks == gameVars.winningBrickCount || enemyVars.bricks == gameVars.winningBrickCount) {
				// if both players are at the winning count, it's a tie
				if (playerVars.bricks == enemyVars.bricks) {
					endGame(2);
				}
				// if player is at the winning count
				else if (playerVars.brick == gameVars.winningBrickCount) {
					endGame(1);
				}
				// if enemy is at the winning count
				else {
					endGame(0);
				}
			}
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
				
			// AI actions
			// buying a builder or miner is a random event
			if (time % 200 == 0 && time != 0) {
				// if miners and builders are equal
				if (enemyVars.numMiners == enemyVars.numBuilders && enemyVars.money >= gameVars.builderCost) {
					// buy a builder
					AIBuyBuilder();
				}
				// if there is one more builder than miners
				else if (enemyVars.numMiners + 1 == enemyVars.numBuilders && enemyVars.money >= gameVars.builderCost) {
					// buy a builder
					AIBuyBuilder();
				}
				// if there are two more builders than miners
				else if (enemyVars.numMiners + 2 == enemyVars.numBuilders && enemyVars.money >= gameVars.minerCost) {
					// buy a miner
					AIBuyMiner();
				}
				// otherwise, buy nothing
			}
			// update displayed values
			document.getElementById("player_bricks").innerHTML = playerVars.bricks;
			document.getElementById("enemy_bricks").innerHTML = enemyVars.bricks;
			document.getElementById("money").innerHTML = playerVars.money;
			document.getElementById("miners").innerHTML = playerVars.numMiners;
			document.getElementById("builders").innerHTML = playerVars.numBuilders;
			time++; // increase time counter
		});
	}

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
		newBrick.regX = newBrick.getBounds().width / 2;
		newBrick.regY = newBrick.getBounds().height / 2;
		stage.addChild(newBrick);	
		
		// update player vars
		playerObj.lastBrickX = brickX;
		playerObj.lastBrickY = brickY;
		playerObj.numBricksRow = playerObj.numBricksRow + 1;
	}

	// AI functions
	function AIBuyMiner() {
		if (enemyVars.money - gameVars.minerCost < 0) {
			// placeholder error, fix to display error in game
			alert("Not enough money!");
		}
		else {
			// update money and miner count
			enemyVars.money = enemyVars.money - gameVars.minerCost;
			enemyVars.numMiners = enemyVars.numMiners + 1;
			
			// display miner on canvas
			var miner = new createjs.Sprite(spriteSheet, "enemyMine");
			miner.x = enemyVars.spawnX;
			miner.y = enemyVars.spawnY;
			miner.regX = miner.getBounds().width / 2;
			miner.regY = miner.getBounds().height / 2;
			miner.paused = false;
			stage.addChild(miner);
			// POSITION UNIT
			placeUnit(miner, "enemyMiner", enemyVars);
		}		
	}
		
	function AIBuyBuilder() {
		if (enemyVars.money - gameVars.builderCost < 0) {
			// placeholder error, fix to display error in game
			alert("Not enough money!");
		}
		else {
			// update money and builder count
			enemyVars.money = enemyVars.money - gameVars.builderCost;
			enemyVars.numBuilders = enemyVars.numBuilders + 1;
			
			// display builder on canvas
			var builder = new createjs.Sprite(spriteSheet, "enemyBuildLeft");
			builder.x = enemyVars.spawnX;
			builder.y = enemyVars.spawnY;
			builder.regX = builder.getBounds().width / 2;
			builder.regY = builder.getBounds().height / 2;
			builder.paused = false;
			stage.addChild(builder);
			// POSITION UNIT
			placeUnit(builder, "enemyBuilder", enemyVars);
		}		
	}

	function placeUnit(unit, unitName, playerObj) {
		var nextX = unit.x;
		var nextY = unit.y;
		var middleY = 297;
		var increment = 10;
		
		// determine which unit is being placed
		if (unitName == "playerMiner") {
			var moveUp = 0;
			var moveLeft = 0;
			var finalPlace = 0;
			nextY = nextY + 140;
			nextX = nextX - 180;
			finalY = nextY;
			unit.addEventListener("tick", function() {
				if (unit.y < nextY && moveUp == 0) {
					// move down from spawn location
					unit.y += increment;
				}
				else if (unit.y >= nextY && unit.x > nextX) {
					moveUp = 1;
					// move left
					unit.x -= increment;
				}
				else if (unit.y >= nextY && unit.x <= nextX) {
					// if there is space, move up
					if (playerObj.lastMinerY < middleY) {
						if (unit.y > playerObj.lastMinerY && playerObj.lastMinerY < middleY) {
							unit.y -= increment;
						}
					}
					else if (playerObj.lastMinerY >= middleY) {
					// if not, move down
						if (unit.y < playerObj.lastMinerY && playerObj.lastMinerY >= middleY) {
							unit.y += increment;
						}
					}
				}
				else {
					unit.removeEventListener("tick");					
				}
			});
			// update last unit position
			//playerObj.lastMinerY = unit.y;
			// start animation
			unit.paused = false;
		}
		else if (unitName == "playerBuilder") {
			
		}
		else if (unitName == "enemyMiner") {
			
		}
		else if (unitName == "enemyBuilder") {
			
		}
		
		//this.unit.nextX = nextX;
		//this.unit.nextY = nextY;
	}

	function endGame(winner) {
		// remove event listener
		createjs.Ticker.removeEventListener("tick");
		
		// 0 = enemy wins
		if (winner == 0) {
			// write to dialog
			document.getElementById("winner-name").innerHTML = "ENEMY WINS";
			
		}
		// 1 = player wins
		else if (winner == 1) {
			// write to dialog
			document.getElementById("winner-name").innerHTML = "YOU WIN";
			
		}
		// 2 = tie
		else {
			// write to dialog
			document.getElementById("winner-name").innerHTML = "IT'S A TIE";			
		}
		
		// display dialog
		document.getElementById("game-container").style.display="none";
		document.getElementById("endgame-container").style.display="block";
			// play ending music
		createjs.Sound.play("endgame");
	}