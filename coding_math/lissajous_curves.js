window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight;

    

    var centerX = width / 2,
    	centerY = height /2,
        xRadius = 200,
        yRadius = 200,
        xAngle = 0,
        yAngle = 0,
        xSpeed = .01,
        ySpeed = .04,
        x, y;
        
        
    render();

    function render() {

        context.clearRect(0, 0, width, height);

        x = centerX + Math.sin(xAngle) * xRadius;
        y = centerY + Math.cos(yAngle) * yRadius;
    
    	
        context.beginPath();
    	context.arc(x, y, 25, 0, Math.PI * 2, false);
    	context.fill();

    	xAngle += xSpeed;
        yAngle += ySpeed;
        
        
        
        requestAnimationFrame(render);
    }
};
