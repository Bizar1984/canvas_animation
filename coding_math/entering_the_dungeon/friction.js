window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        p = particle.create(width / 2, height / 2, 10, Math.random() * Math.PI * 2),
        friction = vector.create(0.15, 0),
        friction_simplified = 0.97;

    p.radius = 10;

        


    update();

    function update() {
        context.clearRect(0, 0, width, height);

        // get the angle from the velocity vector 
        // and set this to the friction vector
        friction.setAngle(p.velocity.getAngle());
       
        
        
        //subtract the friction vector from the velocity vector
        // until velocity vector reaches zero
        // if (p.velocity.getLength() > friction.getLength()) {
        //     p.velocity.subtractFrom(friction);
                
        // }
        // else {
        //     p.velocity.setLength(0);
        // }

        // simplified method, no real friction
        p.velocity.multiplyBy(friction_simplified);

        p.update();

        
        context.beginPath();
        context.arc(p.position.getX(), p.position.getY(), p.radius, Math.PI * 2, false);
        context.fill();
        // position is now a property of the particle, he owns that shit..
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



