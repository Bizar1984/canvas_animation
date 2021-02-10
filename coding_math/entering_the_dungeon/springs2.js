window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        particleA = particle.create(utils.randomRange(0, width),
                                    utils.randomRange(0, height),
                                    utils.randomRange(0, 400),
                                    utils.randomRange(0, Math.PI * 2),
                                    utils.randomRange(0, 1)),
        particleB = particle.create(utils.randomRange(0, width),
                                    utils.randomRange(0, height),
                                    utils.randomRange(0, 250),
                                    utils.randomRange(0, Math.PI * 2),
                                    utils.randomRange(0, 1)),
        particleC = particle.create(utils.randomRange(0, width),
                                    utils.randomRange(0, height),
                                    utils.randomRange(0, 50),
                                    utils.randomRange(0, Math.PI * 2),
                                    utils.randomRange(0, 1)),
        particleD = particle.create(utils.randomRange(0, width),
                                    utils.randomRange(0, height),
                                    utils.randomRange(0, 50),
                                    utils.randomRange(0, Math.PI * 2),
                                    utils.randomRange(0, 1)),
        

        k = 0.01,
        separation = 400;

    particleA.friction = 0.9;
    particleA.radius = 40;

    particleB.friction = 0.8;
    particleB.radius = 30;

    particleC.friction = 0.2;
    particleC.radius = 20;

    particleD.friction = 0.9;
    particleD.radius = 60;

    
    update();

    function update() {
        context.clearRect(0, 0, width, height);

        spring(particleA, particleB, separation);
        spring(particleB, particleC, separation);
        spring(particleC, particleA, separation);

        spring(particleB, particleD, separation);
        spring(particleD, particleA, separation);
        spring(particleD, particleC, separation);
        
        particleA.update();
        particleB.update();
        particleC.update();
        particleD.update();
        
        edge_handling(particleA);
        edge_handling(particleB);
        edge_handling(particleC);
        edge_handling(particleD);

        // first particle
        context.beginPath();
        context.fillStyle = "#FFDB6A";
        context.arc(particleA.position.getX(), particleA.position.getY(),
                    particleA.radius, 0, Math.PI * 2, false);
        context.fill();

         // second particle
        context.beginPath();
        context.fillStyle = "#FFCA22";
        context.arc(particleB.position.getX(), particleB.position.getY(),
                    particleB.radius, 0, Math.PI * 2, false);
        context.fill();

         // third particle
        context.beginPath();
        context.fillStyle = "#FF9622";
        context.arc(particleC.position.getX(), particleC.position.getY(),
                    particleC.radius, 0, Math.PI * 2, false);
        context.fill();

        // fourth particle
        context.beginPath();
        context.fillStyle = "#E77900";
        context.arc(particleD.position.getX(), particleD.position.getY(),
                    particleD.radius, 0, Math.PI * 2, false);
        context.fill();

        // connecting them with a line
        context.beginPath();
        context.strokeStyle = "#9E2602";
        context.moveTo(particleA.position.getX(), particleA.position.getY());
        context.lineTo(particleB.position.getX(), particleB.position.getY());
        context.moveTo(particleC.position.getX(), particleC.position.getY());
        context.lineTo(particleA.position.getX(), particleA.position.getY());
        
        context.moveTo(particleA.position.getX(), particleA.position.getY());
        context.lineTo(particleD.position.getX(), particleD.position.getY());

        
        context.stroke();


       requestAnimationFrame(update);
    
    }

    function spring(p0, p1, separation) {
        var distance = p0.position.subtract(p1.position);
        distance.setLength(distance.getLength() - separation);

        var springForce = distance.multiply(k);

        p1.velocity.addTo(springForce);
        p0.velocity.subtractFrom(springForce);
    }

    function edge_handling(p) {
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
        
    }

};




