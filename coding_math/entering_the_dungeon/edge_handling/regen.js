window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        particles = [],
        numParticles = 100;
        
    
    for(var i = 0; i < numParticles; i++ ) {
        var p = particle.create(width / 2, height, Math.random() * 8 + 5,  // x, y, speed, direction and gravity!
        -Math.PI / 2 + (Math.random() * .2 -.1), 0.1);
        p.radius = Math.random() * 8 + 5;
        particles.push(p);
    };

    // how to add some different colors, radii and/or starting points? mmmmmmzzzzz...
    // different colors working, but the colors seem to be updated on each frame, like disco, disco! why is this happening?
    update();

    function update() {
        context.clearRect(0, 0, width, height);

        for(var i = 0; i < numParticles; i+= 1) {
            var p = particles[i];

        
        p.update();

        
        context.beginPath();
        context.arc(p.position.getX(), p.position.getY(), p.radius, 0, Math.PI * 2, false);
        context.fill();
        // position is now a property of the particle, he owns that shit..
        
        if(p.position.getY() - p.radius > height) {
            p.position.setX(width / 2);

            p.position.setY(height);
            p.velocity.setLength(Math.random() * 8 + 5);
            p.velocity.setAngle(-Math.PI / 2 + (Math.random() * .2 -.1));
        }
        
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



