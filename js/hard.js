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
	//we will start with 1 destructor
		enemy = false,
	destructor = new Destructor(),
	
	enemydestructor = new EnemyDestructor(),

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
	enemy2,
	//so we will not go with the height, but instead with the number
	//of bricks in the building
	//this is not critical for the EASY level, but for the HARD level, where destructors
	//will be able to destruct the buildings - bricks- this is necessary.
	//we need to get to 50 bricks
	nuber_of_bricks_building_player = 1,
	brick_array_player = [],
	//the game is not playing
	isPlaying = false,
	numberOfEnemyMiners =1,
	//Enemy_Miners_array =[],
	Miners_enemy_array =[],
	//we will add a function for the player to buy more baseballs
	numbaseballs = 20,

	//variables to animates the frame, checks different browsers
	//https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
    requestAnimFrame =  window.requestAnimationFrame ||
                        window.webkitRequestAnimationFrame ||
                        window.mozRequestAnimationFrame ||
                        window.oRequestAnimationFrame ||
                        window.msRequestAnimationFrame ||
                        function(callback) {
                            window.setTimeout(callback, 10000 / 60);
                        },	
			
	imgSprite	= new Image();
	//location of the image 
	imgSprite.src = "images/canvas.png";
	//we are listening for the image to load
	//and then we call the finction initializer
	imgSprite.addEventListener("load", init, false);
	
	
	
function init(){
	//for more infomration about even listener see http://stackoverflow.com/questions/17513317/use-of-addeventlistener-in-js
	document.addEventListener("keydown", function(e) {keyPressed(e, true);}, false);
    document.addEventListener("keyup", function(e) {keyPressed(e, false);}, false);
    initMiners();//
	//initEnemyMiners();
	initConstructor();
	initBricks();
	//definePlayerMine();
	begin();
	//setTimeout(collectDiamons, 600);
	
}	

// the most convenient keys to use are left, right, up, down and spacebar
//http://www.w3schools.com/jsref/event_key_keycode.asp
//https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
function keyPressed(e, value) {
    var keyID = e.keyCode || e.which;
    if (keyID === 38) { // Up arrow see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
        destructor.isUpKey = value;
        e.preventDefault();
    }
    if (keyID === 39) { // Right arrow https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
       destructor.isRightKey = value;
        e.preventDefault();
    }
    if (keyID === 40) { // Down arrow https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
        destructor.isDownKey = value;
        e.preventDefault();
    }
    if (keyID === 37) { // Left arrow https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
        destructor.isLeftKey = value;
        e.preventDefault();
    }
    if (keyID === 32) { // Spacebar https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
        destructor.isSpacebar = value;
        e.preventDefault();
    }
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
	requestAnimFrame(loopdiamonds);
}


function update() {
	
    clearCtx(ctxEntities);
    updateAllMiners();
	updateAllConstructor();
	updateBricks();
    playerMine1.update();
	destructor.update();
	//updateAllEnemyMiners();
	
	//collectDiamons();
	//setTimeout(collectDiamons, 600);
	//runCollectDimanons();
	enemydestructor .update();
	if(!enemy){
		enemy2 = new EnemyDestructor();
		enemy = true;
	}

}

