window, addEventListener("load", eventWindowLoaded, false);

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

  // global stuff
  theCanvas = document.getElementById("canvasOne");
  c = theCanvas.getContext("2d");

  theCanvasTwo = document.getElementById("canvasTwo");
  cTwo = theCanvasTwo.getContext("2d");

  var scaleFactor = 30;

  var b2Vec2 = Box2D.Common.Math.b2Vec2,
    b2BodyDef = Box2D.Dynamics.b2BodyDef,
    b2Body = Box2D.Dynamics.b2Body,
    b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
    b2World = Box2D.Dynamics.b2World,
    b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
    b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
    b2DebugDraw = Box2D.Dynamics.b2DebugDraw;

  var world = new b2World(new b2Vec2(0, 0), true);
  console.log(world);

  var numBalls = 10;
  var balls = new Array();
  for (var i = 0; i < numBalls; i++) {
    var ballDef = new b2BodyDef();
    ballDef.type = b2Body.b2_dynamicBody;
    var ypos = (Math.random() * theCanvas.height) / scaleFactor;
    var xpos = (Math.random() * theCanvas.width) / scaleFactor;
    var size = (utils.randomRange(4, 16)) / scaleFactor;
    ballDef.position.Set(xpos, ypos);
    var ballFixture = new b2FixtureDef();
    ballFixture.density = 10.0;
    ballFixture.friction = 0.5;
    // restitution appears like bounce
    ballFixture.restitution = 0.6;
    // define the shape and pass in random size as parameter
    ballFixture.shape = new b2CircleShape(size);
    var newBall = world.CreateBody(ballDef);
    newBall.CreateFixture(ballFixture);
    var xVelocity = utils.randomRange(-5, 5);
		var yVelocity = utils.randomRange(-4, 4);
		newBall.SetLinearVelocity(new b2Vec2(xVelocity,yVelocity))
    balls.push(newBall);

    console.log(ballDef.position)
    console.log(ballFixture.shape)
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
    } // right
  );

  var walls = new Array();
  for (var i = 0; i < wallDefs.length; i++) {
    // b2BodyDef holds the definitions we need to define a rigid body
    var wallDef = new b2BodyDef();
    // staticBody will never move and has infinite mass
    wallDef.type = b2Body.b2_staticBody;
    // set location coordinates
    wallDef.position.Set(wallDefs[i].x / scaleFactor, wallDefs[i].y / scaleFactor);
    // create the rigid body
    var newWall = world.CreateBody(wallDef);
    var wallFixture = new b2FixtureDef();
    wallFixture.density = 10.0;
    wallFixture.friction = 0.5;
    wallFixture.restitution = 1;
    wallFixture.shape = new b2PolygonShape();
    // draw the walls
    wallFixture.shape.SetAsBox(wallDefs[i].w / scaleFactor, wallDefs[i].h / scaleFactor);
    // close the loop by calling the createFixture method of our rigid body. This sets the fixture and shape to the rigid body
    newWall.CreateFixture(wallFixture);
    // add the rigid body to the walls array
    walls.push(newWall);

  }


  // debubDraw is just a way to see how it works in your browser
  // it is NOT an implementation of the physics for your application
  var debugDraw = new b2DebugDraw();
  // overwrite the entire context of the canvas
  debugDraw.SetSprite(cTwo);
  debugDraw.SetDrawScale(scaleFactor); //define scale
  debugDraw.SetFillAlpha(0.5); //define transparency
  debugDraw.SetLineThickness(1.0);
  debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
  world.SetDebugDraw(debugDraw);


  function drawScreen() {
    // step takes three parameters, time step, velocity iterations and position iterations
    // time step is how much time is in the simulation to simulate on every call
    // the smaller the amount of time, the slower it goes
    world.Step(1 / 60, 10, 10);
    world.DrawDebugData();
    // reset physics model
    world.ClearForces();

    c.fillStyle = '#EEEEEE';
    c.clearRect(0, 0, theCanvas.width, theCanvas.height);
    c.strokeStyle = 'white';
    c.strokeRect(1, 1, theCanvas.width - 2, theCanvas.height - 2);

    for(i = 0; i < balls.length; i++) {
      let position = balls[i].GetPosition();
      let fixtureList = balls[i].GetFixtureList();
      let shape = fixtureList.GetShape();

      c.fillStyle = 'yellow';
      c.beginPath();
      c.arc(position.x * scaleFactor, position.y * scaleFactor, shape.GetRadius() * scaleFactor, 0, Math.PI * 2, true);
      c.closePath();
      c.fill();
    }
  }

  function gameLoop() {
    window.requestAnimationFrame(gameLoop);
    drawScreen();
  }

  gameLoop();
}
