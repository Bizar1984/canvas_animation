window.onload = function() {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight,
		gun = {
			x: 100,
			y: height,
			angle: -Math.PI / 4
		},
		cannonball = particle.create(gun.x, gun.y, 15, gun.angle, 0.2),
        isShooting = false,
        forceAngle = 0,
        forceSpeed = 0.1,
		rawForce = 0,
		target = {},
		counter = 0,
		explosionFired = false,
		colorArray = [
				'#198DBF',
				'#115E80',
				'#22BCFF',
				'#082F40',
				'#1EAAE6',
				'#6206C2',
				'#AC5CFF',
				'#9F42FF',
				'#9F1FFF',
				'#7EFF47',
			],
		particles = [],
		numParticles = 500;

	// fill the particles array
	for (let i = 0; i < numParticles; i++) {
		particles.push(particle.create(width / 2, height / 2, Math.random() * 8 + 1, Math.random() * Math.PI * 2, 0.02))

	};


	cannonball.radius = 7;

	setTarget();
	update();
	// without the update function here nothing is drawn

	function setTarget() {
		target.x = utils.randomRange(200, width);
		target.y = utils.randomRange(100, height - 80);
		target.radius = utils.randomRange(20, 80);

	}


	document.body.addEventListener("mousedown", onMouseDown);

	document.body.addEventListener("keydown", function(event) {
		switch(event.keyCode) {
			case 32: // space
				if(!isShooting) {
					shoot();
				}
				break;

			default:
				break;
		}
	});

	function shoot() {
		var force = utils.map(rawForce, -1, 1, 2, 20);
		cannonball.x = gun.x + Math.cos(gun.angle) * 40;
        cannonball.y = gun.y + Math.sin(gun.angle) * 40;
		cannonball.vx = Math.cos(gun.angle) * force;
		cannonball.vy = Math.sin(gun.angle) * force;

        isShooting = true;
		
	}

	function update() {
        if(!isShooting) {
            forceAngle += forceSpeed;
        }
        
        rawForce = Math.sin(forceAngle);
        if(isShooting) {
			cannonball.update();
			// this must be the actual animation of the bullet
			checkTarget();
		}

		// here we have the draw function
		draw();

		if(cannonball.y > height) {
            isShooting = false;
		}

		if(explosionFired == true) {
			for (let i = 0; i < numParticles; i++) {
				let p = particles[i];

				p.update();

				context.beginPath();
				context.arc(p.x, p.y, utils.lerp(p.getSpeed(), 0.0001, 1), Math.PI * 2, false);
				context.fillStyle = colorArray[2]
				context.fill();

			}
			counter++;
			console.log(counter);
			
			
		}
		

		
		requestAnimationFrame(update);
		
		
		
	}
	
	console.log("counter: " + counter);
	
	
	function checkTarget() {
		if(utils.circleCollision(target, cannonball)) {
			explosionFired = true;
			setTarget();
		}
	}

	function onMouseDown(event) {
		document.body.addEventListener("mousemove", onMouseMove);
		document.body.addEventListener("mouseup", onMouseUp);
		aimGun(event.clientX, event.clientY);
	}

	function onMouseMove(event) {
		aimGun(event.clientX, event.clientY);
	}

	function onMouseUp(event) {
		document.body.removeEventListener("mousemove", onMouseMove);
		document.body.removeEventListener("mouseup", onMouseUp);
		aimGun(event.clientX, event.clientY);
	}

	function aimGun(mouseX, mouseY) {
		gun.angle = utils.clamp(Math.atan2(mouseY - gun.y, mouseX - gun.x), -Math.PI / 2, -0.3);
	}

	function draw() {
        context.clearRect(0, 0, width, height);
        
        context.fillStyle = "#ccc";
        context.fillRect(10, height - 10, 20, -100);

        context.fillStyle = "#666";
        context.fillRect(10, height - 10, 20, utils.map(rawForce, -1, 1, 0, -100));
        // console.log(rawForce);
        context.fillStyle = "#000";
		context.beginPath();
		context.arc(gun.x, gun.y, 24, 0, Math.PI * 2, false);
		context.fill();

		context.save();
		context.translate(gun.x, gun.y);
		context.rotate(gun.angle);
		context.fillRect(0, -8, 40, 16);
		context.restore();

		context.beginPath();
		context.arc(cannonball.x,
					cannonball.y,
					cannonball.radius,
					0, Math.PI * 2, false);
		context.fill();

		context.fillStyle = "red";
		context.beginPath();
		context.arc(target.x, target.y, target.radius, 0, Math.PI * 2, false);
		context.fill();

		

	}

};