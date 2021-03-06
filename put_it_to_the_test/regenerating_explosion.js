window.onload = function () {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
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
        numParticles = 125;
        

    // fill the particles array
    for(let i = 0; i < numParticles; i++) {
        particles.push(particle.create(width / 2, height / 2, Math.random() * 8 + 1, Math.random() * Math.PI * 2, 0.02))
        
    };
    
    
    


    update();
 
    function update() {
        context.clearRect(0, 0, width, height);

        for(let i = 0; i < numParticles; i++) {
            let p = particles[i];

            p.update();

            context.beginPath();
            context.arc(p.x, p.y, utils.lerp(p.getSpeed(), 0.00001, 1), Math.PI * 2, false);
            context.fillStyle = colorArray[2]
            context.fill();

            // console.log("heading: " + p.getHeading());

            if(p.y - p.radius > height || p.y - p.radius < 0) {
                p.x = width / 2;
                p.y = height / 2;
                p.setSpeed(Math.random() * 4 + 2);
                p.setHeading(Math.random() * Math.PI * 2);
            }
            if (p.x - p.radius > width || p.x - p.radius < 0) {
                p.x = width / 2;
                p.y = height / 2;
                p.setSpeed(Math.random() * 8 + 1);
                p.setHeading(Math.random() * Math.PI * 2);
            }



        }

        
    





    requestAnimationFrame(update);

    }

}


