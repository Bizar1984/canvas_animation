window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        p = particle.create(100, height / 2, .5, Math.PI, 0.2);
        accel = vector.create(0.8, 0);
    
    update();

    // adding velocity to acceleration and acceleration to position: Euler method
    function update() {
        context.clearRect(0, 0, width, height);

        p.accelerate(accel);
        p.velocity.multiplyBy(0.9);

        p.update();

        context.beginPath();
        context.arc(p.position.getX(), p.position.getY(), 10, 0, Math.PI * 2, false);
        context.fill();

        if(p.position.getX() - p.radius > width) {
            p.position.setX(-p.radius);
        }
        if(p.position.getX() + p.radius < 0) {
            p.position.setX(width + p.radius);
        }
        if(p.position.getY() - p.radius > height) {
            p.position.setY(-p.radius);
        }
        if(p.position.getY() + p.radius < 0) {
            p.position.setY(height + p.radius);
        }

        console.log(p.position);
        
        

        

        requestAnimationFrame(update);
    
    }

};

// update function calls particle.update()
    // particle.update calls vector.addTo()
        // vector.addTo calls vector.getX()
        // last call! vector.getY()
        // let us check this with the debugger... seeing is believing!


var v1 = vector.create(10, 30);

console.log(v1.getX());
console.log(v1.getY());
console.log(v1.getLength());
console.log(v1.getAngle());

console.log(v1.getAngle() * 180 / Math.PI)



