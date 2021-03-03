window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        particles = [],
        numParticles = 500,
        particlesTwo = [],
        numParticlesTwo = 700,
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
    ]

    for(var i = 0; i < numParticles; i++ ) {
        particles.push(particle.create(width / 2, height / 3, Math.random() * 5 + 2,  // x, y, speed, direction and gravity!
        Math.random() * Math.PI * 2, 0.06));
    };

    for(var j = 0; j < numParticlesTwo; j++ ) {
        particlesTwo.push(particle.create(width / 2, height / 3, Math.random() * 10 + 2,  // x, y, speed, direction and gravity!
        Math.random() * Math.PI * 2, 0.14));
    };

    
    update();

    function update() {
        context.clearRect(0, 0, width, height);

        for(var i = 0; i < numParticles; i++) {
            var p = particles[i];
            for(var j = 0; j < numParticlesTwo; j++) {
                var j = particlesTwo[i];

            

        
        p.update();
        j.update();

        context.beginPath();
        context.arc(j.x, j.y, 1.8, Math.PI * 2, false);
        context.fillStyle = colorArray[7]; 
        context.fill();

        context.beginPath();
        context.arc(p.x, p.y, 4, Math.PI * 2, false);
        context.fillStyle = colorArray[4]; 
        context.fill();
        // position is now a property of the particle, he owns that shit..

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



