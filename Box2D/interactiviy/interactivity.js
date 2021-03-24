window.addEventListener("load", eventWindowLoaded, false);

function eventWindowLoaded() {
	canvasApp();
}

function canvasSupport() {
	return Modernizr.canvas;
}

function canvasApp() {
	if (!canvasSupport()) {
		return;
	}

	function drawScreen() {
		world.Step(1 / 60, 10, 10);
		world.DrawDebugData();
		world.ClearForces();

		context.strokeStyle = "white";
		context.fillStyle = "orange";
		context.fillRect(0, 0, theCanvas.width, theCanvas.height);
		//Box
		context.fillStyle = "#000000";
		context.strokeRect(1, 1, theCanvas.width - 2, theCanvas.height - 2);
		for (i = 0; i < boxes.length; i++) {
			var position = boxes[i].GetPosition();
			var fixtureList = boxes[i].GetFixtureList();
			var shape = fixtureList.GetShape();
			// retrieve the object saved in userData
			var userData = boxes[i].GetUserData();
			context.save();
			context.setTransform(1, 0, 0, 1, 0, 0);
			// translate to the center of the box
			context.translate(position.x * scaleFactor, position.y * scaleFactor);
			// rotate the canvas to the angle of the box
			context.rotate(boxes[i].GetAngle());

			context.fillRect(
				0 - (userData.width * scaleFactor) / 2,
				0 - (userData.height * scaleFactor) / 2,
				userData.width * scaleFactor,
				userData.height * scaleFactor
			);
			context.restore();
		}

		for (i = 0; i < balls.length; i++) {
			var position = balls[i].GetPosition();
			var fixtureList = balls[i].GetFixtureList();
			var shape = fixtureList.GetShape();
			context.fillStyle = "#40FD14";
			context.beginPath();
			context.arc(position.x * scaleFactor, position.y * scaleFactor, shape.GetRadius() * scaleFactor, 0, Math.PI * 2, true);
			context.closePath();
			context.fill();
		}
	}

	function createBall(event) {
		let x;
		let y;
		if (event.pageX || event.pageY) {
			x = event.pageX;
			y = event.pageY;
		} else {
			x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			y = e.clientX + document.body.scrollTop + document.documentElement.scrollTop;
		}

		x -= theCanvas.offsetLeft;
		y -= theCanvas.offsetTop;

		mouseX = x;
		mouseY = y;

		var ballDef = new b2BodyDef();
		ballDef.type = b2Body.b2_dynamicBody;
		var ypos = mouseY / scaleFactor;
		var xpos = mouseX / scaleFactor;
		var size = 7 / scaleFactor;
		ballDef.position.Set(xpos, ypos);
		var ballFixture = new b2FixtureDef();
		ballFixture.density = 30.0;
		ballFixture.friction = 0.6;
		// restitution appears like bounce
		ballFixture.restitution = 0.2;
		// define the shape and pass in random size as parameter
		ballFixture.shape = new b2CircleShape(size);
		var newBall = world.CreateBody(ballDef);
		newBall.CreateFixture(ballFixture);
		var xVelocity = 15;
		var yVelocity = 0;
		newBall.SetLinearVelocity(new b2Vec2(xVelocity, yVelocity))
		balls.push(newBall);

	}

	var theCanvas = document.getElementById("canvasOne");
	var context = theCanvas.getContext("2d");

	var theCanvasTwo = document.getElementById("canvasTwo");
	var context2 = theCanvasTwo.getContext("2d");

	theCanvas.addEventListener("mouseup", createBall, false);

	var scaleFactor = 30;
	var b2Vec2 = Box2D.Common.Math.b2Vec2,
		b2BodyDef = Box2D.Dynamics.b2BodyDef,
		b2Body = Box2D.Dynamics.b2Body,
		b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
		b2World = Box2D.Dynamics.b2World,
		b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
		b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
		b2DebugDraw = Box2D.Dynamics.b2DebugDraw;

	var world = new b2World(new b2Vec2(0, 20), true);
	//world.SetGravity(0);
	var numBoxes = 10;
	var boxes = new Array();
	var balls = new Array();
	var boxHeight = 25;
	var boxWidth = 25;
	var startX = theCanvas.width - 100;
	var startY = theCanvas.height - boxHeight - 100;
	for (var i = 0; i < numBoxes; i++) {
		var boxDef = new b2BodyDef();
		boxDef.type = b2Body.b2_dynamicBody;
		var ypos = (startY - (i * boxHeight)) / scaleFactor;
		// offset the x position 2 pixels to the right
		var xpos = (startX) / scaleFactor;

		boxDef.position.Set(xpos, ypos);
		var newBox = world.CreateBody(boxDef);
		var boxFixture = new b2FixtureDef();
		boxFixture.density = 20.0;
		boxFixture.friction = .5;
		boxFixture.restitution = 0.1;
		boxFixture.shape = new b2PolygonShape();
		boxFixture.shape.SetAsBox(
			boxWidth / scaleFactor / 2,
			boxHeight / scaleFactor / 2
		);
		newBox.CreateFixture(boxFixture);
		newBox.SetUserData({
			width: boxWidth / scaleFactor,
			height: boxHeight / scaleFactor,
		});
		boxes.push(newBox);
	}

	var wallDefs = new Array({
			x: theCanvas.width,
			y: 0,
			w: theCanvas.width,
			h: 1
		}, //top
		{
			x: theCanvas.width,
			y: theCanvas.height,
			w: theCanvas.width,
			h: 1
		}, //bottom
		{
			x: 0,
			y: theCanvas.height,
			w: 1,
			h: theCanvas.height
		}, //left
		{
			x: theCanvas.width,
			y: theCanvas.height,
			w: 1,
			h: theCanvas.height
		}
	); //right
	var walls = new Array();
	for (var i = 0; i < wallDefs.length; i++) {
		var wallDef = new b2BodyDef();
		wallDef.type = b2Body.b2_staticBody;
		wallDef.position.Set(
			wallDefs[i].x / scaleFactor,
			wallDefs[i].y / scaleFactor
		);
		var newWall = world.CreateBody(wallDef);
		var wallFixture = new b2FixtureDef();
		wallFixture.density = 10.0;
		wallFixture.friction = 0.5;
		wallFixture.restitution = .5;
		wallFixture.shape = new b2PolygonShape();
		wallFixture.shape.SetAsBox(
			wallDefs[i].w / scaleFactor,
			wallDefs[i].h / scaleFactor
		);
		newWall.CreateFixture(wallFixture);
		walls.push(newWall);
	}

	var debugDraw = new b2DebugDraw();
	debugDraw.SetSprite(context2);
	debugDraw.SetDrawScale(scaleFactor); //define scale
	debugDraw.SetFillAlpha(0.3); //define transparency
	debugDraw.SetLineThickness(1.0);
	debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
	world.SetDebugDraw(debugDraw);

	function gameLoop() {
		window.setTimeout(gameLoop, 20);
		drawScreen();
	}

	gameLoop();
}
