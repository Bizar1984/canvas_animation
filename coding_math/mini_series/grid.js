window.onload = function() {
    var canvas = document.getElementById("canvas"),
        c = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        gridSize = 40;

    drawGrid();


    function roundNearest(value, nearest) {
		return Math.round(value / nearest) * nearest;
	}


    document.body.addEventListener("mousemove", function(event) {
        c.clearRect(0, 0, width, height);
        drawGrid();

        var x = roundNearest(event.clientX, gridSize),
            y = roundNearest(event.clientY, gridSize);

        c.beginPath();
        c.arc(x, y, 20, 0, Math.PI * 2, false);
		c.fill();
    });
    
    function drawGrid() {
        c.beginPath();
        c.strokeStyle = "#ccc";
        for (var x = 0; x <= width; x += gridSize) {
            c.moveTo(x, 0);
            c.lineTo(x, height);
        }
        for (var y = 0; y <= height; y += gridSize) {
            c.moveTo(0, y);
            c.lineTo(width, y);
        }
        c.stroke();
    }
    
    
};
