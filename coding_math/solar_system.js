window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight;
        
        
    var centerY = height * 0.5,
        centerX = width * 0.5,
        speed = 0.01,
        angle = 0;
        
    
    // The render animation function
    render();

    function render() {
        
        var radius = 125;
        
        x_earth = centerX + Math.cos(angle) * 500;
        y_earth = centerY + Math.sin(angle) * 300;
        x_unknown = centerX + Math.cos(angle) * 400;
        y_unknown = centerY + Math.sin(angle) * 225;
        
        // The sun
        context.fillStyle = "rgba(256, 175, 64, 1)";
        context.clearRect(0, 0, width, height);
    	context.beginPath();
    	context.arc(centerX, centerY, radius, 0, Math.PI * 2, false);
        context.fill();

        // The earth
        context.fillStyle = "rgba(0, 0, 255, 1)"
        context.beginPath();
        context.arc(x_earth, y_earth, 18, 0, Math.PI * 2, false);
        context.fill();

        // PlanetX
        context.fillStyle = "rgba(0, 255, 0, 1)";
        context.beginPath();
        context.arc(x_unknown, y_unknown, 8, 0, Math.PI * 2, false);
        context.fill();
        

        angle += speed;
       
        
        requestAnimationFrame(render);
    }
};
