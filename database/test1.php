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


			function handleClick(event)
			{
				//console.log("handleClick");
				var bmp = new createjs.Bitmap("assets/robotbuilder.png");
				bmp.x = Math.floor(Math.random()*500);
				bmp.y = Math.floor(Math.random()*500);
				console.log("x=", bmp.x);
				console.log("y=", bmp.y);


				stage.addChild(bmp);
				//stage.update();

				//createjs.Sound.play("sound");
				//console.log("clicked");




			}

			function tick(event)
			{
				//console.log("tick");
				stage.update();
			}



		</script>


	</head>
	<body onload="init()">
		<canvas id="myCanvas" width="500" height="500">
			Alternative Content
		</canvas>
	</body>
</html>