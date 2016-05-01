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


<canvas id="canvasBg" width="800" height="600"></canvas>

        <div id="overlapping">
            <canvas id="scene" width="800" height="600"></canvas>
        </div>
http://jlongster.com/Making-Sprite-based-Games-with-Canvas
/* struct GameVars */



//canvas variables
var canvasBg = document.getElementById("canvasBg"),
    ctxBg = canvasBg.getContext("2d"),
    canvasEntities = document.getElementById("canvasEntities"),
    ctxEntities = canvasEntities.getContext("2d"),
    canvasWidth = canvasBg.width,
    canvasHeight = canvasBg.height,
	//how many robots to buy
	number,
	//how much money the user has
	gold =20,
	//money = getMinerCost('gold'),var
	
	//money = getMinerCost('gold'),
	money=20,
	//miner
	miner,
	builder,
	new_miner,
	new_builder,
	//this will be used for the new Brick() object
	newbrick,
	//player1 = new PlayerVars(),
	//builders_player1 = new PlayerDestructor(),
	//destructor_player1 = new Builder(),
	//miner_player1 = new PlayerMiner(),
	Miners_player_array = [],
	Constructor_player_array = [],
	//destructor_player_array = [],
	//miner_player =[],
	numMiners_player = builder,
	numberOfMiners =1,
	numberOfBuilders =1,
	playerMine1 = new Mine(),
	Bricks_player_array = [],
	numberOfBricks = 1,
	
	//so we will not go with the height, but instead with the number
	//of bricks in the building
	//this is not critical for the EASY level, but for the HARD level, where destructors
	//will be able to destruct the buildings - bricks- this is necessary.
	//we need to get to 50 bricks
	nuber_of_bricks_building_player = 1,
	brick_array_player = [],
	//the game is not playing
	isPlaying = false,
	//variables to animates the frame, checks different browsers
    requestAnimFrame =  window.requestAnimationFrame ||
                        window.webkitRequestAnimationFrame ||
                        window.mozRequestAnimationFrame ||
                        window.oRequestAnimationFrame ||
                        window.msRequestAnimationFrame ||
                        function(callback) {
                            window.setTimeout(callback, 1000 / 60);
                        },	
	    requestAnimFrameforDiamonds =  window.requestAnimationFrame ||
                        window.webkitRequestAnimationFrame ||
                        window.mozRequestAnimationFrame ||
                        window.oRequestAnimationFrame ||
                        window.msRequestAnimationFrame ||
                        function(callback1) {
                            window.setTimeout(callback1, 18000);
                        },					
	imgSprite	= new Image();
	//location of the image 
	imgSprite.src = "images/canvas.png";
	//we are listening for the image to load
	//and then we call the finction initializer
	imgSprite.addEventListener("load", init, false);
	
	
function init(){
	//we are listening to the key listening
	//document.addEventListener("keydown", checkKeyDown, false);
    //document.addEventListener("keyup", checkKeyUp, false);
	//lets the game know where the game is
    //defineMines();
    initMiners();//
	initConstructor();
	initBricks();
	//definePlayerMine();
	begin();
	//setTimeout(collectDiamons, 600);
	
}	
	
//we need to draw the backgraound
function begin() {
	//image, top source x, top source y, canvasWidth, canvasHeight, draw x, draw y, canvasWidth, canvasHeight
    ctxBg.drawImage(imgSprite, 0, 0, canvasWidth, canvasHeight, 0, 0, canvasWidth, canvasHeight);
    //the game has begun
	isPlaying = true;
	//request animation
	//loop is the function
    requestAnimFrame(loop);
	requestAnimFrameforDiamonds(loopdiamonds);
}


function update() {
	
    clearCtx(ctxEntities);
    updateAllMiners();
	updateAllConstructor();
	updateBricks();
    playerMine1.update();
	//collectDiamons();
	//setTimeout(collectDiamons, 600);
	//runCollectDimanons();
}

function draw() {
   drawAllMiners();
   drawAllConstructor();
   drawAllBricks();
   playerMine1.draw();
}

//this functions updates the game, when we draw new canvas, we need to clear the old one
function loop() {
	//check and make sure that the game is playing
    if (isPlaying) {
		//update the draw loop
        update();
		//draw everything that we need to 
		//setTimeout(collectDiamons, 600);
        draw();
        requestAnimFrame(loop);
    }
}


function loopdiamonds() {
	//check and make sure that the game is playing
    if (isPlaying) {
		collectDiamons();
		addBrick();
		requestAnimFrameforDiamonds(loopdiamonds);
    }
}


