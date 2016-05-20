var stage;
var queue;
function init() {
	queue = new createjs.LoadQueue();
	queue.installPlugin(createjs.Sound);
	queue.addEventListener("complete", loadComplete);
	queue.loadManifest([
		{id:"endgame", src:"media/titlemusic.mp3"}
	]);
	function loadComplete() {
		setupStage();
		builderLoaderBar();
		startLoad();
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
		var spriteSheet = new createjs.SpriteSheet({
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
				playerBuild: {
					frames: [5,6,5,6,8,7,8,7],
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
				enemyBuild: {
					frames: [17,18,17,18,20,19,20,19],
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
		
		// create diamond mines
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
		
		// create draggable sprite
		var sprite = new createjs.Sprite(spriteSheet, "playerMine");
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
		});
		
		// create sprite at player spawn location
		var spawn = new createjs.Sprite(spriteSheet, "playerBuild");
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
		stage.addChild(enemySpawn);
		
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
	function startGame() {
		createjs.Ticker.setFPS(60);
		createjs.Ticker.addEventListener("tick", function(e) {
			stage.update();
		});
	}
}