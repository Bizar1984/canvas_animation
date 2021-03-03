window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        p = particle.create(width / 2, height / 2, 80, Math.PI * 2),
        friction_simplified = 0.999;

    p.radius = 10;

        


    update();

    function update() {
        context.clearRect(0, 0, width, height);

        // simplified method, no real friction
        p.velocity.multiplyBy(friction_simplified);

        p.update();

        console.log(p.velocity);
        

        

        
    
        

        
        context.beginPath();
        // position is now a property of the particle, he owns that shit..
        context.arc(p.position.getX(), p.position.getY(), p.radius, Math.PI * 2, false);
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

        

        

        requestAnimationFrame(update);
    
    }

};




