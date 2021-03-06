window.onload = function () {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        sun = particle.create(width / 2, height / 2, 0, 0);

    
    var radius = 350,
        radiusNew = 50,
        angle = 0,
        angleNew = Math.PI / 2,
        speed = .005,
        speedNew = 12 * speed,
        x, y;
        
        
    

    update();


    function update() {
        context.clearRect(0, 0, width, height);

        // sunshine
        let alpha = .95;
        
        context.beginPath();
        context.fillStyle = "rgba(255, 100, 41, " + alpha + ")";
        context.arc(sun.x, sun.y, 60, Math.PI * 2, false);
        context.fill();
        
        // around the center
        xNew = width / 2 + Math.cos(angle) * radius;
        yNew = height / 2 + Math.sin(angle) * radius;

        // earth
        context.beginPath();
        context.fillStyle = "lightblue";
        context.arc(xNew, yNew, 15, Math.PI * 2, false);
        context.fill();

        angle += speed;
        if (angle > Math.PI * 2) {
            angle = 0;
        }

        
        // try and define a new dynamic center
        x = xNew + Math.cos(angleNew) * radiusNew;
        y = yNew + Math.sin(angleNew) * radiusNew;
        

        // now draw the damn moon
        context.beginPath();
        context.fillStyle = "azure";
        context.arc(x, y, 6, 0, Math.PI * 2, false);
        context.fill();

        angleNew += speedNew;

        


        



        
        
        requestAnimationFrame(update);
    }
};