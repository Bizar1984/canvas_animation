window.onload = function() {
    var canvas = document.getElementById("canvas"),
        c = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        centerX = width / 2,
        centerY = height / 2;
        
    
    
    
    function distanceXY(x0, y0, x1, y1) {
        let dx = x1 - x0,
            dy = y1 - y0;
        return Math.sqrt(dx * dx + dy * dy)
    }
        

    document.body.addEventListener("mousemove", function(event) {
        c.clearRect(0, 0, width, height);

        let dist = distanceXY(centerX, centerY, event.clientX, event.clientY);
        console.log(dist);
    
        if (dist > 200) {
            c.fillStyle = "#ff6666";
        }
        else {
            c.fillStyle = "#cccccc";
        }

        c.beginPath();
        c.arc(centerX, centerY, 200, 0, Math.PI * 2, false);
        
		c.fill();
	});

};