function draw() {
   drawAllMiners();
   drawAllConstructor();
   drawAllBricks();
   playerMine1.draw();
   destructor.draw();
   enemydestructor.draw();
   //drawAllEnemyMiners();
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
		requestAnimFrame(loopdiamonds);
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

/*
	//var Xa, Ya;
//lets define a building block of the building
//Xa and Ya are the coordinates on the canvas where the brick will be drawn

function Brick(Xa, Ya) {
	this.srcX = 179;
    this.srcY = 679;
    this.width = 40;
    this.height = 23;
	this.drawX = Xa;
	this.drawY = Ya;
}

//function to add bricks

function initBricks() {
    for (var i = 0; i < nuber_of_bricks_building_player; i++) {
       brick_array_player[brick_array_player.length] = new Brick(29, 546);
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

//at the begining of the game we do not have any bricks, so we do not need to initialize brick array
function initBricks() {
    for (var i = 0; i < nuber_of_bricks_building_player; i++) {
        brick_array_player[brick_array_player.length] = new Brick();
    }
}

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
    this.srcX = 13;
    this.srcY = 599;
    this.width = 355;
    this.height = 227;
    this.drawX = 5;
    this.drawY = 5;
    this.centerX = this.drawX + (this.width / 2);
    this.centerY = this.drawY + (this.height / 2);

}

Mine.prototype.update = function () {
    this.centerX = this.drawX + (this.width / 2);
    this.centerY = this.drawY + (this.height / 2);
};

Mine.prototype.draw = function () {
    //this.drawAllbaseballs();
    ctxEntities.drawImage(imgSprite, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, this.width, this.height);
};


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
	this.srcX = 5;
    this.srcY = 851;
    this.width = 72;
    this.height = 117;
    //this.drawX = 400;
    //this.drawY = 400;
    this.drawX = randomRange(0, canvasWidth - this.width);
    this.drawY = randomRange(0, canvasHeight - this.height);
	var that = this;
	this.moveInterval = setInterval(function() {that.loop_miner();}, 200);
	
 
}
        var xpos=5, 
            ypos=851, 
            index=0, 
            numFrames = 2, 
            frameSize= 72;
//function to loop through the sprite sheet for miner
 Miners.prototype.loop_miner = function() {
            //clear the canvas!
            //ctxEntities.clearRect(0,0, canvasHeight,canvasWidth);

            ctxEntities.drawImage(imgSprite,xpos,ypos,this.width, this.height,this.drawX, this.drawY,this.width, this.height);
            
            //each time around we add the frame size to our xpos, moving along the source image
            xpos += frameSize;
            //increase the index so we know which frame of our animation we are currently on
            index += 1;
            
            //if our index is higher than our total number of frames, we're at the end and better start over
            if (index >= numFrames) {
                xpos =5;
                ypos =851;
                index=0;    
            //if we've gotten to the limit of our source image's width, we need to move down one row of frames                
            } //else if (xpos + frameSize > imgSprite.width){
               // xpos =147;
                //ypos += frameSize;
           // }
            
            
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
	this.srcX = 179;
    this.srcY = 679;
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
	setTimeout(collectDiamons, 600000);
};

//CONSTRUCTORS
//NEED TO CHANGE IMAGE FOR THE BUILDER--ok done
function Constructor() {
	this.srcX = 306;
    this.srcY = 853;
    this.width = 77;
    this.height = 113;
    this.drawX = randomRange(0, canvasWidth - this.width);
    this.drawY = randomRange(0, canvasHeight - this.height);
	var that = this;
	this.moveInterval = setInterval(function() {that.loop_constructor();}, 200);
	
 
}
            var xpos1=306, 
            ypos1=853, 
            index1=77, 
            numFrames1 = 2, 
            frameSize1= 77;
//function to loop through the sprite sheet for miner
Constructor.prototype.loop_constructor = function() {
            //clear the canvas!
            //ctxEntities.clearRect(0,0, canvasHeight,canvasWidth);

            ctxEntities.drawImage(imgSprite,xpos1,ypos1,this.width, this.height,this.drawX, this.drawY,this.width, this.height);
            
            //each time around we add the frame size to our xpos, moving along the source imagebc
            //each time around we add the frame size to our xpos, moving along the source image
            xpos1 += frameSize1;
            //increase the index so we know which frame of our animation we are currently on
            index1 += 1;
            
            //if our index is higher than our total number of frames, we're at the end and better start over
            if (index1 >= numFrames1) {
                xpos1 =306;
                ypos1 =853;
                index1=0;    
            //if we've gotten to the limit of our source image's width, we need to move down one row of frames                
            }// else if (xpos1 + frameSize1 > imgSprite.width){
                //xpos1 =1;
                //ypos1 += frameSize1;
            //}
            
            
        }

//create prototype of the builder
//adding a method to the object
Constructor.prototype.update = function () {
    //this.centerX = this.drawX + (this.width / 2);
   // this.centerY = this.drawY + (this.height / 2);
     	
    ctxEntities.drawImage(imgSprite,xpos1,ypos1,this.width, this.height,this.drawX, this.drawY,this.width, this.height);
   //this.checkDirection();
};
//c.drawImage(image, xpos, ypos, frameSize, frameSize, 0, 0, frameSize, frameSize);
Constructor.prototype.draw = function () {
	//ctxEntities.drawImage(imgSprite, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, this.width, this.height);
	
   ctxEntities.drawImage(imgSprite,xpos1,ypos1,this.width, this.height,this.drawX, this.drawY,this.width, this.height);
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



function baseball() {
    this.radius = 2;
    this.width = this.radius * 2;
    this.height = this.radius * 2;
    this.drawX = 0;
    this.drawY = 0;
    this.isFlying = false;
    this.xVel = 0;
    this.yVel = 0;
    this.speed = 6;
}

baseball.prototype.update = function () {
    this.drawX += this.xVel;
    this.drawY += this.yVel;
    this.checkHitEnemy();
    //this.checkHitObstacle();
    //this.checkOutOfBounds();
};

baseball.prototype.draw = function () {
    ctxEntities.fillStyle = "yellow";
    ctxEntities.beginPath();
    ctxEntities.arc(this.drawX, this.drawY, this.radius, 0, Math.PI * 2, false);
    ctxEntities.closePath();
    ctxEntities.fill();
};

baseball.prototype.fire = function (startX, startY) {
    this.drawX = startX;
    this.drawY = startY;
	if (destructor.srcX === 292) { // Facing west
        this.xVel = -this.speed;
        this.yVel = 0;
    } else if (destructor.srcX === 3) { // Facing east
        this.xVel = this.speed;
        this.yVel = 0;
    }
    this.isFlying = true;
};

baseball.prototype.recycle = function () {
    this.isFlying = false;
};

baseball.prototype.checkHitEnemy = function () {
    //for (var i = 0; i < Miners_enemy_array.length; i++) {
        if (collision(this, enemy2) && !enemy2.isDead) {
          this.recycle();
           enemy2.die();
        }
    //}
};

baseball.prototype.checkHitObstacle = function () {
    for (var i = 0; i < obstacles.length; i++) {
        if (collision(this, obstacles[i])) {
            this.recycle();
        }
    }
};

baseball.prototype.checkOutOfBounds = function () {
    if (outOfBounds(this, this.drawX, this.drawY)) {
        this.recycle();
    }
};
	





//lets do a destructor for the player - ill start with 1

//now lets make enemies
//lets do a destructor for the player - ill start with 1
function Destructor() {

    this.srcX = 3;
    this.srcY = 992;
    this.width = 87;
    this.height = 118;
	//original location where to place the destructor
    this.drawX = 400
    this.drawY = 200
	
    this.centerX = this.drawX + (this.width / 2);
    this.centerY = this.drawY + (this.height / 2);
	this.speed = 2;
	
    this.isUpKey = false;
    this.isRightKey = false;
    this.isDownKey = false;
    this.isLeftKey = false;
    this.isSpacebar = false;
    this.isHitting = false;
	this.moveImage;
	this.that;
	var numbaseballs = 1000;
    this.baseballs = [];
    this.currentbaseball = 0;
    for (var i = 0; i < numbaseballs; i++) {
        this.baseballs[this.baseballs.length] = new baseball();
    }

}

Destructor.prototype.draw = function () {
	this.drawAllbaseballs();

    ctxEntities.drawImage(imgSprite, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, this.width, this.height);
};

Destructor.prototype.update = function () {
    this.centerX = this.drawX + (this.width / 2);
    this.centerY = this.drawY + (this.height / 2);
    this.checkDirection();
	this.checkHitting();
	//this.checkHitting();
	this.updateAllbaseballs();

};

Destructor.prototype.checkDirection = function () {
    var newDrawX = this.drawX,
        newDrawY = this.drawY;
    if (this.isUpKey) {
        newDrawY -= this.speed;
    } else if (this.isDownKey) {
        newDrawY += this.speed;
    } else if (this.isRightKey) {
        newDrawX += this.speed;
        this.srcX = 3; // Facing east image
    } else if (this.isLeftKey) {
        newDrawX -= this.speed;
        this.srcX = 292; // Facing west image
    }
	//now draw this new positon
	    this.drawX = newDrawX;
        this.drawY = newDrawY;
};

           var xpos4=0, 
            ypos4=992, 
            index4=0, 
            numFrames4 = 2, 
            frameSize4= 87;
Destructor.prototype.checkHitting = function () {
	var newX = this.srcX;
	//var newX2 = this.srcX;
	var oldX;
    if (this.isSpacebar && !this.isHitting) {
        this.isHitting = true;
		this.baseballs[this.currentbaseball].fire(this.centerX, this.centerY);
        this.currentbaseball++;
        if (this.currentbaseball >= this.baseballs.length) {
            this.currentbaseball = 0;
        }
	//now we need do change the image of the destructor to animate the hitting
	newX = 87;
	this.srcX = newX;
	//newX = 0;
	//this.srcX = newX2;

    } else if (!this.isSpacebar) {
        this.isHitting = false;

    }
	//here I am trying to go back to the original image, but it does not go there
		oldX = 0;
		oldX= this.srcX;
		this.srcX = oldX;
};




Destructor.prototype.updateAllbaseballs = function () {
    for (var i = 0; i < this.baseballs.length; i++) {
        if (this.baseballs[i].isFlying) {
            this.baseballs[i].update();
        }
    }
};

Destructor.prototype.drawAllbaseballs = function () {
    for (var i = 0; i < this.baseballs.length; i++) {
        if (this.baseballs[i].isFlying) {
            this.baseballs[i].draw();
        }
    }
};












//function to loop through the sprite sheet for the destructor, when destructor is hitting an object
           var xpos4=0, 
            ypos4=992, 
            index4=0, 
            numFrames4 = 2, 
            frameSize4= 87;
Destructor.prototype.loop_destructor_hitting= function() {
            //clear the canvas!
            //ctxEntities.clearRect(0,0, canvasHeight,canvasWidth);

            ctxEntities.drawImage(imgSprite,xpos4,ypos4,this.width, this.height,this.drawX, this.drawY,this.width, this.height);
            
            //each time around we add the frame size to our xpos, moving along the source imagebc
            //each time around we add the frame size to our xpos, moving along the source image
            xpos4 += frameSize4;
            //increase the index so we know which frame of our animation we are currently on
            index1 += 1;
            
            //if our index is higher than our total number of frames, we're at the end and better start over
            if (index4 >= numFrames4) {
                xpos4 =0;
                ypos4 =992;
                index4=0;    
            //if we've gotten to the limit of our source image's width, we need to move down one row of frames                
            }// else if (xpos1 + frameSize1 > imgSprite.width){
                //xpos1 =1;
                //ypos1 += frameSize1;
            //}
            
            
        }
		
	

	
		
//check and make sure that the enemy was detected		
//i am having some issues how with the animation, so I will try to generate a spark when the space bar is hit



//THIS CODE WILL BE FOR THE ENEMY
//now lets make enemies
//lets do a destructor for the player - ill start with 1
function EnemyDestructor() {

    this.srcX = 394;
    this.srcY = 995;
    this.width = 90;
    this.height = 115;
	//original location where to place the destructor
    this.drawX = randomRange(0, canvasWidth - this.width);
    this.drawY = randomRange(0, canvasHeight - this.height);
	this.speed = randomRange(0.1, 0.5);
	this.moving =0;
	this.dirx = 0;
	this.diry =0;
	this.isDead = false;

}


EnemyDestructor.prototype.draw = function () {
	
    ctxEntities.drawImage(imgSprite, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, this.width, this.height);

	
	};


//we want to make sure that enemy destructor is moving towards the players destructor
EnemyDestructor.prototype.update = function () {

		   if(destructor.drawX  < (this.drawX ) ) {this.dirx = -this.speed;} 
		   if(destructor.drawX  > (this.drawX) ){this.dirx = this.speed;}
			if(destructor.drawY < this.drawY){this.diry = -this.speed;}
			if(destructor.drawY > this.drawY){this.diry = this.speed;}
			this.drawX = this.drawX + this.dirx;
			this.drawY =  this.drawY + this.diry;
   
};




EnemyDestructor.prototype.die = function () {
    this.isDead = true;
	die();
};


//collision detection
function collision(object1, object2) {
    return object1.drawX <= object2.drawX + object2.width && object1.drawX >= object2.drawX &&
	object1.drawY <= object2.drawY + object2.height && object1.drawY >= object2.drawY;
}


function die(){
	//enemy2.ctxEntities =null;
	delete enemydestructor.ctxEntities;
	
}