//clear function to get rid of the infomation on the screen
function clearCtx(ctx) {
	//this will clear the rectangle where the game is played
	//specify the dimension of the canvas that we want to clean
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
}
	
	
	
function randomRange (min, max) {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
}


	//var Xa, Ya;
//lets define a building block of the building
//Xa and Ya are the coordinates on the canvas where the brick will be drawn
/*
function Brick(Xa, Ya) {
	this.srcX = 396;
    this.srcY = 627;
    this.width = 40;
    this.height = 23;
	this.drawX = Xa;
	this.drawY = Ya;
}

//function to add bricks

function initBricks() {
    for (var i = 0; i < nuber_of_bricks_building_player; i++) {
       brick_array_player[brick_array_player.length] = new Brick(9, 546);
    }
}
//create prototype of the builder
//adding a method to the object
Brick.prototype.update = function () {    	
    ctxEntities.drawImage(imgSprite, this.srcX, this.srcX,this.width, this.height,this.drawX , this.drawY,this.width, this.height);

};
//c.drawImage(image, xpos, ypos, frameSize, frameSize, 0, 0, frameSize, frameSize);

Brick.prototype.draw = function () {
	//ctxEntities.drawImage(imgSprite, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, this.width, this.height);

		   ctxEntities.drawImage(imgSprite,this.srcX, this.srcX,this.width, this.height,this.drawX , this.drawY,this.width, this.height);
	
   };


//change 2 to numMiners_player after u figure out how to keep track of the variable numMiners_player
/*
at the begining of the game we do not have any bricks, so we do not need to initialize brick array
function initBricks() {
    for (var i = 0; i < nuber_of_bricks_building_player; i++) {
        brick_array_player[brick_array_player.length] = new Brick();
    }
}F

function updateAllBricks() {
    for (var i = 0; i < brick_array_player.length; i++) {
        brick_array_player[i].update();
    }
}

function drawAllBricks() {
	//numberOfBlicksLeft = brick_array_player.length;
    for (var i = 0; i < brick_array_player.length; i++) {
		brick_array_player[i].draw();
    }
		
}

*/	
//THIS WILL DRAW MINE FOR THE PlayerDestructor
//WE SHOULD CHANGE THE IMAGE
function Mine() {
    this.srcX = 1;
    this.srcY = 1290;
    this.width = 113;
    this.height = 117;
    this.drawX = 100;
    this.drawY = 19;
    this.centerX = this.drawX + (this.width / 2);
    this.centerY = this.drawY + (this.height / 2);

}

Mine.prototype.update = function () {
    this.centerX = this.drawX + (this.width / 2);
    this.centerY = this.drawY + (this.height / 2);
};

Mine.prototype.draw = function () {
    //this.drawAllBullets();
    ctxEntities.drawImage(imgSprite, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, this.width, this.height);
};

/* struct PlayerVars
function PlayerVars(money, buildingHeight, miners, builders) {
	//this variable belongs to this player
	this.srcX = 0;
	this.money = money;
	this.buildingHeight = buildingHeight;
	this.miners = miners;
	this.builders = builders;
}
 */
/*	
function GameVars(winningHeight, minerCost, builderCost) {
	this.winningHeight = winningHeight;
	this.minerCost = minerCost;
	this.builderCost = builderCost;
}
*/
//https://github.com/search?q=Gold+Miner+-+HTML5+Game&type=Code&utf8=%E2%9C%93
//I am making an assuption that miner costs 100 units 
function buyMiner(number){
	if (numberOfMiners < 15) {
	if (money - 100 < 0) {
		// placeholder error, fix to display error in game
		document.write("<p>Not enough money!</p>");
	}
	else {
		// update money and miner count
		money = money - 100;
		numberOfMiners = numberOfMiners + number;
		//Miners_player_array
		new_miner = new Miners();
		//data.push({})??
		Miners_player_array.push(new_miner);
	}
	}
	else{}
	//miner = miner + number;
	document.getElementById("miner").innerHTML = numberOfMiners;
	document.getElementById("money").innerHTML = money;
}

function buyBuilder(number){
	if (numberOfBuilders < 15) {
	if (money - 200 < 0) {
		// placeholder error, fix to display error in game
		document.write("<p>Not enough money!</p>");
	}
	else {
		// update money and miner count
		money = money - 200;
		numberOfBuilders = numberOfBuilders + number;
		//Miners_player_array
		new_builder = new Constructor();
		//add new  builder to the array - will be used for drawing
		//??
		Constructor_player_array.push(new_builder);
	}
	}
	else{}
	//miner = miner + number;
	document.getElementById("builder").innerHTML = numberOfBuilders;
	document.getElementById("money").innerHTML = money;
}


