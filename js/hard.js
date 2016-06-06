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

//http://www.imagemagick.org/script/montage.php

//canvas variables
var canvasBg = document.getElementById("canvasBg"),
    ctxBg = canvasBg.getContext("2d"),
    canvasEntities = document.getElementById("canvasEntities"),
    ctxEntities = canvasEntities.getContext("2d"),
    canvasWidth = canvasBg.width,
    canvasHeight = canvasBg.height,
	animation2,
	now,
	then,
	delta,
	time,
	time3,
	animation,
	newbrick5,
	new_miner_enemy,
	new_builder_enemy,
	numberOfBricks_for_destruction =1,
	numberOfMiners2 =1,
	//numberOfDestructors2
	numberOfBricksEnemy_for_destruction = 1,
	time_build_enemy,
	time_build,
	enemy = false,
	destructor = new Destructor(),
	distance_destructors2,
	enemydestructor = new EnemyDestructor(),
	enemydestractorStationary = new EnemyDestructorStationary(),
	number,
	money=400,
	moneyEnemy = 400,
	money_tracking =0,
	money_tracking_old =0,
	miner,
	builder,
	new_miner,
	new_builder,
	newbrick,
	Miners_player_array = [],
	Constructor_player_array = [],
	Miners_player_array_enemy = [],
	Constructor_player_array_enemy = [],
	numMiners_player = builder,
	numberOfMiners =1,
	numberOfBuilders =1,
	numberOfBuilders2 =1,
	numberOfMinersEnemy =1,
	numberOfBuildersEnemy =1,
	numberOfBuildersEnemy2 =1,
	playerMine1 = new Mine(),
	enemymine = new MineEnemy(),
	Bricks_player_array = [],
	Bricks_player_array_enemy = [],
	numberOfBricks = 1,
	numberOfBricksEnemy = 1,
	newbrick2 = new Bricks(169,546),
	newbrickEnemy2 = new BricksEnemy((169+6*40),546),//enemies first brick
	building_height,
	building_height_enemy,
	building_width,
	innerMeterEnemy1 = new innerMeterEnemy(),
	outerMeterEnemy1 = new outerMeterEnemy(),
	innerMeterPlayer = new innerMeter(),
	outerMeterPlayer = new outerMeter(),
	nuber_of_bricks_building_player = 1,
	brick_array_player = [],
	brick_array_player_enemy = [],
	isPlaying = false,
	numberOfEnemyMiners =1,
	numberOfMinersEnemy2 = 1,
	Miners_enemy_array =[],
	distance_destructors,
	numberOfDestructors = 1;
	numberOfDestructorsEnemy = 1;
	new_miner_enemy,
	new_builder_enemy,

	//variables to animates the frame, checks different browsers
	//https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
    
	requestAnimFrame =  window.requestAnimationFrame ||
                        window.webkitRequestAnimationFrame ||
                        window.mozRequestAnimationFrame ||
                        window.oRequestAnimationFrame ||
                        window.msRequestAnimationFrame ||
                        function(callback) {
                            window.setTimeout(callback, 10000000);
                        },	
						
	imgSprite	= new Image();
	//location of the image 
	imgSprite.src = "images/combined1.png";
	//we are listening for the image to load
	//and then we call the finction initializer
	imgSprite.addEventListener("load", init, false);
	
	//this is used to cancel animation frame
	//http://notes.jetienne.com/2011/05/18/cancelRequestAnimFrame-for-paul-irish-requestAnimFrame.html
window.cancelRequestAnimFrame = ( function() {
	return window.cancelAnimationFrame          ||
		window.webkitCancelRequestAnimationFrame    ||
		window.mozCancelRequestAnimationFrame       ||
		window.oCancelRequestAnimationFrame     ||
		window.msCancelRequestAnimationFrame        ||
		clearTimeout
} )();

function init(){
	//for more infomration about even listener see http://stackoverflow.com/questions/17513317/use-of-addeventlistener-in-js
	document.addEventListener("keydown", function(e) {keyPressed(e, true);}, false);
    document.addEventListener("keyup", function(e) {keyPressed(e, false);}, false);
	Bricks_player_array.push(newbrick2);
	Bricks_player_array_enemy.push(newbrickEnemy2);
	building_height = Bricks_player_array[0].drawY;
	building_height_enemy = Bricks_player_array_enemy[0].drawY;
	building_width = 169,
    initMiners();
	initMinersEnemy();
	//initEnemyMiners();
	initConstructor();
	initConstructorEnemy();
	initBricks();
	initBricksEnemy();
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
	then = Date.now();
    animation = requestAnimFrame(loop);
	//run a collect diamond function
	//time will vary depending on the number of miners 
	updateTimeMinerBuilder();
	updateTimeMinerBuilderEnemy();
	
	//checkHittingEnemyDestructorRunning();
	
	//}
	//requestAnimFrame2(loopdiamonds);
}

function updateTimeMinerBuilder(){
	//first we need to clear old interval
	clearInterval ( collectDiamons, time );
	clearInterval ( addBrick, time_build );
	//then determine new time
		if(numberOfMiners2 == 1){
		time = 200;
	}
		if(numberOfMiners2 == 2){
		time = 100;
	}
		if(numberOfMiners2 == 3){
		time = 50;
	}
		if(numberOfMiners2 == 4){
		time = 25;
	}
		if(numberOfMiners2 == 5){
		time = 10;
	}
	
	setInterval ( collectDiamons, time ); //60000 = 60 seconds.
	

	//time to building the tower player depending how many builder the player has		if(numberOfMiners == 1){
		if(numberOfBuilders2 == 1){
		time_build = 7000;
	}
		if(numberOfBuilders2 == 2){
		time_build = 6000;
	}
		if(numberOfBuilders2 == 3){
		time_build = 5000;
	}
		if(numberOfBuilders2 == 4){
		time_build = 4000;
	}
		if(numberOfBuilders2 == 5){
		time_build = 2000;
	}


	setInterval ( addBrick, time_build ); //60000 = 60 seconds.
	//recursive function
	
}


function updateTimeMinerBuilderEnemy(){
	//first we need to clear old interval
	clearInterval ( collectDiamonsEnemy, time3  );
	clearInterval ( addBrickEnemy, time_build_enemy );

		if(numberOfMinersEnemy2 == 1){
		time3 = 200;
	}
		if(numberOfMinersEnemy2 == 2){
		time3 = 100;
	}
		if(numberOfMinersEnemy2 == 3){
		time3 = 50;
	}
		if(numberOfMinersEnemy2 == 4){
		time3 = 25;
	}
		if(numberOfMinersEnemy2 == 5){
		time3 = 10;
	}
	//we get to the overcrowdining


	setInterval ( collectDiamonsEnemy, time3 ); //60000 = 60 seconds.
	
		//time to building the tower player depending how many builder the player has		if(numberOfMiners == 1){
		if(numberOfBuildersEnemy2 == 1){
		time_build_enemy = 7000;
	}
		if(numberOfBuildersEnemy2 == 2){
		time_build_enemy= 6000;
	}
		if(numberOfBuildersEnemy2 == 3){
		time_build_enemy = 5000;
	}
		if(numberOfBuildersEnemy2 == 4){
		time_build_enemy = 4000;
	}
		if(numberOfBuildersEnemy2 == 5){
		time_build_enemy = 2000;
	}
	//we get to the overcrowdining
	if(numberOfBuildersEnemy2 == 6){
		time_build_enemy= 1000;
	}


	setInterval ( addBrickEnemy, time_build_enemy ); //60000 = 60 seconds.
}	


function update() {	
    clearCtx(ctxEntities);
    updateAllMiners();
	updateAllMinersEnemy();
	updateAllConstructor();
	updateAllConstructorEnemy();
	updateBricks();
	updateBricksEnemy();
    playerMine1.update();	
	enemymine.update();
	destructor.update();	
	enemydestructor.update();
	//enemydestractorStationary.update();
	outerMeterEnemy1.update();
	innerMeterEnemy1.update();
	outerMeterPlayer.update();
	innerMeterPlayer.update();
	AI_Money_Distribution();
}

function draw() {
   drawAllMiners();
   drawAllMinersEnemy();
   drawAllConstructor();
    drawAllConstructorEnemy();
   drawAllBricks();
   drawAllBricksEnemy();
   playerMine1.draw();
   enemymine.draw();
   destructor.draw();
   enemydestructor.draw();
   //enemydestractorStationary.draw();
   outerMeterEnemy1.draw();
   innerMeterEnemy1.draw();
   outerMeterPlayer.draw();
   innerMeterPlayer.draw();
}

