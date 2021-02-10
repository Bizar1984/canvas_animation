window.onload = function() {
    var canvas = document.getElementById("canvas"),
        c = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight;
        
    function norm(value, min, max) {
        return (value - min) / (max - min);
    }

    function lerp(norm, min, max) {
        return (max - min) * norm + min;
    }
    
    function map(value, sourceMin, sourceMax, destMin, destMax) {
        let n = norm(value, sourceMin, sourceMax);
        // console.log(n);
        // n returns a value between 0 and 1 as you scroll over the entire axis (y, or x)
        return lerp(n, destMin, destMax);
        // return
    }

    document.body.addEventListener("mousemove", function(event) {
        let radius = map(event.clientX, 0, width, 5, 340);
        console.log(radius);
        c.clearRect(0, 0, width, height);
        c.beginPath();
        c.arc(width / 2, height / 2, radius, 0, Math.PI * 2, false);
		c.fill();
	});

};
