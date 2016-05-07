<!DOCTYPE html>
<html>
	<head>
		<script src="https://code.createjs.com/createjs-2015.11.26.min.js"> </script>
		<script
			  src="https://code.jquery.com/jquery-1.12.3.min.js"
			  integrity="sha256-aaODHAgvwQW1bFOGXMeX+pC4PZIPsvn2h1sArYOhgXQ="
			  crossorigin="anonymous"></script>
		<script>

			var stage;
			var queue;

			function init()
			{
				stage = new createjs.Stage("myCanvas");

				//queue = new createjs.LoadQueue(false);
				//console.log("loadqueue");
				//queue.installPlugin(createjs.Sound);
				//queue.addEventListener("fileload", handleComplete);
				//console.log("fileload");
				//queue.loadManifest([{id:"daisy", src:"assets/daisy.png"}]);//, {id:"sound", src:"assets/pop.mp3"}]);
				//console.log("manifest");
				//createjs.Sound.registerSound("assets/pop.mp3", "sound");
				//createjs.Sound.addEventListener("fileload", handleComplete);

				var ball = new createjs.Shape();
				ball.addEventListener("click", handleClick);
				ball.graphics.beginFill("#000000").drawCircle(0,0,50);
				ball.x = 50;
				ball.y = 200;

				createjs.Tween.get(ball, {loop:true}).to({x:450}, 3000).to({x:50}, 3000);
				createjs.Ticker.addEventListener("tick", tick);

				stage.addChild(ball);

			}

			function logMe() 
			{
			        console.log(this.x + " " + this.y);
			}

			var arrayOfRobots = new Array();
			var robotIndex = 0;

			function displayXY()
			{
				for (var i = 0; i < arrayOfRobots.length; i++)
				{
					console.log("robot at index " + i + " x=" + arrayOfRobots[i].x + " y=" + arrayOfRobots[i].y);
				}
			}


			function handleClick(event)
			{
				//console.log("handleClick");
				arrayOfRobots[robotIndex] = new createjs.Bitmap("assets/robotbuilder.png");
				arrayOfRobots[robotIndex].x = Math.floor(Math.random()*500);
				arrayOfRobots[robotIndex].y = Math.floor(Math.random()*300);
				console.log("x=", arrayOfRobots[robotIndex].x);
				console.log("y=", arrayOfRobots[robotIndex].y);


				stage.addChild(arrayOfRobots[robotIndex]);
				//stage.update();

				//createjs.Sound.play("sound");
				//console.log("clicked");

				console.log("# of robots: " + arrayOfRobots.length);
				robotIndex++;
				displayXY();

			}



			function tick(event)
			{
				//console.log("tick");
				stage.update();
			}


			function saveRobotCoords()
			{
				for (var i = 0; i < arrayOfRobots.length; i++)
				{
					var postData = {
						robot_id: i,
					    x_coord: arrayOfRobots[i].x,
					    y_coord: arrayOfRobots[i].y
					};

					$.post('test2.php', postData)
					 .done(function(response) {
					    alert("Data Loaded: " + response);
					});
				}
			}


			function loadSavedRobots()
			{
				$.ajax({
					url: 'loadtest2.php',
					dataType: 'json'
				}).done(
				   	function(data){
						//var tag_name = data[0];
						//var client_id = data[1];
						console.log(data.length);
						for (var j = 0; j < data.length; j += 3)
						{
							arrayOfRobots[j] = new createjs.Bitmap("assets/robotbuilder.png");
							arrayOfRobots[j].x = data[j + 1];
							arrayOfRobots[j].y = data[j + 2];

							stage.addChild(arrayOfRobots[j]);
							robotIndex++;
						}
				   }
				);
			}

		</script>


	</head>
	<body onload="init()">

		<canvas id="myCanvas" width="500" height="300">
			Alternative Content
		</canvas>
		
		<button onclick="saveRobotCoords()">Save Game</button> 
		<button onclick="loadSavedRobots()">Load Game</button> 
		
	</body>
</html>