//function that will draw miners on the canvas
//http://stackoverflow.com/questions/26446284/unexpected-token-this-while-creating-method-inside-object
//to find postions of the image on the sprite file, use http://getspritexy.com/
//the problem is that the backgrount of the sprite is not transparrent
//http://stackoverflow.com/questions/13244458/android-how-to-make-the-background-of-a-sprite-transparent
//http://forums.getpaint.net/index.php?/topic/12196-making-backgrounds-of-images-transparent/
//http://jsfiddle.net/ejTCy/7/
function Miners() {
	this.srcX = 18;
    this.srcY = 1203;
    this.width = 42;
    this.height = 40;
    this.drawX = randomRange(0, canvasWidth - this.width);
    this.drawY = randomRange(0, canvasHeight - this.height);
	var that = this;
	this.moveInterval = setInterval(function() {that.loop_miner();}, 200);
	
 
}
        var xpos=18, 
            ypos=1203, 
            index=0, 
            numFrames = 36, 
            frameSize= 35;
//function to loop through the sprite sheet for miner
 Miners.prototype.loop_miner = function() {
            //clear the canvas!
            //ctxEntities.clearRect(0,0, canvasHeight,canvasWidth);

            ctxEntities.drawImage(imgSprite,xpos,ypos,this.width, this.height,this.drawX, this.drawY,this.width, this.height);
            
            //each time around we add the frame size to our xpos, moving along the source image
            xpos += frameSize;
            //increase the index so we know which frame of our animation we are currently on
            index += 2;
            
            //if our index is higher than our total number of frames, we're at the end and better start over
            if (index >= numFrames) {
                xpos =36;
                ypos =1203;
                index=0;    
            //if we've gotten to the limit of our source image's width, we need to move down one row of frames                
            } else if (xpos + frameSize > imgSprite.width){
                xpos =36;
                ypos += frameSize;
            }
            
            
        }

//create prototype of the builder
//adding a method to the object
Miners.prototype.update = function () {
    ctxEntities.drawImage(imgSprite,xpos,ypos,this.width, this.height,this.drawX, this.drawY,this.width, this.height);
};
//c.drawImage(image, xpos, ypos, frameSize, frameSize, 0, 0, frameSize, frameSize);
Miners.prototype.draw = function () {
	//ctxEntities.drawImage(imgSprite, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, this.width, this.height);
	
   ctxEntities.drawImage(imgSprite,xpos,ypos,this.width, this.height,this.drawX, this.drawY,this.width, this.height);
};


//change 2 to numMiners_player after u figure out how to keep track of the variable numMiners_player
function initMiners() {
    for (var i = 0; i < numberOfMiners; i++) {
        Miners_player_array[Miners_player_array.length] = new Miners();
    }
}


function updateAllMiners() {
    for (var i = 0; i < Miners_player_array.length; i++) {
        Miners_player_array[i].update();
    }
}

function drawAllMiners() {
    for (var i = 0; i < Miners_player_array.length; i++) {
        Miners_player_array[i].draw();
    }
}





//BRICKS

function Bricks(Xa1, Ya1) {
	this.srcX = 396;
    this.srcY = 627;
    this.width = 40;
    this.height = 23;
    //this.drawX = 9;
    //this.drawY = 546;
	this.drawX = Xa1;
	this.drawY = Ya1;

}
        

//create prototype of the builder
//adding a method to the object
Bricks.prototype.update = function () {
    ctxEntities.drawImage(imgSprite,this.srcX,this.srcY,this.width, this.height,this.drawX, this.drawY,this.width, this.height);
};
//c.drawImage(image, xpos, ypos, frameSize, frameSize, 0, 0, frameSize, frameSize);
Bricks.prototype.draw = function () {
	//ctxEntities.drawImage(imgSprite, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, this.width, this.height);
	
   ctxEntities.drawImage(imgSprite,this.srcX,this.srcY,this.width, this.height,this.drawX, this.drawY,this.width, this.height);
};


//lets start with 1 brick for the user
function initBricks() {
    for (var i = 0; i < numberOfBricks; i++) {
       Bricks_player_array[Bricks_player_array.length] = new Bricks(9,546);
    }
}


