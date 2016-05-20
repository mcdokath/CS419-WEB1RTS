//game variables
var gameVars = {
	minerCost: 100,
	builderCost: 200
};

// player variables
var playerVars = {
	money: 200,
	numMiners: 1,
	numBuilders: 1,
	//mine: new Mine(),
	miners: [],
	builders: []
};

// enemy AI variables
var enemyVars = {
	money: 20,
	numMiners: 1,
	numBuilders: 1,
	//mine: new Mine(),
	miners: [],
	builders: []
};

// collects diamonds at a set interval
function runCollectDiamonds(playerObj) {	
	if (playerObj.money < 10000){
		playerObj.money = playerObj.money + 1;
		document.getElementById("money").innerHTML = playerObj.money;
	}
	else{
		document.getElementById("money").innerHTML = 10000;
	}	
};
 
function addBrick(){
	
	if (numberOfBricks< 45) {
		/*
		var Xa, Ya;
		var i = numberOfBricks;
		if ( i == 1 || 6 || 11 || 16 || 21 || 26 || 31 || 36 || 41 || 46){Xa = 9;}
		if ( i == 2 || 7 || 12 || 17 || 22 || 27 || 32 || 37 || 42 || 47){Xa = 49;}
		if ( i == 3 || 8 || 13 || 18 || 23 || 28 || 33 || 38 || 43 || 48){Xa = 89;}
		if ( i == 4 || 9 || 14 || 19 || 24 || 29 || 34 || 39 || 44 || 49){Xa = 129;}
		if ( i == 5 || 10 || 15 || 20 || 25 || 30 || 35 || 40 || 45 || 50){Xa = 169;}
		if ( i == 1 || 2 || 3 || 4 || 5 ){Ya = 546;}
		if ( i == 7 || 7 || 8 || 9 || 10 ){Ya = 46;}
		if ( i == 11 || 12 || 13 || 14 || 15 ){Ya = 69;}
		if ( i == 16 || 17 || 18 || 19 || 20 ){Ya = 92;}
		if ( i == 21 || 22 || 23 || 24 || 25 ){Ya = 115;}
		if ( i == 26 || 27 || 28 || 29 || 30){Ya = 138;}
		if ( i == 31 || 32 || 33 || 34 || 35 ){Ya = 161;}
		if ( i == 36 || 37 || 38 || 39 || 40 ){Ya = 184;}
		if ( i == 41 || 42 || 43 || 44 || 45 ){Ya = 207;}
		if ( i == 46 || 47 || 48 || 49 || 50){Ya = 230;}
		*/
		if (numberOfBricks == 1) {newbrick = new Bricks(49,546);}
		if (numberOfBricks == 2) {newbrick = new Bricks(89,546);}
		if (numberOfBricks == 3) {newbrick = new Bricks(129,546);}
		if (numberOfBricks == 4) {newbrick = new Bricks(169,546);}
		if (numberOfBricks == 5) {newbrick = new Bricks(9,523);}
		if (numberOfBricks == 6) {newbrick = new Bricks(49,523);}
		if (numberOfBricks == 7) {newbrick = new Bricks(89,523);}
		if (numberOfBricks == 8) {newbrick = new Bricks(129,523);}
		if (numberOfBricks == 9) {newbrick = new Bricks(169,523);}
		if (numberOfBricks == 10) {newbrick = new Bricks(9,500);}
		if (numberOfBricks == 11) {newbrick = new Bricks(49,500);}
		if (numberOfBricks == 12) {newbrick = new Bricks(89,500);}
		if (numberOfBricks == 13) {newbrick = new Bricks(129,500);}
		if (numberOfBricks == 14) {newbrick = new Bricks(169,500);}
		if (numberOfBricks == 15) {newbrick = new Bricks(9,477);}
		if (numberOfBricks == 16) {newbrick = new Bricks(49,477);}
		if (numberOfBricks == 17) {newbrick = new Bricks(89,477);}
		if (numberOfBricks == 18) {newbrick = new Bricks(129,477);}
		if (numberOfBricks == 19) {newbrick = new Bricks(169,477);}
		if (numberOfBricks == 20) {newbrick = new Bricks(9,454);}
		if (numberOfBricks == 21) {newbrick = new Bricks(49,454);}
		if (numberOfBricks == 22) {newbrick = new Bricks(89,454);}
		if (numberOfBricks == 23) {newbrick = new Bricks(129,454);}
		if (numberOfBricks == 24) {newbrick = new Bricks(169,454);}
		if (numberOfBricks == 25) {newbrick = new Bricks(9,431);}
		if (numberOfBricks == 26) {newbrick = new Bricks(49,431);}
		if (numberOfBricks == 27) {newbrick = new Bricks(89,431);}
		if (numberOfBricks == 28) {newbrick = new Bricks(129,431);}
		if (numberOfBricks == 29) {newbrick = new Bricks(169,431);}
		if (numberOfBricks == 30) {newbrick = new Bricks(9,408);}
		if (numberOfBricks == 31) {newbrick = new Bricks(49,408);}
		if (numberOfBricks == 32) {newbrick = new Bricks(89,408);}
		if (numberOfBricks == 33) {newbrick = new Bricks(129,408);}
		if (numberOfBricks == 34) {newbrick = new Bricks(169,408);}
		if (numberOfBricks == 35) {newbrick = new Bricks(9,385);}
		if (numberOfBricks == 36) {newbrick = new Bricks(49,385);}
		if (numberOfBricks == 37) {newbrick = new Bricks(89,385);}
		if (numberOfBricks == 38) {newbrick = new Bricks(129,385);}
		if (numberOfBricks == 39) {newbrick = new Bricks(169,385);}
		if (numberOfBricks == 40) {newbrick = new Bricks(9,362);}
		if (numberOfBricks == 41) {newbrick = new Bricks(49,362);}
		if (numberOfBricks == 42) {newbrick = new Bricks(89,362);}
		if (numberOfBricks == 43) {newbrick = new Bricks(129,362);}
		if (numberOfBricks == 44) {newbrick = new Bricks(169,362);}
	
		//if (numberOfBricks == 45) {newbrick = new Bricks(49,546);}
			
		
		//newbrick = new Bricks(Xa,Ya);
		Bricks_player_array.push(newbrick);
		numberOfBricks = numberOfBricks + 1;

	}
	else{}
	//this will display information on the screen
	document.getElementById("player_height").innerHTML = numberOfBricks;
}

