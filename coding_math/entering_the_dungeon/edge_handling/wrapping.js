window.onload = function() {
    var canvas = document.getElementById("canvas"),
        c = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        p = particle.create(width / 2, height / 2, 3, Math.random() * Math.PI * 2);

    p.radius = 20;

    update();
    
    function update() {
        c.clearRect(0, 0, width, height);

        p.update();

        c.beginPath();
        c.arc(p.position.getX(), p.position.getY(), p.radius, 0, Math.PI * 2, false);
        c.fill();

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