function updateBricks() {
    for (var i = 0; i < Bricks_player_array.length; i++) {
        Bricks_player_array[i].update();
    }
}

function drawAllBricks() {
    for (var i = 0; i < Bricks_player_array.length; i++) {
        Bricks_player_array[i].draw();
    }
}
 
 
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

















//function that digs the gold depending on the number of mines
function collectDiamons(){
if (money < 10000){
	money = money + numberOfMiners*1;
	document.getElementById("money").innerHTML = money;
}
else{
	money = 10000;
}
	
};

function runCollectDimanons(){
	setTimeout(collectDiamons, 600);
};

//CONSTRUCTORS
//NEED TO CHANGE IMAGE FOR THE BUILDER
function Constructor() {
	this.srcX = 18;
    this.srcY = 1203;
    this.width = 42;
    this.height = 40;
    this.drawX = randomRange(0, canvasWidth - this.width);
    this.drawY = randomRange(0, canvasHeight - this.height);
	var that = this;
	this.moveInterval = setInterval(function() {that.loop_constructor();}, 1000);
	
 
}
            var xpos1=18, 
            ypos1=1203, 
            index1=0, 
            numFrames1 = 18, 
            frameSize1= 35;
//function to loop through the sprite sheet for miner
Constructor.prototype.loop_constructor = function() {
            //clear the canvas!
            //ctxEntities.clearRect(0,0, canvasHeight,canvasWidth);

            ctxEntities.drawImage(imgSprite,xpos1,ypos1,this.width, this.height,this.drawX, this.drawY,this.width, this.height);
            
            //each time around we add the frame size to our xpos, moving along the source image
            xpos1 += frameSize1;
            //increase the index so we know which frame of our animation we are currently on
            index1 += 2;
            
            //if our index is higher than our total number of frames, we're at the end and better start over
            if (index1 >= numFrames1) {
                xpos1 =18;
                ypos1 =1203;
                index1=0;    
            //if we've gotten to the limit of our source image's width, we need to move down one row of frames                
            } else if (xpos1 + frameSize1 > imgSprite.width){
                xpos1 =18;
                ypos1 += frameSize1;
            }
            
            
        }

//create prototype of the builder
//adding a method to the object
Constructor.prototype.update = function () {
    //this.centerX = this.drawX + (this.width / 2);
   // this.centerY = this.drawY + (this.height / 2);
     	
    ctxEntities.drawImage(imgSprite,xpos,ypos,this.width, this.height,this.drawX, this.drawY,this.width, this.height);
   //this.checkDirection();
};
//c.drawImage(image, xpos, ypos, frameSize, frameSize, 0, 0, frameSize, frameSize);
Constructor.prototype.draw = function () {
	//ctxEntities.drawImage(imgSprite, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, this.width, this.height);
	
   ctxEntities.drawImage(imgSprite,xpos,ypos,this.width, this.height,this.drawX, this.drawY,this.width, this.height);
};


//change 2 to numMiners_player after u figure out how to keep track of the variable numMiners_player
function initConstructor() {
    for (var i = 0; i < numberOfBuilders; i++) {
       Constructor_player_array[Constructor_player_array.length] = new Constructor();
    }
}




function updateAllConstructor() {
    for (var i = 0; i < Constructor_player_array.length; i++) {
        Constructor_player_array[i].update();
    }
}

function drawAllConstructor() {
    for (var i = 0; i < Constructor_player_array.length; i++) {
        Constructor_player_array[i].draw();
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
//function newGame(winningHeight, minerCost, builderCost) {
	// set winning height
	//var gameVars = new GameVars(winningHeight, minerCost, builderCost);
	
	// player and computer start with 1 miner each
	//var player = new PlayerVars(0, 0, 1, 0);
	//var computer = new PlayerVars(0, 0, 1, 0);
//}

/* Load Existing Game */
// function loadGame(filename) //perhaps a game ID randomly generated by saveGame() should be passed to the function since we are saving to a db
// need code for this : Manhing, do you want to take this one since it's loading
// from the database?
// Yes, I'll take this. Do you think a saveGame function would be in this file as well?-Manhing

/* requirements:
	number and positions of each unit on map
	health of each unit?
	diamond(?) count for each player
	score (height of towers)
	whether unit was in action?
	game ID(?)
*/

/* Save Current Game */
// function saveGame(filename)

/* requirements:
	number and positions of each unit on map
	health of each unit?
	diamond(?) count for each player
	score (height of towers)
	randomly generate game ID?
	save whether unit was in action?
*/