//this functions updates the game, when we draw new canvas, we need to clear the old one
function loop() {
	//check and make sure that the game is playing
    if (isPlaying) {
		now = Date.now();
		delta = (now - then) / 1000; // Converts to seconds (optional)
		then = now;
		
		//distance_destructors = Math.abs(destructor.drawX - enemydestractorStationary.drawX);
		distance_destructors2 = Math.abs(destructor.drawX - enemydestructor.drawX);
		
		//if(distance_destructors < 25){enemydestractorStationary.isDead = true; enemydestructor.isDead = false; enemydestractorStationary.die();}
		//if(distance_destructors > 25 && enemydestractorStationary.wasKilled == false){enemydestructor.isDead = true; enemydestractorStationary.isDead = false; enemydestructor.birth();}
		//if(destructor.isDead == true && distance_destructors > 25){enemydestructor.isDead = true; enemydestractorStationary.isDead = false; enemydestructorStartionary.birth(); enemydestructor.die();}
	    update();
        draw();
		GameIsOver();
	    animation2 = requestAnimFrame(loop);
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



	
//THIS WILL DRAW MINE FOR THE PlayerDestructor
//WE SHOULD CHANGE THE IMAGE
//*******************************************************************************************************
function Mine() {
    this.srcX = 803;
    this.srcY = 0;
    this.width = 94;
    this.height = 601;
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

//enemies mine
function MineEnemy() {
    this.srcX = 803;
    this.srcY = 0;
    this.width = 94;
    this.height = 601;
    this.drawX = 706;
    this.drawY = 5;
    this.centerX = this.drawX + (this.width / 2);
    this.centerY = this.drawY + (this.height / 2);

}

MineEnemy.prototype.update = function () {
    this.centerX = this.drawX + (this.width / 2);
    this.centerY = this.drawY + (this.height / 2);
};

MineEnemy.prototype.draw = function () {
    //this.drawAllbaseballs();
    ctxEntities.drawImage(imgSprite, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, this.width, this.height);
};


//https://github.com/search?q=Gold+Miner+-+HTML5+Game&type=Code&utf8=%E2%9C%93
//I am making an assuption that miner costs 100 units 
function buyMiner(number){
	if (numberOfMiners2 < 5) {
	if (money - 100 < 0) {
		// placeholder error, fix to display error in game
		alert("Not enough money to buy another minder! You need to have 100 diamonds.");
	}
	else{
	if (numberOfMiners < 5){
		// update money and miner count
		money = money - 100;
		numberOfMiners = numberOfMiners + number;
		numberOfMiners2 = numberOfMiners2 + number;
		//Miners_player_array
		new_miner = new Miners();
		//data.push({})??
		Miners_player_array.push(new_miner);
		//call update function to take into concideration new miner
		updateTimeMinerBuilder();
	}

		
	else if (numberOfMiners == 5 && (Miners_player_array[0].isDead == true)){
		money = money - 100;
		Miners_player_array[0].birth();
		numberOfMiners2 = numberOfMiners2 + number;
		//break;
	} 
	else if (numberOfMiners == 5 && (Miners_player_array[1].isDead ==true)&& numberOfMiners2 < 5){
		money = money - 100;
		Miners_player_array[1].birth();
		numberOfMiners2 = numberOfMiners2 + number;
		//break;
	} 	
	 else if (numberOfMiners == 5 && (Miners_player_array[2].isDead == true)&& numberOfMiners2 < 5){
		money = money - 100;
		Miners_player_array[2].birth();
		numberOfMiners2 = numberOfMiners2 + number;
		//break;
	} 
	else if (numberOfMiners == 5 && (Miners_player_array[3].isDead == true)&& numberOfMiners2 < 5){
		money = money - 100;
		Miners_player_array[3].birth();
		numberOfMiners2 = numberOfMiners2 + number;
		//break;
	}
	 else if (numberOfMiners == 5 && (Miners_player_array[4].isDead == true)&& numberOfMiners2 < 5){
		money = money - 100;
		Miners_player_array[4].birth();
		numberOfMiners2 = numberOfMiners2 + number;
		//break;
	}
	else if (numberOfMiners2 > 5){ alert("You can have only 5 miners")}
    }
	
	}	
	
	//miner = miner + number;
	document.getElementById("miner").innerHTML = numberOfMiners2;
	document.getElementById("money").innerHTML = money;
}




function buyBuilder(number){
	if (numberOfBuilders2 < 5) {
	if (money - 100 < 0) {
		// placeholder error, fix to display error in game
		alert("Not enough money to buy another minder! You need to have 100 diamonds.");
	}
	else{
	if (numberOfBuilders < 5){
		// update money and miner count
		money = money - 100;
		numberOfBuilders = numberOfBuilders + number;
		numberOfBuilders2 = numberOfBuilders2 + number;
		new_builder = new Constructor();
		//add new  builder to the array - will be used for drawing
		//??
		Constructor_player_array.push(new_builder);
		updateTimeMinerBuilder();
	}

		
	else if (numberOfBuilders == 5 && (Constructor_player_array[0].isDead == true)){
		money = money - 100;
		Constructor_player_array[0].birth();
		numberOfBuilders2 = numberOfBuilders2 + number;
		//break;
	} 
	else if (numberOfBuilders == 5 && (Constructor_player_array[1].isDead ==true)&& numberOfBuilders2 < 5){
		money = money - 100;
		Constructor_player_array[1].birth();
		numberOfBuilders2 = numberOfBuilders2 + number;
		//break;
	} 	
	 else if (numberOfBuilders == 5 && (Constructor_player_array[2].isDead == true)&& numberOfBuilders2 < 5){
		money = money - 100;
		Constructor_player_array[2].birth();
		numberOfBuilders2 = numberOfBuilders2 + number;
		//break;
	} 
	else if (numberOfBuilders == 5 && (Constructor_player_array[3].isDead == true)&& numberOfBuilders2 < 5){
		money = money - 100;
		Constructor_player_array[3].birth();
		numberOfBuilders2 =numberOfBuilders2 + number;
		//break;
	}
	 else if (numberOfBuilders == 5 && (Constructor_player_array[4].isDead == true)&& numberOfBuilders2 < 5){
		money = money - 100;
		Constructor_player_array[4].birth();
		numberOfBuilders2 = numberOfBuilders2 + number;
		//break;
	}
	else if (numberOfBuilders2 > 5){ alert("You can have only 5 builders")}
    }
	
	}	
	
	//miner = miner + number;
	document.getElementById("builder").innerHTML = numberOfBuilders2;
	document.getElementById("money").innerHTML = money;
}


function buyDestructor(number){
	if (numberOfDestructors == 1 ){ alert("You can have only 1 destructor!");}
	if (numberOfDestructors < 1 ){
	if (money - 200 < 0) {
		// placeholder error, fix to display error in game
		alert("You do not have enough money to buy a destructor! You need 200 diamonds.");
	}
	else {
		// update money and miner count
		money = money - 200;
		numberOfDestructors = numberOfDestructors + number;
		destructor.birth();
		innerMeterPlayer.regenerate();
		//destructor.isDead == false;
		destructor.birth();
		
		
	}
}
	else{}
	//miner = miner + number;
	document.getElementById("destructor").innerHTML = numberOfDestructors;
	document.getElementById("money").innerHTML = money;
}


//function that will draw miners on the canvas
//http://stackoverflow.com/questions/26446284/unexpected-token-this-while-creating-method-inside-object
//to find postions of the image on the sprite file, use http://getspritexy.com/
//the problem is that the backgrount of the sprite is not transparrent
//http://stackoverflow.com/questions/13244458/android-how-to-make-the-background-of-a-sprite-transparent
//http://forums.getpaint.net/index.php?/topic/12196-making-backgrounds-of-images-transparent/
//http://jsfiddle.net/ejTCy/7/

function EnemyMiners() {
	this.srcX = 5;
    this.srcY = 1135;
    this.width = 72;
    this.height = 117;
	this.isDead = false;
    //this.drawX = 400;
    //this.drawY = 400;
	if (numberOfMinersEnemy == 1){
		this.drawX = 790 - 2*this.width; 
		this.drawY = 0;  
	}
	if (numberOfMinersEnemy == 2){
		this.drawX = 792 - 2*this.width; 
		this.drawY = this.height;  
	}
		if (numberOfMinersEnemy == 3){
	this.drawX = 792 - 2*this.width; 
    this.drawY = 2*this.height;
	}
		if (numberOfMinersEnemy == 4){
	this.drawX = 792 - 2*this.width;  
    this.drawY = 3* this.height;
	}
		if (numberOfMinersEnemy == 5){
	this.drawX = 792 - 2*this.width;  
    this.drawY = 4* this.height;  
	}
		if (numberOfMinersEnemy== 6){
	this.drawX = 792 - 2*this.width;  
    this.drawY = 5* this.height; 
	}
	
	if(this.isDead == false){
	        this.xpos6=5, 
            this.ypos6=1135, 
            this.index6=0, 
            this.numFrames6 = 2, 
            this.frameSize6= 72;
	}

	var that = this;
	this.moveInterval = setInterval(function() {that.loop_miner_enemy();}, 200);
	
 
}

 EnemyMiners.prototype.die = function () {
	this.isDead = true;
    this.srcX = 690;
	this.srcY = 1128;
	this.height = 108;
	this.xpos6=690, 
    this.ypos6=1128, 
    this.index6=0, 
    this.numFrames6 = 2, 
    this.frameSize6= 0;
};	
	
 EnemyMiners.prototype.birth = function () {
	this.isDead = false;
	this.xpos6=5, 
    this.ypos6=1135, 
    this.index6=0, 
    this.numFrames6 = 2, 
    this.frameSize6= 72;
	this.height = 117;	
};	
	
		

//function to loop through the sprite sheet for miner
 EnemyMiners.prototype.loop_miner_enemy = function() {
            //clear the canvas!
            //ctxEntities.clearRect(0,0, canvasHeight,canvasWidth);

            ctxEntities.drawImage(imgSprite,this.xpos6,this.ypos6,this.width, this.height,this.drawX, this.drawY,this.width, this.height);
            
            //each time around we add the frame size to our xpos, moving along the source image
            this.xpos6 += this.frameSize6;
            //increase the index so we know which frame of our animation we are currently on
            this.index6 += 1;
            
            //if our index is higher than our total number of frames, we're at the end and better start over
            if (this.index6 >= this.numFrames6) {
				if(this.isDead == false){
                this.xpos6 =5;
                this.ypos6 =1135;
                this.index6=0;    
				}
			if(this.isDead == true){
                this.xpos6 =690;
                this.ypos6 =1128;
                this.index6=0;    
			}
            //if we've gotten to the limit of our source image's width, we need to move down one row of frames                
            } //else if (xpos + frameSize > imgSprite.width){
               // xpos =147;
                //ypos += frameSize;
           // }
            
            
        }

//create prototype of the builder
//adding a method to the object
EnemyMiners.prototype.update = function () {
    ctxEntities.drawImage(imgSprite,this.xpos6,this.ypos6,this.width, this.height,this.drawX, this.drawY,this.width, this.height);
};
//c.drawImage(image, xpos, ypos, frameSize, frameSize, 0, 0, frameSize, frameSize);
EnemyMiners.prototype.draw = function () {
	//ctxEntities.drawImage(imgSprite, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, this.width, this.height);
	
   ctxEntities.drawImage(imgSprite,this.xpos6,this.ypos6,this.width, this.height,this.drawX, this.drawY,this.width, this.height);
};


//change 2 to numMiners_player after u figure out how to keep track of the variable numMiners_player
function initMinersEnemy() {
    for (var i = 0; i < numberOfMinersEnemy; i++) {
        Miners_player_array_enemy[Miners_player_array_enemy.length] = new EnemyMiners();
    }
}


function updateAllMinersEnemy() {
    for (var i = 0; i < Miners_player_array_enemy.length; i++) {
        Miners_player_array_enemy[i].update();
    }
}

function drawAllMinersEnemy() {
    for (var i = 0; i < Miners_player_array_enemy.length; i++) {
        Miners_player_array_enemy[i].draw();
    }
}



function Miners() {
	this.srcX = 155;
    this.srcY = 851;
    this.width = 72;
    this.height = 117;
	this.isDead = false;
    //this.drawX = 400;
    //this.drawY = 400;
	if (numberOfMiners == 1){
		this.drawX = playerMine1.width; 
		this.drawY = 0;  
	}
	if (numberOfMiners == 2){
		this.drawX = playerMine1.width; 
		this.drawY = this.height;  
	}
		if (numberOfMiners == 3){
	this.drawX = playerMine1.width; 
    this.drawY = 2*this.height;
	}
		if (numberOfMiners == 4){
	this.drawX = playerMine1.width; 
    this.drawY = 3* this.height;
	}
		if (numberOfMiners == 5){
	this.drawX = playerMine1.width; 
    this.drawY = 4* this.height;  
	}
		if (numberOfMiners == 6){
	this.drawX = playerMine1.width; 
    this.drawY = 5* this.height; 
	}
	if(this.isDead == false){
	  this.xpos=157, 
            this.ypos=851, 
            this.index=0, 
            this.numFrames = 2, 
            this.frameSize= 72;
	}
	var that = this;
	this.moveInterval = setInterval(function() {that.loop_miner();}, 200);
	
 
}

 Miners.prototype.die = function () {
	this.isDead = true;
    this.srcX = 690;
	this.srcY = 1128;
	this.height = 108;
	this.xpos=690, 
    this.ypos=1128, 
    this.index=0, 
    this.numFrames = 2, 
    this.frameSize= 0;
};	
	

 Miners.prototype.birth = function () {
	this.isDead = false;
    this.xpos=157, 
	this.ypos=851, 
	this.height = 117;
	this.index=0;
};	
	
	


      //function to loop through the sprite sheet for miner
 Miners.prototype.loop_miner = function() {
            //clear the canvas!
            //ctxEntities.clearRect(0,0, canvasHeight,canvasWidth);

            ctxEntities.drawImage(imgSprite,this.xpos,this.ypos,this.width, this.height,this.drawX, this.drawY,this.width, this.height);
            
            //each time around we add the frame size to our xpos, moving along the source image
            this.xpos += this.frameSize;
            //increase the index so we know which frame of our animation we are currently on
            this.index += 1;
            
            //if our index is higher than our total number of frames, we're at the end and better start over
            if (this.index >= this.numFrames) {
				if(this.isDead == false){
                this.xpos =157;
                this.ypos =851;
                this.index=0;    
				}
				if (this.isDead == true){
						this.xpos=690;
					this.ypos=1128;
					this.index=0; 
					
				}
            //if we've gotten to the limit of our source image's width, we need to move down one row of frames                
            } 
      
            
            
        }

//create prototype of the builder
//adding a method to the object
Miners.prototype.update = function () {
    ctxEntities.drawImage(imgSprite,this.xpos,this.ypos,this.width, this.height,this.drawX, this.drawY,this.width, this.height);
};
//c.drawImage(image, xpos, ypos, frameSize, frameSize, 0, 0, frameSize, frameSize);
Miners.prototype.draw = function () {
	//ctxEntities.drawImage(imgSprite, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, this.width, this.height);
	
   ctxEntities.drawImage(imgSprite,this.xpos,this.ypos,this.width, this.height,this.drawX, this.drawY,this.width, this.height);
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
	this.srcX = 1530;
    this.srcY = 356;
    this.width = 40;
    this.height = 23;
    //this.drawX = 9;
    //this.drawY = 546;
	this.drawX = Xa1;
	this.drawY = Ya1;
	this.isDead = false;

}
        
Bricks.prototype.die = function () {
	this.isDead = true;
    this.srcX = 690;
	this.srcY = 1128;
	
	//this.height = 108;
};	

	
Bricks.prototype.alive = function () {
	this.isDead = false;
    this.srcX = 1530;
	this.srcY = 356;
	
	//this.height = 108;
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
       Bricks_player_array[Bricks_player_array.length] = new Bricks();
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
	if(numberOfBuilders2 > 0){
	addBrickToArray();
	if (numberOfBricks< 45){
		//if (numberOfBricks == 1) {newbrick = new Bricks(49,546); Bricks_player_array.push(newbrick);}
		
		numberOfBricks = numberOfBricks +1;
		numberOfBricks_for_destruction = numberOfBricks_for_destruction+ 1;
	}
	else{
		numberOfBricks = 45;
		//numberOfBricks_for_destruction = 45;
	}
	}
	else{}
	document.getElementById("player_height").innerHTML = numberOfBricks_for_destruction;
}



function BricksEnemy(Xa1, Ya1) {
	this.srcX = 1530;
    this.srcY = 356;
    this.width = 40;
    this.height = 23;
	this.isDead = false;
	this.drawX = Xa1;
	this.drawY = Ya1;
	

}
   
BricksEnemy.prototype.die = function () {
	this.isDead = true;
    this.srcX = 690;
	this.srcY = 1128;
	
	//this.height = 108;
};	
	   

//create prototype of the builder
//adding a method to the object
BricksEnemy.prototype.update = function () {
    ctxEntities.drawImage(imgSprite,this.srcX,this.srcY,this.width, this.height,this.drawX, this.drawY,this.width, this.height);
};
//c.drawImage(image, xpos, ypos, frameSize, frameSize, 0, 0, frameSize, frameSize);
BricksEnemy.prototype.draw = function () {
	//ctxEntities.drawImage(imgSprite, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, this.width, this.height);
	
   ctxEntities.drawImage(imgSprite,this.srcX,this.srcY,this.width, this.height,this.drawX, this.drawY,this.width, this.height);
};


//lets start with 1 brick for the user
function initBricksEnemy() {
    for (var i = 0; i < numberOfBricksEnemy; i++) {
       Bricks_player_array_enemy[Bricks_player_array_enemy.length] = new BricksEnemy();
    }
}


function updateBricksEnemy() {
    for (var i = 0; i < Bricks_player_array_enemy.length; i++) {
        Bricks_player_array_enemy[i].update();
    }
}

function drawAllBricksEnemy() {
    for (var i = 0; i < Bricks_player_array_enemy.length; i++) {
        Bricks_player_array_enemy[i].draw();
    }
}


function addBrickEnemy(){
	if(numberOfBuildersEnemy2 > 0){
		addBrickToArrayEnemy();
	if (numberOfBricksEnemy< 45){
		//if (numberOfBricks == 1) {newbrick = new Bricks(49,546); Bricks_player_array.push(newbrick);}
		//if(numberOfBuilders2 > 0){
		
		numberOfBricksEnemy = numberOfBricksEnemy +1;
		numberOfBricksEnemy_for_destruction = numberOfBricksEnemy_for_destruction+ 1;
		//}
		//else{}
	}
	else{
		numberOfBricksEnemy = 45;
	}
	}
	else{}
	document.getElementById("enemy_height").innerHTML = numberOfBricksEnemy_for_destruction;
	
}

/*
function addBrick(){
	if(numberOfBuilders2 > 0){
	addBrickToArray();
	if (numberOfBricks< 45){
		//if (numberOfBricks == 1) {newbrick = new Bricks(49,546); Bricks_player_array.push(newbrick);}
		
		numberOfBricks = numberOfBricks +1;
		numberOfBricks_for_destruction = numberOfBricks_for_destruction+ 1;
	}
	else{
		numberOfBricks = 45;
		//numberOfBricks_for_destruction = 45;
	}
	}
	else{}
	document.getElementById("player_height").innerHTML = numberOfBricks_for_destruction;
}

*/











function addBrickToArray(){
	
		var newbrick2;
		//if(numberOfBuilders2 > 0){
			//for (var i = 0; i < Bricks_player_array.length; i++) {
				//if (Bricks_player_array[i].isDead == true){
					//Bricks_player_array[i].isDead =false;
					//Bricks_player_array[i].alive();
					//numberOfBricks_for_destruction = numberOfBricks_for_destruction +1;
					
				//}
			//}
		if(numberOfBricks == 45){
			if (Bricks_player_array[0].isDead == true){
				Bricks_player_array[0].isDead =false;
				Bricks_player_array[0].alive();
				numberOfBricks_for_destruction = numberOfBricks_for_destruction +1;
			}
			else if (Bricks_player_array[1].isDead == true){
				Bricks_player_array[1].isDead =false;
				Bricks_player_array[1].alive();
				numberOfBricks_for_destruction = numberOfBricks_for_destruction +1;
			}
			else if(Bricks_player_array[2].isDead == true){
				Bricks_player_array[2].isDead =false;
				Bricks_player_array[2].alive();
				numberOfBricks_for_destruction = numberOfBricks_for_destruction +1;
			}
			else if (Bricks_player_array[3].isDead == true){
				Bricks_player_array[3].isDead =false;
				Bricks_player_array[3].alive();
				numberOfBricks_for_destruction = numberOfBricks_for_destruction +1;
			}
			else if (Bricks_player_array[4].isDead == true){
				Bricks_player_array[4].isDead =false;
				Bricks_player_array[4].alive();
				numberOfBricks_for_destruction = numberOfBricks_for_destruction +1;
			}
			else if (Bricks_player_array[5].isDead == true){
				Bricks_player_array[5].isDead =false;
				Bricks_player_array[5].alive();
				numberOfBricks_for_destruction = numberOfBricks_for_destruction +1;
			}			
			else if(Bricks_player_array[6].isDead == true){
				Bricks_player_array[6].isDead =false;
				Bricks_player_array[6].alive();
				numberOfBricks_for_destruction = numberOfBricks_for_destruction +1;
			}
			else if (Bricks_player_array[7].isDead == true){
				Bricks_player_array[7].isDead =false;
				Bricks_player_array[7].alive();
				numberOfBricks_for_destruction = numberOfBricks_for_destruction +1;
			}
			else if(Bricks_player_array[8].isDead == true){
				Bricks_player_array[8].isDead =false;
				Bricks_player_array[8].alive();
				numberOfBricks_for_destruction = numberOfBricks_for_destruction +1;
			}
			else if(Bricks_player_array[9].isDead == true){
				Bricks_player_array[9].isDead =false;
				Bricks_player_array[9].alive();
				numberOfBricks_for_destruction = numberOfBricks_for_destruction +1;
			}
			else if(Bricks_player_array[10].isDead == true){
				Bricks_player_array[10].isDead =false;
				Bricks_player_array[10].alive();
				numberOfBricks_for_destruction = numberOfBricks_for_destruction +1;
			}
			else if (Bricks_player_array[11].isDead == true){
				Bricks_player_array[11].isDead =false;
				Bricks_player_array[11].alive();
				numberOfBricks_for_destruction = numberOfBricks_for_destruction +1;
			}
			else if (Bricks_player_array[12].isDead == true){
				Bricks_player_array[12].isDead =false;
				Bricks_player_array[12].alive();
				numberOfBricks_for_destruction = numberOfBricks_for_destruction +1;
			}
			else if (Bricks_player_array[13].isDead == true){
				Bricks_player_array[13].isDead =false;
				Bricks_player_array[13].alive();
				numberOfBricks_for_destruction = numberOfBricks_for_destruction +1;
			}
			else if(Bricks_player_array[13].isDead == true){
				Bricks_player_array[13].isDead =false;
				Bricks_player_array[13].alive();
				numberOfBricks_for_destruction = numberOfBricks_for_destruction +1;
			}
			else if (Bricks_player_array[14].isDead == true){
				Bricks_player_array[14].isDead =false;
				Bricks_player_array[14].alive();
				numberOfBricks_for_destruction = numberOfBricks_for_destruction +1;
			}
			else if(Bricks_player_array[15].isDead == true){
				Bricks_player_array[15].isDead =false;
				Bricks_player_array[15].alive();
				numberOfBricks_for_destruction = numberOfBricks_for_destruction +1;
			}
			else if (Bricks_player_array[16].isDead == true){
				Bricks_player_array[16].isDead =false;
				Bricks_player_array[16].alive();
				numberOfBricks_for_destruction = numberOfBricks_for_destruction +1;
			}
		else if(Bricks_player_array[17].isDead == true){
				Bricks_player_array[17].isDead =false;
				Bricks_player_array[17].alive();
				numberOfBricks_for_destruction = numberOfBricks_for_destruction +1;
		}
					else if (Bricks_player_array[18].isDead == true){
				Bricks_player_array[18].isDead =false;
				Bricks_player_array[18].alive();
				numberOfBricks_for_destruction = numberOfBricks_for_destruction +1;
			}
			else if (Bricks_player_array[19].isDead == true){
				Bricks_player_array[19].isDead =false;
				Bricks_player_array[19].alive();
				numberOfBricks_for_destruction = numberOfBricks_for_destruction +1;
			}
			else if (Bricks_player_array[20].isDead == true){
				Bricks_player_array[20].isDead =false;
				Bricks_player_array[20].alive();
				numberOfBricks_for_destruction = numberOfBricks_for_destruction +1;
			}
			else if(Bricks_player_array[21].isDead == true){
				Bricks_player_array[21].isDead =false;
				Bricks_player_array[21].alive();
				numberOfBricks_for_destruction = numberOfBricks_for_destruction +1;
			}
			else if(Bricks_player_array[22].isDead == true){
				Bricks_player_array[22].isDead =false;
				Bricks_player_array[22].alive();
				numberOfBricks_for_destruction = numberOfBricks_for_destruction +1;
			}
			else if(Bricks_player_array[23].isDead == true){
				Bricks_player_array[23].isDead =false;
				Bricks_player_array[23].alive();
				numberOfBricks_for_destruction = numberOfBricks_for_destruction +1;
			}

			else if (Bricks_player_array[24].isDead == true){
				Bricks_player_array[24].isDead =false;
				Bricks_player_array[24].alive();
				numberOfBricks_for_destruction = numberOfBricks_for_destruction +1;
			}
			else if(Bricks_player_array[25].isDead == true){
				Bricks_player_array[25].isDead =false;
				Bricks_player_array[25].alive();
				numberOfBricks_for_destruction = numberOfBricks_for_destruction +1;
			}
			else if (Bricks_player_array[26].isDead == true){
				Bricks_player_array[26].isDead =false;
				Bricks_player_array[26].alive();
				numberOfBricks_for_destruction = numberOfBricks_for_destruction +1;
			}
			else if(Bricks_player_array[27].isDead == true){
				Bricks_player_array[27].isDead =false;
				Bricks_player_array[27].alive();
				numberOfBricks_for_destruction = numberOfBricks_for_destruction +1;
			}
			else if (Bricks_player_array[28].isDead == true){
				Bricks_player_array[28].isDead =false;
				Bricks_player_array[28].alive();
				numberOfBricks_for_destruction = numberOfBricks_for_destruction +1;
			}
			else if (Bricks_player_array[29].isDead == true){
				Bricks_player_array[29].isDead =false;
				Bricks_player_array[29].alive();
				numberOfBricks_for_destruction = numberOfBricks_for_destruction +1;
			}
			else if (Bricks_player_array[30].isDead == true){
				Bricks_player_array[30].isDead =false;
				Bricks_player_array[30].alive();
				numberOfBricks_for_destruction = numberOfBricks_for_destruction +1;
			}
			else if (Bricks_player_array[31].isDead == true){
				Bricks_player_array[31].isDead =false;
				Bricks_player_array[31].alive();
				numberOfBricks_for_destruction = numberOfBricks_for_destruction +1;
			}
			else if(Bricks_player_array[32].isDead == true){
				Bricks_player_array[32].isDead =false;
				Bricks_player_array[32].alive();
				numberOfBricks_for_destruction = numberOfBricks_for_destruction +1;
			}
			else if (Bricks_player_array[33].isDead == true){
				Bricks_player_array[33].isDead =false;
				Bricks_player_array[33].alive();
				numberOfBricks_for_destruction = numberOfBricks_for_destruction +1;
			}
			else if (Bricks_player_array[34].isDead == true){
				Bricks_player_array[34].isDead =false;
				Bricks_player_array[34].alive();
				numberOfBricks_for_destruction = numberOfBricks_for_destruction +1;
			}
			else if (Bricks_player_array[35].isDead == true){
				Bricks_player_array[35].isDead =false;
				Bricks_player_array[35].alive();
				numberOfBricks_for_destruction = numberOfBricks_for_destruction +1;
			}
			else if (Bricks_player_array[36].isDead == true){
				Bricks_player_array[36].isDead =false;
				Bricks_player_array[36].alive();
				numberOfBricks_for_destruction = numberOfBricks_for_destruction +1;
			}
			else if (Bricks_player_array[37].isDead == true){
				Bricks_player_array[37].isDead =false;
				Bricks_player_array[37].alive();
				numberOfBricks_for_destruction = numberOfBricks_for_destruction +1;
			}
			else if (Bricks_player_array[38].isDead == true){
				Bricks_player_array[38].isDead =false;
				Bricks_player_array[38].alive();
				numberOfBricks_for_destruction = numberOfBricks_for_destruction +1;
			}
			else if (Bricks_player_array[39].isDead == true){
				Bricks_player_array[39].isDead =false;
				Bricks_player_array[39].alive();
				numberOfBricks_for_destruction = numberOfBricks_for_destruction +1;
			}
			else if (Bricks_player_array[40].isDead == true){
				Bricks_player_array[40].isDead =false;
				Bricks_player_array[40].alive();
				numberOfBricks_for_destruction = numberOfBricks_for_destruction +1;
			}
			else if (Bricks_player_array[41].isDead == true){
				Bricks_player_array[41].isDead =false;
				Bricks_player_array[41].alive();
				numberOfBricks_for_destruction = numberOfBricks_for_destruction +1;
			}
			else if (Bricks_player_array[42].isDead == true){
				Bricks_player_array[42].isDead =false;
				Bricks_player_array[42].alive();
				numberOfBricks_for_destruction = numberOfBricks_for_destruction +1;
			}
			else if (Bricks_player_array[43].isDead == true){
				Bricks_player_array[43].isDead =false;
				Bricks_player_array[43].alive();
				numberOfBricks_for_destruction = numberOfBricks_for_destruction +1;
			}
			else if(Bricks_player_array[44].isDead == true){
				Bricks_player_array[44].isDead =false;
				Bricks_player_array[44].alive();
				numberOfBricks_for_destruction = numberOfBricks_for_destruction +1;
			}	
						else if(Bricks_player_array[45].isDead == true){
				Bricks_player_array[45].isDead =false;
				Bricks_player_array[45].alive();
				numberOfBricks_for_destruction = numberOfBricks_for_destruction +1;
			}
		}
				
		
	
		if (numberOfBricks == 1) {newbrick = new Bricks(209,546);}
		if (numberOfBricks == 2) { newbrick = new Bricks(249,546);}
		if (numberOfBricks == 3) {newbrick = new Bricks(289,546);}//that where we start on canvas
		if (numberOfBricks == 4) {newbrick = new Bricks(329,546);}
		if (numberOfBricks == 5) {newbrick = new Bricks(169,523);}
		if (numberOfBricks == 6) {newbrick = new Bricks(209,523);}
		if (numberOfBricks == 7) {newbrick = new Bricks(249,523);}
		if (numberOfBricks == 8) {newbrick = new Bricks(289,523);}
		if (numberOfBricks == 9) {newbrick = new Bricks(329,523);}
		if (numberOfBricks == 10) {newbrick = new Bricks(169,500);}
		if (numberOfBricks == 11) {newbrick = new Bricks(209,500);}
		if (numberOfBricks == 12) {newbrick = new Bricks(249,500);}
		if (numberOfBricks == 13) {newbrick = new Bricks(289,500);}
		if (numberOfBricks == 14) {newbrick = new Bricks(329,500);}
		if (numberOfBricks == 15) {newbrick = new Bricks(169,477);}
		if (numberOfBricks == 16) {newbrick = new Bricks(209,477);}
		if (numberOfBricks == 17) {newbrick = new Bricks(249,477);}
		if (numberOfBricks == 18) {newbrick = new Bricks(289,477);}
		if (numberOfBricks == 19) {newbrick = new Bricks(329,477);}
		if (numberOfBricks == 20) {newbrick = new Bricks(169,454);}
		if (numberOfBricks == 21) {newbrick = new Bricks(209,454);}
		if (numberOfBricks == 22) {newbrick = new Bricks(249,454);}
		if (numberOfBricks == 23) {newbrick = new Bricks(289,454);}
		if (numberOfBricks == 24) {newbrick = new Bricks(329,454);}
		if (numberOfBricks == 25) {newbrick = new Bricks(169,431);}
		if (numberOfBricks == 26) {newbrick = new Bricks(209,431);}
		if (numberOfBricks == 27) {newbrick = new Bricks(249,431);}
		if (numberOfBricks == 28) {newbrick = new Bricks(289,431);}
		if (numberOfBricks == 29) {newbrick = new Bricks(329,431);}
		if (numberOfBricks == 30) {newbrick = new Bricks(169,408);}
		if (numberOfBricks == 31) {newbrick = new Bricks(209,408);}
		if (numberOfBricks == 32) {newbrick = new Bricks(249,408);}
		if (numberOfBricks == 33) {newbrick = new Bricks(289,408);}
		if (numberOfBricks == 34) {newbrick = new Bricks(329,408);}
		if (numberOfBricks == 35) {newbrick = new Bricks(169,385);}
		if (numberOfBricks == 36) {newbrick = new Bricks(209,385);}
		if (numberOfBricks == 37) {newbrick = new Bricks(249,385);}
		if (numberOfBricks == 38) {newbrick = new Bricks(289,385);}
		if (numberOfBricks == 39) {newbrick = new Bricks(329,385);}
		if (numberOfBricks == 40) {newbrick = new Bricks(169,362);}
		if (numberOfBricks == 41) {newbrick = new Bricks(209,362);}
		if (numberOfBricks == 42) {newbrick = new Bricks(249,362);}
		if (numberOfBricks == 43) {newbrick = new Bricks(289,362);}
		if (numberOfBricks == 44) {newbrick = new Bricks(329,362);}
	
		//if (numberOfBricks == 45) {newbrick = new Bricks(49,546);}
			
		//update the position of the builders depedning on the level of the building that is build
		//newbrick = new Bricks(Xa,Ya);
		Bricks_player_array.push(newbrick);
		if(numberOfBricks == 5){
			building_height = building_height*2;
			for (var i = 0; i < Constructor_player_array.length; i++) {
				Constructor_player_array[i].drawY = Constructor_player_array[i].drawY - 23;
			}
		
		}
				if(numberOfBricks == 10){
			building_height = building_height*3;
			for (var i = 0; i < Constructor_player_array.length; i++) {
				Constructor_player_array[i].drawY = Constructor_player_array[i].drawY - 23;
			}
		}
				if(numberOfBricks == 15){
			building_height = building_height*4;
					for (var i = 0; i < Constructor_player_array.length; i++) {
				Constructor_player_array[i].drawY = Constructor_player_array[i].drawY - 23;
			}
		}
				if(numberOfBricks == 20){
			building_height = building_height*5;
					for (var i = 0; i < Constructor_player_array.length; i++) {
				Constructor_player_array[i].drawY = Constructor_player_array[i].drawY - 23;
			}
		}
				if(numberOfBricks == 25){
			building_height = building_height*6;
					for (var i = 0; i < Constructor_player_array.length; i++) {
				Constructor_player_array[i].drawY = Constructor_player_array[i].drawY - 23;
			}
		}
						if(numberOfBricks == 30){
			building_height = building_height*7;
					for (var i = 0; i < Constructor_player_array.length; i++) {
				Constructor_player_array[i].drawY = Constructor_player_array[i].drawY - 23;
			}
		}
						if(numberOfBricks == 35){
			building_height = building_height*8;
					for (var i = 0; i < Constructor_player_array.length; i++) {
				Constructor_player_array[i].drawY = Constructor_player_array[i].drawY - 23;
			}
		}
								if(numberOfBricks == 40){
			building_height = building_height*8;
					for (var i = 0; i < Constructor_player_array.length; i++) {
				Constructor_player_array[i].drawY = Constructor_player_array[i].drawY - 23;
			}
		}
		//numberOfBricks = numberOfBricks + 1;
		//}
	//else{}

}

BricksEnemy.prototype.alive = function (){
	this.isDdead = false;
	this.srcX = 1530;
    this.srcY = 356;
	
}



function addBrickToArrayEnemy(){
		var newbrick6;
		
		//for (var i = 0; i < Bricks_player_array_enemy.length; i++) {
				//if (Bricks_player_array_enemy[i].isDead == true){
					//Bricks_player_array_enemy[i].isDead = false;
					//Bricks_player_array_enemy[i].alive();
					//numberOfBricksEnemy_for_destruction = numberOfBricksEnemy_for_destruction +1;
					
				//}
		//}		
		

			if(numberOfBricksEnemy == 45){
			if (Bricks_player_array_enemy[0].isDead == true){
				Bricks_player_array_enemy[0].isDead =false;
				Bricks_player_array_enemy[0].alive();
				numberOfBricksEnemy_for_destruction = numberOfBricksEnemy_for_destruction +1;
			}
			else if (Bricks_player_array_enemy[1].isDead == true){
				Bricks_player_array_enemy[1].isDead =false;
				Bricks_player_array_enemy[1].alive();
				numberOfBricksEnemy_for_destruction = numberOfBricksEnemy_for_destruction +1;
			}
			else if(Bricks_player_array_enemy[2].isDead == true){
				Bricks_player_array_enemy[2].isDead =false;
				Bricks_player_array_enemy[2].alive();
				numberOfBricksEnemy_for_destruction = numberOfBricksEnemy_for_destruction +1;
			}
			else if (Bricks_player_array_enemy[3].isDead == true){
				Bricks_player_array_enemy[3].isDead =false;
				Bricks_player_array_enemy[3].alive();
				numberOfBricksEnemy_for_destruction = numberOfBricksEnemy_for_destruction +1;
			}
			else if (Bricks_player_array_enemy[4].isDead == true){
				Bricks_player_array_enemy[4].isDead =false;
				Bricks_player_array_enemy[4].alive();
				numberOfBricksEnemy_for_destruction = numberOfBricksEnemy_for_destruction +1;
			}
			else if (Bricks_player_array_enemy[5].isDead == true){
				Bricks_player_array_enemy[5].isDead =false;
				Bricks_player_array_enemy[5].alive();
				numberOfBricksEnemy_for_destruction = numberOfBricksEnemy_for_destruction +1;
			}			
			else if(Bricks_player_array_enemy[6].isDead == true){
				Bricks_player_array_enemy[6].isDead =false;
				Bricks_player_array_enemy[6].alive();
				numberOfBricksEnemy_for_destruction = numberOfBricksEnemy_for_destruction +1;
			}
			else if (Bricks_player_array_enemy[7].isDead == true){
				Bricks_player_array_enemy[7].isDead =false;
				Bricks_player_array_enemy[7].alive();
				numberOfBricksEnemy_for_destruction = numberOfBricksEnemy_for_destruction +1;
			}
			else if(Bricks_player_array_enemy[8].isDead == true){
				Bricks_player_array_enemy[8].isDead =false;
				Bricks_player_array_enemy[8].alive();
				numberOfBricksEnemy_for_destruction = numberOfBricksEnemy_for_destruction +1;
			}
			else if(Bricks_player_array_enemy[9].isDead == true){
				Bricks_player_array_enemy[9].isDead =false;
				Bricks_player_array_enemy[9].alive();
				numberOfBricksEnemy_for_destruction = numberOfBricksEnemy_for_destruction +1;
			}
			else if(Bricks_player_array_enemy[10].isDead == true){
				Bricks_player_array_enemy[10].isDead =false;
				Bricks_player_array_enemy[10].alive();
				numberOfBricksEnemy_for_destruction = numberOfBricksEnemy_for_destruction +1;
			}
			else if (Bricks_player_array_enemy[11].isDead == true){
				Bricks_player_array_enemy[11].isDead =false;
				Bricks_player_array_enemy[11].alive();
				numberOfBricksEnemy_for_destruction = numberOfBricksEnemy_for_destruction +1;
			}
			else if (Bricks_player_array_enemy[12].isDead == true){
				Bricks_player_array_enemy[12].isDead =false;
				Bricks_player_array_enemy[12].alive();
				numberOfBricksEnemy_for_destruction = numberOfBricksEnemy_for_destruction +1;
			}
			else if (Bricks_player_array_enemy[13].isDead == true){
				Bricks_player_array_enemy[13].isDead =false;
				Bricks_player_array_enemy[13].alive();
				numberOfBricksEnemy_for_destruction = numberOfBricksEnemy_for_destruction +1;
			}
			else if(Bricks_player_array_enemy[13].isDead == true){
				Bricks_player_array_enemy[13].isDead =false;
				Bricks_player_array_enemy[13].alive();
				numberOfBricksEnemy_for_destruction = numberOfBricksEnemy_for_destruction +1;
			}
			else if (Bricks_player_array_enemy[14].isDead == true){
				Bricks_player_array_enemy[14].isDead =false;
				Bricks_player_array_enemy[14].alive();
				numberOfBricksEnemy_for_destruction = numberOfBricksEnemy_for_destruction +1;
			}
			else if(Bricks_player_array_enemy[15].isDead == true){
				Bricks_player_array_enemy[15].isDead =false;
				Bricks_player_array_enemy[15].alive();
				numberOfBricksEnemy_for_destruction = numberOfBricksEnemy_for_destruction +1;
			}
			else if (Bricks_player_array_enemy[16].isDead == true){
				Bricks_player_array_enemy[16].isDead =false;
				Bricks_player_array_enemy[16].alive();
				numberOfBricksEnemy_for_destruction = numberOfBricksEnemy_for_destruction +1;
			}
		else if(Bricks_player_array_enemy[17].isDead == true){
				Bricks_player_array_enemy[17].isDead =false;
				Bricks_player_array_enemy[17].alive();
				numberOfBricksEnemy_for_destruction = numberOfBricksEnemy_for_destruction +1;
		}
					else if (Bricks_player_array_enemy[18].isDead == true){
				Bricks_player_array_enemy[18].isDead =false;
				Bricks_player_array_enemy[18].alive();
				numberOfBricksEnemy_for_destruction = numberOfBricksEnemy_for_destruction +1;
			}
			else if (Bricks_player_array_enemy[19].isDead == true){
				Bricks_player_array_enemy[19].isDead =false;
				Bricks_player_array_enemy[19].alive();
				numberOfBricksEnemy_for_destruction = numberOfBricksEnemy_for_destruction +1;
			}
			else if (Bricks_player_array_enemy[20].isDead == true){
				Bricks_player_array_enemy[20].isDead =false;
				Bricks_player_array_enemy[20].alive();
				numberOfBricksEnemy_for_destruction = numberOfBricksEnemy_for_destruction +1;
			}
			else if(Bricks_player_array_enemy[21].isDead == true){
				Bricks_player_array_enemy[21].isDead =false;
				Bricks_player_array_enemy[21].alive();
				numberOfBricksEnemy_for_destruction = numberOfBricksEnemy_for_destruction +1;
			}
			else if(Bricks_player_array_enemy[22].isDead == true){
				Bricks_player_array_enemy[22].isDead =false;
				Bricks_player_array_enemy[22].alive();
				numberOfBricksEnemy_for_destruction = numberOfBricksEnemy_for_destruction +1;
			}
			else if(Bricks_player_array_enemy[23].isDead == true){
				Bricks_player_array_enemy[23].isDead =false;
				Bricks_player_array_enemy[23].alive();
				numberOfBricksEnemy_for_destruction = numberOfBricksEnemy_for_destruction +1;
			}

			else if (Bricks_player_array_enemy[24].isDead == true){
				Bricks_player_array_enemy[24].isDead =false;
				Bricks_player_array_enemy[24].alive();
				numberOfBricksEnemy_for_destruction = numberOfBricksEnemy_for_destruction +1;
			}
			else if(Bricks_player_array_enemy[25].isDead == true){
				Bricks_player_array_enemy[25].isDead =false;
				Bricks_player_array_enemy[25].alive();
				numberOfBricksEnemy_for_destruction = numberOfBricksEnemy_for_destruction +1;
			}
			else if (Bricks_player_array_enemy[26].isDead == true){
				Bricks_player_array_enemy[26].isDead =false;
				Bricks_player_array_enemy[26].alive();
				numberOfBricksEnemy_for_destruction = numberOfBricksEnemy_for_destruction +1;
			}
			else if(Bricks_player_array_enemy[27].isDead == true){
				Bricks_player_array_enemy[27].isDead =false;
				Bricks_player_array_enemy[27].alive();
				numberOfBricksEnemy_for_destruction = numberOfBricksEnemy_for_destruction +1;
			}
			else if (Bricks_player_array_enemy[28].isDead == true){
				Bricks_player_array_enemy[28].isDead =false;
				Bricks_player_array_enemy[28].alive();
				numberOfBricksEnemy_for_destruction = numberOfBricksEnemy_for_destruction +1;
			}
			else if (Bricks_player_array_enemy[29].isDead == true){
				Bricks_player_array_enemy[29].isDead =false;
				Bricks_player_array_enemy[29].alive();
				numberOfBricksEnemy_for_destruction = numberOfBricksEnemy_for_destruction +1;
			}
			else if (Bricks_player_array_enemy[30].isDead == true){
				Bricks_player_array_enemy[30].isDead =false;
				Bricks_player_array_enemy[30].alive();
				numberOfBricksEnemy_for_destruction = numberOfBricksEnemy_for_destruction +1;
			}
			else if (Bricks_player_array_enemy[31].isDead == true){
				Bricks_player_array_enemy[31].isDead =false;
				Bricks_player_array_enemy[31].alive();
				numberOfBricksEnemy_for_destruction = numberOfBricksEnemy_for_destruction +1;
			}
			else if(Bricks_player_array_enemy[32].isDead == true){
				Bricks_player_array_enemy[32].isDead =false;
				Bricks_player_array_enemy[32].alive();
				numberOfBricksEnemy_for_destruction = numberOfBricksEnemy_for_destruction +1;
			}
			else if (Bricks_player_array_enemy[33].isDead == true){
				Bricks_player_array_enemy[33].isDead =false;
				Bricks_player_array_enemy[33].alive();
				numberOfBricksEnemy_for_destruction = numberOfBricksEnemy_for_destruction +1;
			}
			else if (Bricks_player_array_enemy[34].isDead == true){
				Bricks_player_array_enemy[34].isDead =false;
				Bricks_player_array_enemy[34].alive();
				numberOfBricksEnemy_for_destruction = numberOfBricksEnemy_for_destruction +1;
			}
			else if (Bricks_player_array_enemy[35].isDead == true){
				Bricks_player_array_enemy[35].isDead =false;
				Bricks_player_array_enemy[35].alive();
				numberOfBricksEnemy_for_destruction = numberOfBricksEnemy_for_destruction +1;
			}
			else if (Bricks_player_array_enemy[36].isDead == true){
				Bricks_player_array_enemy[36].isDead =false;
				Bricks_player_array_enemy[36].alive();
				numberOfBricksEnemy_for_destruction = numberOfBricksEnemy_for_destruction +1;
			}
			else if (Bricks_player_array_enemy[37].isDead == true){
				Bricks_player_array_enemy[37].isDead =false;
				Bricks_player_array_enemy[37].alive();
				numberOfBricksEnemy_for_destruction = numberOfBricksEnemy_for_destruction +1;
			}
			else if (Bricks_player_array_enemy[38].isDead == true){
				Bricks_player_array_enemy[38].isDead =false;
				Bricks_player_array_enemy[38].alive();
				numberOfBricksEnemy_for_destruction = numberOfBricksEnemy_for_destruction +1;
			}
			else if (Bricks_player_array_enemy[39].isDead == true){
				Bricks_player_array_enemy[39].isDead =false;
				Bricks_player_array_enemy[39].alive();
				numberOfBricksEnemy_for_destruction = numberOfBricksEnemy_for_destruction +1;
			}
			else if (Bricks_player_array_enemy[40].isDead == true){
				Bricks_player_array_enemy[40].isDead =false;
				Bricks_player_array_enemy[40].alive();
				numberOfBricksEnemy_for_destruction = numberOfBricksEnemy_for_destruction +1;
			}
			else if (Bricks_player_array_enemy[41].isDead == true){
				Bricks_player_array_enemy[41].isDead =false;
				Bricks_player_array_enemy[41].alive();
				numberOfBricksEnemy_for_destruction = numberOfBricksEnemy_for_destruction +1;
			}
			else if (Bricks_player_array_enemy[42].isDead == true){
				Bricks_player_array_enemy[42].isDead =false;
				Bricks_player_array_enemy[42].alive();
				numberOfBricksEnemy_for_destruction = numberOfBricksEnemy_for_destruction +1;
			}
			else if (Bricks_player_array_enemy[43].isDead == true){
				Bricks_player_array_enemy[43].isDead =false;
				Bricks_player_array_enemy[43].alive();
				numberOfBricksEnemy_for_destruction = numberOfBricksEnemy_for_destruction +1;
			}
			else if(Bricks_player_array_enemy[44].isDead == true){
				Bricks_player_array_enemy[44].isDead =false;
				Bricks_player_array_enemy[44].alive();
				numberOfBricksEnemy_for_destruction = numberOfBricksEnemy_for_destruction +1;
			}	
			else if(Bricks_player_array_enemy[45].isDead == true){
				Bricks_player_array_enemy[45].isDead =false;
				Bricks_player_array_enemy[45].alive();
				numberOfBricksEnemy_for_destruction = numberOfBricksEnemy_for_destruction +1;
			}			
		}
				
	
	
		//if (numberOfBricks == 0) {newbrick = new Bricks(9,546);}
		if (numberOfBricksEnemy == 1) {newbrick5 = new BricksEnemy(449,546);}
		if (numberOfBricksEnemy == 2) { newbrick5 = new BricksEnemy(489,546);}
		if (numberOfBricksEnemy == 3) {newbrick5 = new BricksEnemy(529,546);}//that where we start on canvas
		if (numberOfBricksEnemy == 4) {newbrick5 = new BricksEnemy(569,546);}
		if (numberOfBricksEnemy == 5) {newbrick5 = new BricksEnemy(409,523);}
		if (numberOfBricksEnemy == 6) {newbrick5 = new BricksEnemy(449,523);}
		if (numberOfBricksEnemy == 7) {newbrick5 = new BricksEnemy(489,523);}
		if (numberOfBricksEnemy == 8) {newbrick5= new BricksEnemy(529,523);}
		if (numberOfBricksEnemy == 9) {newbrick5 = new BricksEnemy(569,523);}
		if (numberOfBricksEnemy == 10) {newbrick5 = new BricksEnemy(409,500);}
		if (numberOfBricksEnemy == 11) {newbrick5 = new BricksEnemy(449,500);}
		if (numberOfBricksEnemy == 12) {newbrick5 = new BricksEnemy(489,500);}
		if (numberOfBricksEnemy == 13) {newbrick5 = new BricksEnemy(529,500);}
		if (numberOfBricksEnemy == 14) {newbrick5 = new BricksEnemy(569,500);}
		if (numberOfBricksEnemy == 15) {newbrick5 = new BricksEnemy(409,477);}
		if (numberOfBricksEnemy== 16) {newbrick5 = new BricksEnemy(449,477);}
		if (numberOfBricksEnemy == 17) {newbrick5 = new BricksEnemy(489,477);}
		if (numberOfBricksEnemy == 18) {newbrick5 = new BricksEnemy(529,477);}
		if (numberOfBricksEnemy == 19) {newbrick5 = new BricksEnemy(569,477);}
		if (numberOfBricksEnemy == 20) {newbrick5 = new BricksEnemy(409,454);}
		if (numberOfBricksEnemy == 21) {newbrick5 = new BricksEnemy(449,454);}
		if (numberOfBricksEnemy== 22) {newbrick5 = new BricksEnemy(489,454);}
		if (numberOfBricksEnemy == 23) {newbrick5 = new BricksEnemy(529,454);}
		if (numberOfBricksEnemy == 24) {newbrick5 = new BricksEnemy(569,454);}
		if (numberOfBricksEnemy == 25) {newbrick5 = new BricksEnemy(409,431);}
		if (numberOfBricksEnemy == 26) {newbrick5 = new BricksEnemy(449,431);}
		if (numberOfBricksEnemy == 27) {newbrick5 = new BricksEnemy(489,431);}
		if (numberOfBricksEnemy == 28) {newbrick5 = new BricksEnemy(529,431);}
		if (numberOfBricksEnemy == 29) {newbrick5 = new BricksEnemy(569,431);}
		if (numberOfBricksEnemy== 30) {newbrick5 = new BricksEnemy(409,408);}
		if (numberOfBricksEnemy == 31) {newbrick5 = new BricksEnemy(449,408);}
		if (numberOfBricksEnemy == 32) {newbrick5 = new BricksEnemy(489,408);}
		if (numberOfBricksEnemy == 33) {newbrick5 = new BricksEnemy(529,408);}
		if (numberOfBricksEnemy == 34) {newbrick5 = new BricksEnemy(569,408);}
		if (numberOfBricksEnemy == 35) {newbrick5 = new BricksEnemy(409,385);}
		if (numberOfBricksEnemy == 36) {newbrick5 = new BricksEnemy(449,385);}
		if (numberOfBricksEnemy == 37) {newbrick5 = new BricksEnemy(489,385);}
		if (numberOfBricksEnemy == 38) {newbrick5 = new BricksEnemy(529,385);}
		if (numberOfBricksEnemy == 39) {newbrick5 = new BricksEnemy(569,385);}
		if (numberOfBricksEnemy == 40) {newbrick5 = new BricksEnemy(409,362);}
		if (numberOfBricksEnemy== 41) {newbrick5 = new BricksEnemy (449,362);}
		if (numberOfBricksEnemy == 42) {newbrick5 = new BricksEnemy(489,362);}
		if (numberOfBricksEnemy == 43) {newbrick5 = new BricksEnemy(529,362);}
		if (numberOfBricksEnemy == 44) {newbrick5 = new BricksEnemy(569,362);}
	
		//if (numberOfBricks == 45) {newbrick = new Bricks(49,546);}
			
		//update the position of the builders depedning on the level of the building that is build
		//newbrick = new Bricks(Xa,Ya);
		Bricks_player_array_enemy.push(newbrick5);
		if(numberOfBricksEnemy == 5){
			building_height_enemy= building_height_enemy*2;
			for (var i = 0; i < Constructor_player_array_enemy.length; i++) {
				Constructor_player_array_enemy[i].drawY = Constructor_player_array_enemy[i].drawY - 23;
			}
		
		}
				if(numberOfBricksEnemy == 10){
			building_height_enemy = building_height_enemy*3;
			for (var i = 0; i < Constructor_player_array_enemy.length; i++) {
				Constructor_player_array_enemy[i].drawY = Constructor_player_array_enemy[i].drawY - 23;
			}
		}
				if(numberOfBricksEnemy == 15){
			building_height_enemy = building_height_enemy*4;
					for (var i = 0; i < Constructor_player_array_enemy.length; i++) {
				Constructor_player_array_enemy[i].drawY = Constructor_player_array_enemy[i].drawY - 23;
			}
		}
				if(numberOfBricksEnemy == 20){
			building_height_enemy = building_height_enemy*5;
					for (var i = 0; i < Constructor_player_array_enemy.length; i++) {
				Constructor_player_array_enemy[i].drawY = Constructor_player_array_enemy[i].drawY - 23;
			}
		}
				if(numberOfBricksEnemy == 25){
			building_height_enemy = building_height_enemy*6;
					for (var i = 0; i < Constructor_player_array_enemy.length; i++) {
				Constructor_player_array_enemy[i].drawY = Constructor_player_array_enemy[i].drawY - 23;
			}
		}
						if(numberOfBricksEnemy == 30){
			building_height_enemy = building_height_enemy*7;
					for (var i = 0; i < Constructor_player_array_enemy.length; i++) {
				Constructor_player_array_enemy[i].drawY = Constructor_player_array_enemy[i].drawY - 23;
			}
		}
						if(numberOfBricksEnemy == 35){
			building_height_enemy = building_height_enemy*8;
					for (var i = 0; i < Constructor_player_array_enemy.length; i++) {
				Constructor_player_array_enemy[i].drawY = Constructor_player_array_enemy[i].drawY - 23;
			}
		}
								if(numberOfBricksEnemy == 40){
			building_height_enemy = building_height_enemy*8;
					for (var i = 0; i < Constructor_player_array_enemy.length; i++) {
				Constructor_player_array_enemy[i].drawY = Constructor_player_array_enemy[i].drawY - 23;
			}
		}
		//numberOfBricks = numberOfBricks + 1;
		


}

//https://gist.github.com/greypants/3739036
//function that digs the gold depending on the number of mines
function collectDiamons(){
	if(numberOfMiners2 > 0){
	if (money < 10000){
			money = money +1;
		}
		else{
		money = 10000;
	}
	}
	document.getElementById("money").innerHTML = money;
};

function collectDiamonsEnemy(){
	if(numberOfMinersEnemy2 > 0){
	if (moneyEnemy < 10000){
			moneyEnemy = moneyEnemy +1;
		}
	else{
		moneyEnemy = 10000;
	}
	}
	document.getElementById("moneyEnemy").innerHTML = moneyEnemy;
};



//CONSTRUCTORS
//NEED TO CHANGE IMAGE FOR THE BUILDER--ok done
function Constructor() {
	this.srcX = 1154;
    this.srcY = 9;
    this.width = 43;
    this.height = 66;
	this.isDead = false;
	if (numberOfBuilders == 1){
		this.drawX = building_width; 
		this.drawY = (building_height - 66);  
	}
	if (numberOfBuilders == 2){
		this.drawX = 169+40; 
		this.drawY = building_height -66;   
	}
		if (numberOfBuilders == 3){
		this.drawX = 169+40+40; 
		this.drawY = building_height -66;  
	}
		if (numberOfBuilders == 4){
		this.drawX = 169+40+40+40; 
		this.drawY = building_height -66;  
	}
		if (numberOfBuilders == 5){
		this.drawX = 169+(4*40); 
		this.drawY = building_height -66;    
	}
		if (numberOfBuilders == 6){
		this.drawX = 169+5*40; 
		this.drawY = building_height -66;  
	}
	
		if(this.isDead == false){
		    this.xpos1=1154;
           this.ypos1=9; 
            this.index1=43; 
            this.numFrames1 = 2; 
            this.frameSize1= 43;
		
	}

	var that = this;
	this.moveInterval = setInterval(function() {that.loop_constructor();}, 200);
	
 
}


Constructor.prototype.die = function () {
	this.isDead = true;
    this.srcX = 690;
	this.srcY = 1128;
	this.height = 66;
	this.xpos1=690, 
    this.ypos1=1128, 
    this.index1=0, 
    this.numFrames1 = 2, 
    this.frameSize1= 0;
};	
	

Constructor.prototype.birth = function () {
	this.isDead = false;
	this.xpos1=1154, 
    this.ypos1=9, 
	this.height1 = 66;
    this.index1=0;
	this.frameSize1= 43;
};	



//function to loop through the sprite sheet for miner
Constructor.prototype.loop_constructor = function() {
            //clear the canvas!
            //ctxEntities.clearRect(0,0, canvasHeight,canvasWidth);

            ctxEntities.drawImage(imgSprite,this.xpos1,this.ypos1,this.width, this.height,this.drawX, this.drawY,this.width, this.height);
            
            //each time around we add the frame size to our xpos, moving along the source imagebc
            //each time around we add the frame size to our xpos, moving along the source image
            this.xpos1 += this.frameSize1;
            //increase the index so we know which frame of our animation we are currently on
            this.index1 += 1;
            
            //if our index is higher than our total number of frames, we're at the end and better start over
            if (this.index1 >= this.numFrames1) {
				if (this.isDead == false){
					this.xpos1 =1154;
					this.ypos1 =9;
					this.index1=0;  
				}	
				if (this.isDead == true){
					this.xpos1=690, 
					this.ypos1=1128, 
					//this.height1 = 66;
					this.index1=0;
					
					
				}
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
     	
    ctxEntities.drawImage(imgSprite,this.xpos1,this.ypos1,this.width, this.height,this.drawX, this.drawY,this.width, this.height);
   //this.checkDirection();
};
//c.drawImage(image, xpos, ypos, frameSize, frameSize, 0, 0, frameSize, frameSize);
Constructor.prototype.draw = function () {
	//ctxEntities.drawImage(imgSprite, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, this.width, this.height);
	
   ctxEntities.drawImage(imgSprite,this.xpos1,this.ypos1,this.width, this.height,this.drawX, this.drawY,this.width, this.height);
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

//ENEMY Constructor
//CONSTRUCTORS
//NEED TO CHANGE IMAGE FOR THE BUILDER--ok done
function EnemyConstructor() {
	this.srcX = 1069;
    this.srcY = 158;
    this.width = 40;
    this.height = 66;
	this.isDead = false;
	if (numberOfBuildersEnemy == 1){
		this.drawX = 409; 
		this.drawY = (building_height_enemy - 66);  
	}
	if (numberOfBuildersEnemy == 2){
		this.drawX = 449; 
		this.drawY = (building_height_enemy - 66);  
	}
		if (numberOfBuildersEnemy == 3){
		this.drawX = 489; 
		this.drawY = (building_height_enemy - 66);  
	}
	if (numberOfBuildersEnemy == 4){
		this.drawX = 529; 
		this.drawY = (building_height_enemy - 66);  
	}
		if (numberOfBuildersEnemy == 5){
		this.drawX = 569; 
		this.drawY = (building_height_enemy - 66);    
	}

	if(this.isDead == false){
		    this.xpos7=1069;
            this.ypos7=158; 
            this.index7=43; 
            this.numFrames7 = 2; 
            this.frameSize7= 43;
		
	}
	var that = this;
	this.moveInterval = setInterval(function() {that.loop_constructor();}, 200);
	
 
}
EnemyConstructor.prototype.birth = function () {
	this.isDead = false;
	this.xpos7=1069;
    this.ypos7=158; 
    this.index7=43; 
	this.height = 66;
	this.frameSize7= 43;
};	


EnemyConstructor.prototype.die = function () {
	this.isDead = true;
    this.srcX = 690;
	this.srcY = 1128;
	this.height = 108;
	this.xpos7=690, 
    this.ypos7=1128, 
    this.index7=0, 
    this.numFrames7 = 2, 
    this.frameSize7= 0;
};	
	


//function to loop through the sprite sheet for miner
EnemyConstructor.prototype.loop_constructor = function() {
            //clear the canvas!
            //ctxEntities.clearRect(0,0, canvasHeight,canvasWidth);

            ctxEntities.drawImage(imgSprite,this.xpos7,this.ypos7,this.width, this.height,this.drawX, this.drawY,this.width, this.height);
            
            //each time around we add the frame size to our xpos, moving along the source imagebc
            //each time around we add the frame size to our xpos, moving along the source image
            this.xpos7 += this.frameSize7;
            //increase the index so we know which frame of our animation we are currently on
            this.index7 += 1;
            
            //if our index is higher than our total number of frames, we're at the end and better start over
            if (this.index7 >= this.numFrames7) {
				if(this.isDead== false){
					this.xpos7 =1069;
					this.ypos7 =158;
					this.index7=0;  
				}
				if (this.isDead == true){
					this.xpos7=690, 
					this.ypos7=1128, 
					this.index7=0;
				}
            //if we've gotten to the limit of our source image's width, we need to move down one row of frames                
            }// else if (xpos1 + frameSize1 > imgSprite.width){
                //xpos1 =1;
                //ypos1 += frameSize1;
            //}
            
            
        }

//create prototype of the builder
//adding a method to the object
EnemyConstructor.prototype.update = function () {
    //this.centerX = this.drawX + (this.width / 2);
   // this.centerY = this.drawY + (this.height / 2);
     	
    ctxEntities.drawImage(imgSprite,this.xpos7,this.ypos7,this.width, this.height,this.drawX, this.drawY,this.width, this.height);
   //this.checkDirection();
};
//c.drawImage(image, xpos, ypos, frameSize, frameSize, 0, 0, frameSize, frameSize);
EnemyConstructor.prototype.draw = function () {
	//ctxEntities.drawImage(imgSprite, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, this.width, this.height);
	
   ctxEntities.drawImage(imgSprite,this.xpos7,this.ypos7,this.width, this.height,this.drawX, this.drawY,this.width, this.height);
};


//change 2 to numMiners_player after u figure out how to keep track of the variable numMiners_player
function initConstructorEnemy() {
    for (var i = 0; i < numberOfBuildersEnemy; i++) {
       Constructor_player_array_enemy[Constructor_player_array_enemy.length] = new EnemyConstructor();
    }
}




function updateAllConstructorEnemy() {
    for (var i = 0; i < Constructor_player_array_enemy.length; i++) {
        Constructor_player_array_enemy[i].update();
    }
}

function drawAllConstructorEnemy() {
    for (var i = 0; i < Constructor_player_array_enemy.length; i++) {
        Constructor_player_array_enemy[i].draw();
    }
}



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
	this.speed = 3;
	this.isUpKey = false;
    this.isRightKey = false;
    this.isDownKey = false;
    this.isLeftKey = false;
    this.isSpacebar = false;
    this.isHitting = false;
	this.isDead = false;
}

Destructor.prototype.draw = function () {

if (this.isDead == false){
ctxEntities.drawImage(imgSprite, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, this.width, this.height);}
};

//https://retrosnob.files.wordpress.com/2014/10/foundation-game-design-with-html5-and-javascript-v413hav-1.pdf
Destructor.prototype.update = function () {
    this.centerX = this.drawX + (this.width / 2);
    this.centerY = this.drawY + (this.height / 2);
    this.checkDirection();
	this.checkHitting();
};

Destructor.prototype.checkDirection = function () {
    var newDrawX = this.drawX,
        newDrawY = this.drawY;
		if(this.isDead ==false){
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
		}
};




//https://gablaxian.com/articles/creating-a-game-with-javascript/animation
//https://www.davrous.com/2012/03/16/html5-gaming-animating-sprites-in-canvas-with-easeljs/			
//#https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_animations
//http://tutorialspots.com/html5-canvas-create-animated-character-with-sprite-sheets-1352.html
Destructor.prototype.checkHitting = function () {
	var newX2 = this.srcX;
	var seq;
	var currentSequence;
	if (this.isSpacebar && !this.isHitting &&this.isDead ==false) {
        this.isHitting = true;

	var newX = this.srcX;
	newX = 87;
	this.srcX = newX;
	//newX = 3;
	this.srcX = newX;
	//this.that;
	        if (collision(this, enemydestructor)) {
				if(innerMeterEnemy1.width > 0){
				innerMeterEnemy1.width = (innerMeterEnemy1.width - 50);
		
			} 
			
			if(innerMeterEnemy1.width == 0){
				if(enemydestructor.isDead == false){
				numberOfDestructorsEnemy = numberOfDestructorsEnemy - 1;
			    document.getElementById("destructorEnemy").innerHTML = numberOfDestructorsEnemy;
				}
				enemydestructor.die();
			} 
			}
		//destroying enemies miners	
	for (var i = 0; i < Miners_player_array_enemy.length; i++) {
   		if (collision(this, Miners_player_array_enemy[i])) {
			if(Miners_player_array_enemy[i].isDead == false){
				numberOfMinersEnemy2 = numberOfMinersEnemy2 - 1;
				document.getElementById("minerEnemy").innerHTML = numberOfMinersEnemy2;
			}
			Miners_player_array_enemy[i].die();
			} 
			}
			
		//destroying enemies bricks
		
	for (var i = 0; i < Bricks_player_array_enemy.length; i++) {
   		if (collision(this, Bricks_player_array_enemy[i]) && Bricks_player_array_enemy[i].isDead == false) {
				numberOfBricksEnemy_for_destruction = numberOfBricksEnemy_for_destruction-1;
			
			Bricks_player_array_enemy[i].die();
			//numberOfBricksEnemy_for_destruction = numberOfBricksEnemy_for_destruction-1;
			document.getElementById("enemy_height").innerHTML = numberOfBricksEnemy_for_destruction;
		}
			//numberOfBricks = numberOfBricks -1;
			
				//	Bricks_player_array.push(newbrick);
		//if(numberOfBricks == 5){
			
			} 
			//}
			
			
			
			
			
			
			
			
			
			
			
		//destroying enemies builders
	for (var i = 0; i < Constructor_player_array_enemy.length; i++) {
   		if (collision(this, Constructor_player_array_enemy[i])) {
			if( Constructor_player_array_enemy[i].isDead ==false){
				Constructor_player_array_enemy[i].die();
				numberOfBuildersEnemy2 = numberOfBuildersEnemy2 - 1;
				document.getElementById("builderEnemy").innerHTML = numberOfBuildersEnemy2;
			}
			
			} 
	}
			
			
			
		

			
			
			
			
			
			
			
			
			
			
			
			
	}
			
	
     else if (!this.isSpacebar) {
        this.isHitting = false;
	var oldX = this.srcX;
	oldX = 3;
	this.srcX = oldX;
	//newX = 3;
	this.srcX = oldX;

    }

};


Destructor.prototype.die = function () {
	this.isDead = true;
    this.srcX = 690;
	this.srcY = 1128;
	this.height = 108;
};


Destructor.prototype.birth = function () {	

	this.srcX = 3;
    this.srcY = 992;
    this.height = 118;
	this.srcX = 683;
	this.isDead = false;
};


function innerMeter() {
    this.width = 400;
    this.height = 30;
    this.drawX = 0;
    this.drawY = 582;
}

innerMeter.prototype.regenerate = function (){
	this.width = 400;
    this.height = 30;
    this.drawX = 0;
    this.drawY = 582;
	
	
}

innerMeter.prototype.draw = function () {
    ctxEntities.fillStyle = "green";
	ctxEntities.beginPath();
    ctxEntities.rect(this.drawX, this.drawY, this.width, this.height);
	ctxEntities.closePath();
    ctxEntities.fill();
};

innerMeter.prototype.update = function () {	
	ctxEntities.fillStyle = "green";
	ctxEntities.beginPath();
	ctxEntities.rect(this.drawX, this.drawY, this.width, this.height);
	ctxEntities.closePath();
	ctxEntities.fill();
};

function outerMeter() {
    this.width = 400;
    this.height = 30;
    this.drawX = 0;
    this.drawY = 582;
}

outerMeter.prototype.draw = function () {
    ctxEntities.fillStyle = "white";
	ctxEntities.beginPath();
    ctxEntities.rect(this.drawX, this.drawY, this.width, this.height);
    ctxEntities.closePath();
    ctxEntities.fill();
};

outerMeter.prototype.update = function () {	
	ctxEntities.fillStyle = "white";
	ctxEntities.beginPath();
	ctxEntities.rect(this.drawX, this.drawY, this.width, this.height);
	ctxEntities.closePath();
	ctxEntities.fill();
};
		
		
function EnemyDestructorStationary() {
    this.srcX = 683;
    this.srcY = 985;
    this.width = 98;
    this.height = 124;
	//original location where to place the destructor
    this.drawX = randomRange(400, canvasWidth - this.width);
    this.drawY = randomRange(0, canvasHeight - this.height);
	this.speed = 0.2;
	this.moving =0;
	this.dirx = 0;
	this.diry =0;
    this.isDead = false;
	this.wasKilled = false;

}

	

EnemyDestructorStationary.prototype.draw = function () {	
    ctxEntities.drawImage(imgSprite,this.srcX,this.srcY, this.width, this.height, this.drawX, this.drawY, this.width, this.height);
};

EnemyDestructorStationary.prototype.die = function () {
	this.isDead = true;
	this.wasKilled = true;
    clearInterval(this.moveInterval);
    this.srcX = 658;
	this.srcY = 851;
	this.height = 116;
};


EnemyDestructorStationary.prototype.birth = function () {	
    this.srcX = 683;
    this.srcY = 985;
    this.width = 98;
    this.height = 124;
	this.drawX = enemydestractor.drawX;
	this.drawY = enemydestractor.drawY;
};
//we want to make sure that enemy destructor is moving towards the players destructor
EnemyDestructorStationary.prototype.update = function () {
	
	if (this.isDead != true){
			//we want to make sure that the destructor is moving towards the players destructor
		    if(destructor.drawX  < (this.drawX ) ) {this.dirx = -this.speed;} 
		    if(destructor.drawX  > (this.drawX) ){this.dirx = this.speed; }
			if(destructor.drawY < this.drawY){this.diry = -this.speed; }
			if(destructor.drawY > this.drawY){this.diry = this.speed; }
			this.drawX = this.drawX + this.dirx;
			this.drawY =  this.drawY + this.diry;
			ctxEntities.drawImage(imgSprite,this.srcX,this.srcY,this.width, this.height,this.drawX, this.drawY,this.width, this.height);
		}	
	
   
};


//THIS CODE WILL BE FOR THE ENEMY
//now lets make enemies
//lets do a destructor for the player - ill start with 1
function EnemyDestructor() {
    this.srcX = 683;
    this.srcY = 985;
    this.width = 98;
    this.height = 120;
	//original location where to place the destructor
    this.drawX = randomRange(400, canvasWidth - this.width);
    this.drawY = randomRange(0, canvasHeight - this.height);
	this.speed = 1;
	this.moving =0;
	this.dirx = 0;
	this.diry =0;
    this.isDead = false;
	this.isHitting = false;
	this.xDistance = Math.abs(this.drawX - destructor.drawX);
		if( this.isDead == false){
			this.xpos5=584, 
            this.ypos5=984, 
            this.index5=96, 
            this.numFrames5 = 2, 
            this.frameSize5= 96;
}


	var that = this;
	this.moveInterval = setInterval(function() {that.loop_enemy_destructor_fighting();}, 500);
	//this.hitInterval = setInternal(function(){that.checkHitting();},1000);

}


EnemyDestructor.prototype.die = function () {	
	this.isDead = true;
    this.srcX = 690;
	this.srcY = 1128;
	//this.height = 108;
	this.xpos5=690, 
    this.ypos5=1128, 
    this.index5=0, 
    this.numFrames5 = 2, 
    this.frameSize5= 0;
};	


	  
EnemyDestructor.prototype.birth = function () {	
	this.srcX = 584;
    this.srcY = 989;
    this.width = 98;
    this.height = 120;
	this.xpos5 = 584;
	this.ypos5 = 989;
	this.frameSize5= 96;
	this.drawX = randomRange(400, canvasWidth - this.width);
    this.drawY = randomRange(0, canvasHeight - this.height);
	this.isDead = false;
	//this.drawX = enemydestractorStationary.drawX;
	//this.drawY = enemydestractorStationary.drawY;
};


  
	  

EnemyDestructor.prototype.loop_enemy_destructor_fighting = function() {
			//this.height = 120;
			ctxEntities.drawImage(imgSprite,this.xpos5,this.ypos5,this.width, this.height,this.drawX, this.drawY,this.width, this.height);
            this.xpos5 += this.frameSize5;
		   //ctxEntities.drawImage(imgSprite,this.srcX,this.srcY,this.width, this.height,this.drawX, this.drawY,this.width, this.height);
            //increase the index so we know which frame of our animation we are currently on
            this.index5 += 1;
            
            //if our index is higher than our total number of frames, we're at the end and better start over
            if (this.index5 >= this.numFrames5) {
				if( this.isDead == false){
                this.xpos5 =584;
                this.ypos5 =989;
                this.index5=0;    
				}
				
				else if( this.isDead == true){

		this.xpos5=690; 
    this.ypos5=1128; 
    this.index5=0;
  
	
			}
	           
            }
   checkHittingEnemyDestructor ();
			
}

EnemyDestructor.prototype.draw = function () {	
    ctxEntities.drawImage(imgSprite,this.xpos5,this.ypos5, this.width, this.height, this.drawX, this.drawY, this.width, this.height);
};





//we want to make sure that enemy destructor is moving towards the players destructor
EnemyDestructor.prototype.update = function () {	
	//chase after destructor
	if (this.isDead != true && destructor.isDead == false){
			//we want to make sure that the destructor is moving towards the players destructor
		    if(destructor.drawX  < (this.drawX ) ) {this.dirx = -this.speed;} 
		    if(destructor.drawX  > (this.drawX) ){this.dirx = this.speed; }
			if(destructor.drawY < this.drawY){this.diry = -this.speed; }
			if(destructor.drawY > this.drawY){this.diry = this.speed; }
		}	
		//chase after builders
		else if (this.isDead != true && numberOfBuilders > 0 && Constructor_player_array[0].isDead == false){
			if(Constructor_player_array[0].drawX  < (this.drawX ) ) {this.dirx = -this.speed;} 
		    if(Constructor_player_array[0].drawX  > (this.drawX) ){this.dirx = this.speed; }
			if(Constructor_player_array[0].drawY < this.drawY){this.diry = -this.speed; }
			if(Constructor_player_array[0].drawY > this.drawY){this.diry = this.speed; }
			
		}
		
		else if (this.isDead != true && numberOfBuilders > 1 && Constructor_player_array[1].isDead == false){
			if(Constructor_player_array[1].drawX  < (this.drawX ) ) {this.dirx = -this.speed;} 
		    if(Constructor_player_array[1].drawX  > (this.drawX) ){this.dirx = this.speed; }
			if(Constructor_player_array[1].drawY < this.drawY){this.diry = -this.speed; }
			if(Constructor_player_array[1].drawY > this.drawY){this.diry = this.speed; }
			
		}
			else if (this.isDead != true && numberOfBuilders > 2 && Constructor_player_array[2].isDead == false){
			if(Constructor_player_array[2].drawX  < (this.drawX ) ) {this.dirx = -this.speed;} 
		    if(Constructor_player_array[2].drawX  > (this.drawX) ){this.dirx = this.speed; }
			if(Constructor_player_array[2].drawY < this.drawY){this.diry = -this.speed; }
			if(Constructor_player_array[2].drawY > this.drawY){this.diry = this.speed; }
			
		}
			else if (this.isDead != true && numberOfBuilders > 3 && Constructor_player_array[3].isDead == false){
			if(Constructor_player_array[3].drawX  < (this.drawX ) ) {this.dirx = -this.speed;} 
		    if(Constructor_player_array[3].drawX  > (this.drawX) ){this.dirx = this.speed; }
			if(Constructor_player_array[3].drawY < this.drawY){this.diry = -this.speed; }
			if(Constructor_player_array[3].drawY > this.drawY){this.diry = this.speed; }
			
		}
		else if (this.isDead != true && numberOfBuilders > 4 && Constructor_player_array[4].isDead == false){
			if(Constructor_player_array[4].drawX  < (this.drawX ) ) {this.dirx = -this.speed;} 
		    if(Constructor_player_array[4].drawX  > (this.drawX) ){this.dirx = this.speed; }
			if(Constructor_player_array[4].drawY < this.drawY){this.diry = -this.speed; }
			if(Constructor_player_array[4].drawY > this.drawY){this.diry = this.speed; }
			
		}
		//chasing building
		else if (this.isDead != true && numberOfBricks_for_destruction > 0){
			if(Bricks_player_array[numberOfBricks_for_destruction-1].drawX  < (this.drawX ) ) {this.dirx = -this.speed;} 
		    if(Bricks_player_array[numberOfBricks_for_destruction-1].drawX  > (this.drawX) ){this.dirx = this.speed; }
			if(Bricks_player_array[numberOfBricks_for_destruction-1].drawY < this.drawY){this.diry = -this.speed; }
			if(Bricks_player_array[numberOfBricks_for_destruction-1].drawY > this.drawY){this.diry = this.speed; }
			
		}
		//chashing miners
		else if (this.isDead != true && numberOfMiners > 0 && Miners_player_array[0].isDead == false){
			if(Miners_player_array[0].drawX  < (this.drawX ) ) {this.dirx = -this.speed;} 
		    if(Miners_player_array[0].drawX  > (this.drawX) ){this.dirx = this.speed; }
			if(Miners_player_array[0].drawY < this.drawY){this.diry = -this.speed; }
			if(Miners_player_array[0].drawY > this.drawY){this.diry = this.speed; }
			
		}
		
		else if (this.isDead != true && numberOfMiners > 1 && Miners_player_array[1].isDead == false){
			if(Miners_player_array[1].drawX  < (this.drawX ) ) {this.dirx = -this.speed;} 
		    if(Miners_player_array[1].drawX  > (this.drawX) ){this.dirx = this.speed; }
			if(Miners_player_array[1].drawY < this.drawY){this.diry = -this.speed; }
			if(Miners_player_array[1].drawY > this.drawY){this.diry = this.speed; }
			
		}
			else if (this.isDead != true && numberOfMiners > 2 && Miners_player_array[2].isDead == false){
			if(Miners_player_array[2].drawX  < (this.drawX ) ) {this.dirx = -this.speed;} 
		    if(Miners_player_array[2].drawX  > (this.drawX) ){this.dirx = this.speed; }
			if(Miners_player_array[2].drawY < this.drawY){this.diry = -this.speed; }
			if(Miners_player_array[2].drawY > this.drawY){this.diry = this.speed; }
			
		}
			else if (this.isDead != true && numberOfMiners > 3 && Miners_player_array[3].isDead == false){
			if(Miners_player_array[3].drawX  < (this.drawX ) ) {this.dirx = -this.speed;} 
		    if(Miners_player_array[3].drawX  > (this.drawX) ){this.dirx = this.speed; }
			if(Miners_player_array[3].drawY < this.drawY){this.diry = -this.speed; }
			if(Miners_player_array[3].drawY > this.drawY){this.diry = this.speed; }
			
		}
		else if (this.isDead != true && numberOfMiners > 4 && Miners_player_array[4].isDead == false){
			if(Miners_player_array[4].drawX  < (this.drawX ) ) {this.dirx = -this.speed;} 
		    if(Miners_player_array[4].drawX  > (this.drawX) ){this.dirx = this.speed; }
			if(Miners_player_array[4].drawY < this.drawY){this.diry = -this.speed; }
			if(Miners_player_array[4].drawY > this.drawY){this.diry = this.speed; }
			
		}
		//chase after builders
		
		
		else{
			this.dirx =0;
			this.diry = 0;
		}
	
			this.drawX = this.drawX + this.dirx;
			this.drawY =  this.drawY + this.diry;
			//prevent runof screen
			if(this.drawY >= (600 -this.height)){
				this.drawY = (600 -this.height);
			}
			if(this.drawY<0){
				this.drawY = 0;
			}
						if(this.drawX >= (800 -this.width)){
				this.drawX = (800 -this.width);
			}
		if(this.drawX <0){
				this.drawX = 0;
			}
			
			ctxEntities.drawImage(imgSprite,this.xpos5,this.ypos5,this.width, this.height,this.drawX, this.drawY,this.width, this.height);
			
   
};

function destructoAttack(){
	enemydestructor.srcX = 587;
	enemydestructor.srcY = 985;
	
}	 
function destructorNormalState(){
	enemydestructor.srcX = 683;
	enemydestructor.srcY = 985;
	    //this.srcX = 683;
   // this.srcY = 985;
	
}

function innerMeterEnemy() {
    this.width = 400;
    this.height = 30;
    this.drawX = 400;
    this.drawY = 582;
}

innerMeterEnemy.prototype.draw = function () {
    ctxEntities.fillStyle = "blue";
	ctxEntities.beginPath();
    ctxEntities.rect(this.drawX, this.drawY, this.width, this.height);
	ctxEntities.closePath();
    ctxEntities.fill();
};

innerMeterEnemy.prototype.update = function () {	
	ctxEntities.fillStyle = "blue";
	ctxEntities.beginPath();
	ctxEntities.rect(this.drawX, this.drawY, this.width, this.height);
	ctxEntities.closePath();
	ctxEntities.fill();
};
innerMeterEnemy.prototype.regenerate = function(){
	this.width = 400;
    this.height = 30;
    this.drawX = 400;
    this.drawY = 582;
	
}


function outerMeterEnemy() {
    this.width = 400;
    this.height = 30;
    this.drawX = 400;
    this.drawY = 582;
}

outerMeterEnemy.prototype.draw = function () {
    ctxEntities.fillStyle = "white";
	ctxEntities.beginPath();
    ctxEntities.rect(this.drawX, this.drawY, this.width, this.height);
	ctxEntities.closePath();
    ctxEntities.fill();
};

outerMeterEnemy.prototype.update = function () {	
	ctxEntities.fillStyle = "white";
	ctxEntities.beginPath();
	ctxEntities.rect(this.drawX, this.drawY, this.width, this.height);
	ctxEntities.closePath();
	ctxEntities.fill();
};




function checkHittingEnemyDestructor () {
	    if (collision(enemydestructor, destructor) && enemydestructor.isDead == false && destructor.isDead == false && !destructor.isHitting && destructor.isSpacebar == false) {
			if(innerMeterPlayer.width > 0){
				innerMeterPlayer.width = (innerMeterPlayer.width - 50);
			} 
			if(innerMeterPlayer.width == 0){
				destructor.die();
				numberOfDestructors = 0;
				//clearInterval(enemydestractor.moveInterval);
				document.getElementById("destructor").innerHTML = numberOfDestructors;
			} 
	           
        }
		
	 for (var i = 0; i < Miners_player_array.length; i++) {
        if (collision(Miners_player_array[i], enemydestructor)&& enemydestructor.isDead == false && Miners_player_array[i].isDead == false){
			Miners_player_array[i].die();
			numberOfMiners2 = numberOfMiners2 - 1;
			document.getElementById("miner").innerHTML = numberOfMiners2;
			
		}
	 }
		
	 for (var i = 0; i < Constructor_player_array.length; i++) {
        if (collision(Constructor_player_array[i], enemydestructor)&& enemydestructor.isDead == false && Constructor_player_array[i].isDead == false){
			Constructor_player_array[i].die();
			numberOfBuilders2 = numberOfBuilders2 - 1;
			document.getElementById("builder").innerHTML = numberOfBuilders2;
			
		}
	 }
	 
	 
	 		//destroying players bricks		
	for (var i = 0; i < Bricks_player_array.length; i++) {
   		if (collision(enemydestructor, Bricks_player_array[i]) && Bricks_player_array[i].isDead == false && enemydestructor.isDead == false) {
			numberOfBricks_for_destruction = numberOfBricks_for_destruction-1;
			Bricks_player_array[i].die();
			document.getElementById("player_height").innerHTML = numberOfBricks_for_destruction;
			
		} 
	}
};

//collision detection

//https://retrosnob.files.wordpress.com/2014/10/foundation-game-design-with-html5-and-javascript-v413hav-1.pdf
//for the description of the collision function, see refference above
function collision(a, b) {
	
	var vx = (a.drawX+ (a.width/2)) - (b.drawX+ (b.width/2));
	var vy = (a.drawY+ (a.height/2)) - (b.drawY+ (b.height/2));
	var magnitude = Math.sqrt(vx*vx +vy*vy);
	var totalRadii = a.width/2 + b.width/2;
	var hit = magnitude < totalRadii;
	return hit;
}


//AI how to distribute their money
function AI_Money_Distribution(){
	//we want to have a destructor
	if(moneyEnemy < 200 && numberOfDestructorsEnemy == 0){
		
	}
	else if (moneyEnemy >= 200 && numberOfDestructorsEnemy == 0){
		buyenemydestructor(1);
	}
	//we want to have at least 1 builder
	if (moneyEnemy < 200 && numberOfBuildersEnemy2 == 0){
		
	}
	else if (moneyEnemy >= 200 && numberOfBuildersEnemy2 == 0 && numberOfDestructorsEnemy == 1 ){
	//else if (moneyEnemy >= 200 && numberOfBuildersEnemy2 == 0 ){
		buyBuilderEnemy(1);
		
	}
	
		//we want to have at least 1 miner
	 if (moneyEnemy < 100 && numberOfMinersEnemy2 == 0){
		
	}
	else if (moneyEnemy >= 100 && numberOfMinersEnemy2 == 0 && numberOfDestructorsEnemy == 1 && numberOfBuildersEnemy2 < 1){
	//else if (moneyEnemy >= 100 && numberOfMinersEnemy2 == 0){
		buyMinerEnemy(1);
		
	}
	
	//if we have at least 1 destructor, 1 builder and 1 miner, the AI will randomly buy either builder or miner with the rest of the money
	//if there are less than 5 miners and if there are less than 5 builders
	else if (moneyEnemy >= 200 && numberOfMinersEnemy2 > 0 && numberOfDestructorsEnemy == 1 && numberOfBuildersEnemy2 > 0 && numberOfMinersEnemy2 == numberOfBuildersEnemy2 ){
		//var randome_number = Math.random() < 0.5 ? 1 : 2;
		var randome_number = Math.floor(Math.random()*(2-1+1)+1);
		//if 1 buy builder
		if(randome_number == 1){
			buyBuilderEnemy(1);
		}
		//if 2 buy miner
		if(randome_number == 2){
			buyMinerEnemy(1);
		}
	}	
	
	else if (moneyEnemy >= 200 && numberOfMinersEnemy2 > 0 && numberOfDestructorsEnemy == 1 && numberOfBuildersEnemy2 > 0 && numberOfMinersEnemy2 > numberOfBuildersEnemy2 ){
			buyBuilderEnemy(1);
	}	
	else if (moneyEnemy >= 200 && numberOfMinersEnemy2 > 0 && numberOfDestructorsEnemy == 1 && numberOfBuildersEnemy2 > 0 && numberOfMinersEnemy2 < numberOfBuildersEnemy2 ){
			buyMinerEnemy(1);
	}


	
}//end of the function






//AI functions to get another destructor, builder, miner
function buyMinerEnemy(number){
	if (numberOfMinersEnemy2 < 5) {
	if (moneyEnemy - 100 < 0) {
		// placeholder error, fix to display error in game
		alert("Not enough moneyEnemy to buy another minder! You need to have 100 diamonds.");
	}
	else{
	if (numberOfMinersEnemy < 5){
		// update moneyEnemy and miner count
		moneyEnemy = moneyEnemy - 100;
		numberOfMinersEnemy = numberOfMinersEnemy + number;
		numberOfMinersEnemy2 = numberOfMinersEnemy2 + number;
		new_miner_enemy = new EnemyMiners();
		Miners_player_array_enemy.push(new_miner_enemy);
	}
	else if (numberOfMinersEnemy == 5 && (Miners_player_array_enemy[0].isDead == true)){
		moneyEnemy = moneyEnemy - 100;
		Miners_player_array_enemy[0].birth();
		numberOfMinersEnemy2 = numberOfMinersEnemy2 + number;
		//break;
	} 
	else if (numberOfMinersEnemy == 5 && (Miners_player_array_enemy[1].isDead ==true)&& numberOfMinersEnemy2 < 5){
		moneyEnemy = moneyEnemy - 100;
		Miners_player_array_enemy[1].birth();
		numberOfMinersEnemy2 = numberOfMinersEnemy2 + number;
		//break;
	} 	
	 else if (numberOfMinersEnemy == 5 && (Miners_player_array_enemy[2].isDead == true)&& numberOfMinersEnemy2 < 5){
		moneyEnemy = moneyEnemy - 100;
		Miners_player_array_enemy[2].birth();
		numberOfMinersEnemy2 = numberOfMinersEnemy2 + number;
		//break;
	} 
	else if (numberOfMinersEnemy == 5 && (Miners_player_array_enemy[3].isDead == true)&& numberOfMinersEnemy2 < 5){
		moneyEnemy = moneyEnemy - 100;
		Miners_player_array_enemy[3].birth();
		numberOfMinersEnemy2 = numberOfMinersEnemy2 + number;
		//break;
	}
	 else if (numberOfMinersEnemy == 5 && (Miners_player_array_enemy[4].isDead == true)&& numberOfMinersEnemy2 < 5){
		moneyEnemy = moneyEnemy - 100;
		Miners_player_array_enemy[4].birth();
		numberOfMinersEnemy2 = numberOfMinersEnemy2 + number;
		//break;
	}
	else if (numberOfMinersEnemy2 > 5){ alert("You can have only 5 miners")}
    }
	
	}
	updateTimeMinerBuilderEnemy();	
	
	//miner = miner + number;
	document.getElementById("minerEnemy").innerHTML = numberOfMinersEnemy2;
	document.getElementById("moneyEnemy").innerHTML = moneyEnemy;
}





function buyBuilderEnemy(number){
	if (numberOfBuildersEnemy2 < 5) {
	if (moneyEnemy - 100 < 0) {
		// placeholder error, fix to display error in game
		alert("Not enough moneyEnemy to buy another minder! You need to have 100 diamonds.");
	}
	else{
	if (numberOfBuildersEnemy < 5){
		// update moneyEnemy and miner count
		moneyEnemy = moneyEnemy - 100;
		numberOfBuildersEnemy = numberOfBuildersEnemy + number;
		numberOfBuildersEnemy2 = numberOfBuildersEnemy2 + number;
		new_builder_enemy = new EnemyConstructor();
		//add new  builder to the array - will be used for drawing
		//??
		Constructor_player_array_enemy.push(new_builder_enemy);
		
	}

		
	else if (numberOfBuildersEnemy == 5 && (Constructor_player_array_enemy[0].isDead == true)){
		moneyEnemy = moneyEnemy - 100;
		Constructor_player_array_enemy[0].birth();
		numberOfBuildersEnemy2 = numberOfBuildersEnemy2 + number;
		//break;
	} 
	else if (numberOfBuildersEnemy == 5 && (Constructor_player_array_enemy[1].isDead ==true)&& numberOfBuildersEnemy2 < 5){
		moneyEnemy = moneyEnemy - 100;
		Constructor_player_array_enemy[1].birth();
		numberOfBuildersEnemy2 = numberOfBuildersEnemy2 + number;
		//break;
	} 	
	 else if (numberOfBuildersEnemy == 5 && (Constructor_player_array_enemy[2].isDead == true)&& numberOfBuildersEnemy2 < 5){
		moneyEnemy = moneyEnemy - 100;
		Constructor_player_array_enemy[2].birth();
		numberOfBuildersEnemy2 = numberOfBuildersEnemy2 + number;
		//break;
	} 
	else if (numberOfBuildersEnemy == 5 && (Constructor_player_array_enemy[3].isDead == true)&& numberOfBuildersEnemy2 < 5){
		moneyEnemy = moneyEnemy - 100;
		Constructor_player_array_enemy[3].birth();
		numberOfBuildersEnemy2 =numberOfBuildersEnemy2 + number;
		//break;
	}
	 else if (numberOfBuildersEnemy == 5 && (Constructor_player_array_enemy[4].isDead == true)&& numberOfBuildersEnemy2 < 5){
		moneyEnemy = moneyEnemy - 100;
		Constructor_player_array_enemy[4].birth();
		numberOfBuildersEnemy2 = numberOfBuildersEnemy2 + number;
		//break;
	}
	else if (numberOfBuildersEnemy2 > 5){ alert("You can have only 5 builders")}
    }
	updateTimeMinerBuilderEnemy();
	}	
	
	//miner = miner + number;
	document.getElementById("builderEnemy").innerHTML = numberOfBuildersEnemy2;
	document.getElementById("moneyEnemy").innerHTML = moneyEnemy;
}


function buyenemydestructor(number){
	if (numberOfDestructorsEnemy == 1 ){ alert("You can have only 1 enemydestructor!");}
	if (numberOfDestructorsEnemy  < 1 ){
	if (moneyEnemy - 200 < 0) {
		// placeholder error, fix to display error in game
		alert("You do not have enough moneyEnemy to buy a enemydestructor! You need 200 diamonds.");
	}
	else {
		// update moneyEnemy and miner count
		moneyEnemy = moneyEnemy - 200;
		numberOfDestructorsEnemy = numberOfDestructorsEnemy + number;
		enemydestructor.birth();
		innerMeterEnemy1.regenerate();
		//enemydestructor.isDead == false;
		enemydestructor.birth();
		
		
	}
}
	else{}
	//miner = miner + number;
	document.getElementById("destructorEnemy").innerHTML = numberOfDestructorsEnemy;
	document.getElementById("moneyEnemy").innerHTML = moneyEnemy;
}

// Restart Button object
restartBtn = {
	w: 100,
	h: 50,
	x: canvasWidth/2 - 50,
	y: canvasHeight/2 - 50,
	
	draw: function() {
		ctxBg.strokeStyle = "white";
		ctxBg.lineWidth = "2";
		ctxBg.strokeRect(this.x, this.y, this.w, this.h);
		
		ctxBg.font = "18px Arial, sans-serif";
		ctxBg.textAlign = "center";
		ctxBg.textBaseline = "middle";
		ctxBg.fillStlye = "white";
		ctxBg.fillText("Restart", canvasWidth/2-50, canvasHeight/2 );
	}
};

//ctxBg.drawImage(imgSprite, 0, 0, canvasWidth, canvasHeight, 0, 0, canvasWidth, canvasHeight);

// Function to run when the game overs
function gameOverLost() {
	ctxBg.fillStlye = "white";
	ctxBg.font = "40pt Arial, sans-serif";
	ctxBg.textAlign = "center";
	ctxBg.fillStyle = 'orange';
	ctxBg.textBaseline = "middle";
	ctxBg.fillText("Game Over. You lost!", canvasWidth/2, canvasHeight/2 -150);
	ctxBg.fillText("Your building has "+numberOfBricks_for_destruction+" bricks! ", canvasWidth/2, canvasHeight/2 -100);
	ctxBg.fillText("Your enemy has "+numberOfBricksEnemy+" bricks!", canvasWidth/2, canvasHeight/2 -50);
	ctxBg.fillText("AI either depleted your  ", canvasWidth/2, canvasHeight/2);
	ctxBg.fillText("resources or ", canvasWidth/2, canvasHeight/2 +50);
	ctxBg.fillText("has a taller building.", canvasWidth/2, canvasHeight/2  +100);
	//ctxBg.fillText("Game Over. You lost - Your building has "+numberOfBricks_for_destruction+" bricks! Your enemy has "+numberOfBricksEnemy+" bricks!", canvasWidth/2, canvasHeight/2 -100);
	
	// Stop the Animation
	cancelRequestAnimFrame(animation);
	cancelRequestAnimFrame(animation2);
	isPlaying = false;
	clearInterval(enemydestructor.moveInterval);
		clearInterval ( collectDiamonsEnemy );
	clearInterval ( addBrickEnemy);
		clearInterval ( collectDiamons );
	clearInterval ( addBrick );
	
	// Set the over flag
	//over = 1;
	
	// Show the restart button
	//restartBtn.draw();
}

function gameOverWon() {
	ctxBg.fillStlye = "white";
	ctxBg.font = "40pt Arial, sans-serif";
	ctxBg.textAlign = "center";
	ctxBg.fillStyle = 'orange';
	ctxBg.textBaseline = "middle";
	ctxBg.fillText("Game Over. You Won!", canvasWidth/2, canvasHeight/2 -150);
	ctxBg.fillText("Your building has "+numberOfBricks_for_destruction+" bricks! ", canvasWidth/2, canvasHeight/2 -100);
	ctxBg.fillText("Your enemy has "+numberOfBricksEnemy+" bricks!", canvasWidth/2, canvasHeight/2 -50);
	ctxBg.fillText("You either depleted enemies ", canvasWidth/2, canvasHeight/2);
	ctxBg.fillText("resources or.", canvasWidth/2, canvasHeight/2+50);
	ctxBg.fillText(" have a taller building.", canvasWidth/2, canvasHeight/2+100);
	//ctxBg.fillText("Your enemy has "+numberOfBricksEnemy+" bricks!", canvasWidth/2, canvasHeight/2 -50);
	// Stop the Animation
	cancelRequestAnimFrame(animation);
	cancelRequestAnimFrame(animation2);
	isPlaying = false;
		clearInterval ( collectDiamonsEnemy, time3  );
		clearInterval ( collectDiamonsEnemy );
	clearInterval ( addBrickEnemy);
		clearInterval ( collectDiamons );
	clearInterval ( addBrick );
	
	// Set the over flag
	//over = 1;
	
	// Show the restart button
	//restartBtn.draw();
}

function gameOverEven() {
	imgSprite.fillStlye = "white";
	imgSprite.font = "40pt Arial, sans-serif";
	imgSprite.textAlign = "center";
	ctxBg.fillStyle = 'orange';
	imgSprite.textBaseline = "middle";
	ctxBg.fillText("Game Over. Its a tie!", canvasWidth/2, canvasHeight/2 -150);
	ctxBg.fillText("Your building has "+numberOfBricks_for_destruction+" bricks! ", canvasWidth/2, canvasHeight/2 -100);
	ctxBg.fillText("Your enemy has "+numberOfBricksEnemy+" bricks!", canvasWidth/2, canvasHeight/2 -50);
	
	// Stop the Animation
	cancelRequestAnimFrame(animation);
	cancelRequestAnimFrame(animation2);
	clearInterval(enemydestructor.moveInterval);
			clearInterval ( collectDiamonsEnemy );
	clearInterval ( addBrickEnemy);
		clearInterval ( collectDiamons );
	clearInterval ( addBrick );
	//clearInterval(enemydestructor.moveInterval);
	isPlaying = false;
	
	// Set the over flag
	//over = 1;
	
	// Show the restart button
	//restartBtn.draw();
}


//decide the outcome of the game
//var message = text("Game Over! You lost")

function GameIsOver(){
	if(numberOfBricks == numberOfBricksEnemy_for_destruction == 45){
		//both winners
		gameOverEven();
		
	}
	//player and AI ran out of money , miners and builders
	else if(money <100 && numberOfMiners2 == 0 && numberOfBuilders2 == 0 && moneyEnemy < 100 && numberOfMinersEnemy2 == 0 && numberOfBuildersEnemy2 == 0){
		if(numberOfBricks_for_destruction == umberOfBricksEnemy_for_destruction){
		//both winners
		gameOverEven();
		}
		else if(numberOfBricks_for_destruction > umberOfBricksEnemy_for_destruction ){
		//you won
		gameOverWon();
		
		}
		else{//you lost}
		gameOverLost();
		
		}
	}
	//player does not have money, builders or miners, while the AI has miners and/or builders - THUS AI WILL WIN
	//Player has less than 100 diamonds, player does not have any miners or builder. AI has less than 100 diamonds, but it has builders left
	else if(money <100 && numberOfMiners2 == 0 && numberOfBuilders2 == 0 && moneyEnemy < 100   && numberOfBuildersEnemy2 > 0 && numberOfMinersEnemy2 == 0 && numberOfBricks_for_destruction < numberOfBricksEnemy_for_destruction){
		//you lost
		gameOverLost();
	}
	//Player has less than 100 diamonds, player does not have any miners or builder. AI has less than 100 diamonds, but it has miners left
	else if(money <100 && numberOfMiners2 == 0 && numberOfBuilders2 == 0 && moneyEnemy < 100   && numberOfBuildersEnemy2 == 0 && numberOfMinersEnemy2 > 0 && numberOfBricks_for_destruction < numberOfBricksEnemy_for_destruction){
		//you lost
		gameOverLost();
	}
	//Player has less than 100 diamonds, player does not have any miners or builder. AI has less than 100 diamonds, but it has miners  and builders left
	else if(money <100 && numberOfMiners2 == 0 && numberOfBuilders2 == 0 && moneyEnemy < 100   && numberOfBuildersEnemy2 > 0 && numberOfMinersEnemy2 > 0 && numberOfBricks_for_destruction < numberOfBricksEnemy_for_destruction){
		//you lost
		gameOverLost();
	}
			//AI has less than 100 diamonds, AI does not have any miners or builder. player has less than 100 diamonds, but it has miner left
	else if(money <100 && numberOfMiners2 > 0 && numberOfBuilders2 == 0 && moneyEnemy < 100   && numberOfBuildersEnemy2 == 0 && numberOfMinersEnemy2 == 0 && numberOfBricks_for_destruction > numberOfBricksEnemy_for_destruction){
		//AI lost
		gameOverWon();
	}
	//AI has less than 100 diamonds, AI does not have any miners or builder. player has less than 100 diamonds, but it has builders left
	else if(money <100 && numberOfMiners2 == 0 && numberOfBuilders2 > 0 && moneyEnemy < 100   && numberOfBuildersEnemy2 == 0 && numberOfMinersEnemy2 == 0 && numberOfBricks_for_destruction > numberOfBricksEnemy_for_destruction){
		//AI lost
		gameOverWon();
	}
	//AI has less than 100 diamonds, AI does not have any miners or builder. player has less than 100 diamonds, but it has builders and miners left
	else if(money <100 && numberOfMiners2 > 0 && numberOfBuilders2 > 0 && moneyEnemy < 100   && numberOfBuildersEnemy2 == 0 && numberOfMinersEnemy2 == 0  && numberOfBricks_for_destruction > numberOfBricksEnemy_for_destruction){
		//AI lost
		gameOverWon();
	}
		//player does not have money, builders or miners, while the AI has miners and/or builders - THUS AI WILL WIN
	else if(money <100 && numberOfMiners2 == 0 && numberOfBuilders2 == 0 && moneyEnemy >0   && numberOfBuildersEnemy2 > 0 && numberOfMinersEnemy2 == 0 && numberOfBricks_for_destruction < numberOfBricksEnemy_for_destruction){
		//you lost
		gameOverLost();
	}
	else if(money <100 && numberOfMiners2 == 0 && numberOfBuilders2 == 0 && moneyEnemy > 0   && numberOfBuildersEnemy2 == 0 && numberOfMinersEnemy2 > 0 && numberOfBricks_for_destruction < numberOfBricksEnemy_for_destruction){
		//you lost
		gameOverLost();
	}
	else if(money <100 && numberOfMiners2 == 0 && numberOfBuilders2 == 0 && moneyEnemy > 0   && numberOfBuildersEnemy2 > 0 && numberOfMinersEnemy2 > 0 && numberOfBricks_for_destruction < numberOfBricksEnemy_for_destruction){
		//you lost
		gameOverLost();
	}
		//AI does not have money, builders or miners, while the player has miners and/or builders - THUS player will win
	else if(money >0 && numberOfMiners2 > 0 && numberOfBuilders2 == 0 && moneyEnemy < 100   && numberOfBuildersEnemy2 == 0 && numberOfMinersEnemy2 == 0 && numberOfBricks_for_destruction > numberOfBricksEnemy_for_destruction){
		//AI lost
		gameOverWon();
	}
	else if(money >0 && numberOfMiners2 == 0 && numberOfBuilders2 > 0 && moneyEnemy < 100   && numberOfBuildersEnemy2 == 0 && numberOfMinersEnemy2 == 0 && numberOfBricks_for_destruction > numberOfBricksEnemy_for_destruction){
		//AI lost
		gameOverWon();
	}
	else if(money >0 && numberOfMiners2 > 0 && numberOfBuilders2 > 0 && moneyEnemy < 100   && numberOfBuildersEnemy2 == 0 && numberOfMinersEnemy2 == 0  && numberOfBricks_for_destruction > numberOfBricksEnemy_for_destruction){
		//AI lost
		gameOverWon();
	}
	else if(money >0 && numberOfMiners2 > 0 && numberOfBuilders2 > 0 && moneyEnemy < 100   && numberOfBuildersEnemy2 == 0 && numberOfMinersEnemy2 == 0  && numberOfBricks_for_destruction > numberOfBricksEnemy_for_destruction){
		//AI lost
		gameOverWon();
	}
	//if AI has less than 300 diamonds, no miners and not builders, AI looses
	else if(money >0 && numberOfMiners2 > 0 && numberOfBuilders2 > 0 && moneyEnemy < 300   && numberOfBuildersEnemy2 == 0 && numberOfMinersEnemy2 == 0  && numberOfDestructorsEnemy == 0){
		//AI lost
		gameOverWon();
	}
	else if( numberOfBricks_for_destruction <  45 && numberOfBricksEnemy_for_destruction ==45){
		//AI lost
		gameOverLost();
	}
	else if( numberOfBricks_for_destruction ==  45 && numberOfBricksEnemy_for_destruction < 45){
		//AI lost
		gameOverWon();
	}
	
	

}
//DATABASE INTERACTIONS
 //******not usable yet***********
 //just wanted to show how it will work


//deletes the previously saved robots already in database, if any
function deletePrevSavedGames()
{
	$.ajax({
		url: 'php/delete_contents.php', //php file; doesn't work yet! Need to know all variables to save
		dataType: 'json'
	});
}

//http://stackoverflow.com/questions/12027105/best-approach-to-add-records-into-db-using-php-ajax-mysql
function saveGame()
{
	deletePrevSavedGames();

	for(var i = 0; i < arrayOfRobots.length; i++)
	{
		//type in all game variables to be saved here
		var postData = {
			robot_id: i,
		    x_coord: arrayOfRobots[i].x,
		    y_coord: arrayOfRobots[i].y
			
			//

			//This is where we create key-value pairs with all the variables we need to save
			//Save it to postData object

			//

		};

		$.post('php/save_game.php', postData) //php file; doesn't work yet! Need to know all variables to save
		 .done(function(response) {
		    alert("Data Loaded: " + response); //can get rid of this
		});
	}
}