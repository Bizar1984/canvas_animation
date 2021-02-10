window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        p = particle.create(100, height, 10, -Math.PI / 2);
        accel = vector.create(0.3, 0.15);
    
    update();
    // adding velocity to acceleration and acceleration to position: Euler method
    function update() {
        context.clearRect(0, 0, width, height);

        p.accelerate(accel);

        p.update();

        context.beginPath();
        context.arc(p.position.getX(), p.position.getY(), 10, 0, Math.PI * 2, false);
        context.fill();
        

        

        requestAnimationFrame(update);
    
    }

};

// update function calls particle.update()
    // particle.update calls vector.addTo()
        // vector.addTo calls vector.getX()
        // Last call! vector.getY()


var v1 = vector.create(10, 10);

console.log(v1.getX());
console.log(v1.getY());
console.log(v1.getLength());
console.log(v1.getAngle());

console.log(v1.getAngle() * 180 / Math.PI)