/********************/
/* MINER FUNCTIONS */
/********************/
//https://github.com/search?q=Gold+Miner+-+HTML5+Game&type=Code&utf8=%E2%9C%93
//I am making an assuption that miner costs 100 units 

function buyBuilder(){
	if (playerVars.money - gameVars.builderCost < 0) {
		// placeholder error, fix to display error in game
		alert("Not enough money!");
		
		//pause game
		//grey out game and display "not enough money"
		//unpause game
	}
	else {
		// update money and miner count
		playerVars.money = playerVars.money - gameVars.builderCost;
		playerVars.numBuilders = playerVars.numBuilders + 1;
		// display builder on canvas
		
	}

	// display updated player stats
	document.getElementById("builder").innerHTML = playerVars.numBuilders;
	document.getElementById("money").innerHTML = playerVars.money;
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
		
		// create draggable sprite
/*		var sprite = new createjs.Sprite(spriteSheet, "playerMine");
		sprite.x = 0;
		sprite.y = 0;
		sprite.scaleX = 0.5;
		sprite.scaleY = 0.25;
		//sprite.paused = true;
		stage.addChild(sprite);
		sprite.addEventListener('mousedown',function(e) {
			stage.addEventListener('stagemousemove',function(e) {
				sprite.x = stage.mouseX;
				sprite.y = stage.mouseY;
			});
			
			stage.addEventListener('stagemouseup',function(e) {
				e.target.removeAllEventListeners();
			});
		});*/
		
		// create sprite at player spawn location
/*		var spawn = new createjs.Sprite(spriteSheet, "playerBuild");
		spawn.x = 90;
		spawn.y = 25;
		spawn.scaleX = 0.5;
		spawn.scaleY = 0.25;
		stage.addChild(spawn);
		
		// create sprite at enemy spawn location
		var enemySpawn = new createjs.Sprite(spriteSheet, "enemyBuild");
		enemySpawn.x = 185;
		enemySpawn.y = 25;
		enemySpawn.scaleX = 0.5;
		enemySpawn.scaleY = 0.25;
		stage.addChild(enemySpawn); */
		
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
			alert("Click in your mine to place your miner!");
			stage.addEventListener('click', function() {
				miner.x = stage.mouseX;
				miner.y = stage.mouseY;
			});
			miner.scaleX = 0.5;
			miner.scaleY = 0.25;
			stage.addChild(miner);
		}

		// display updated player stats
		document.getElementById("miners").innerHTML = playerVars.numMiners;
		document.getElementById("money").innerHTML = playerVars.money;
	}
	var time = 0;
	function startGame() {
		createjs.Ticker.setFPS(60);
		createjs.Ticker.addEventListener("tick", function(e) {
			stage.update();
			// increment money every second
			if (time % 60 == 0) {
				playerVars.money = playerVars.money + playerVars.numMiners * 1;
				enemyVars.money = enemyVars.money + enemyVars.numMiners * 1;
			}
			document.getElementById("miners").innerHTML = playerVars.numMiners;
			document.getElementById("money").innerHTML = playerVars.money;
			time++; // increase time counter
		});
	}
}