window.onload = function() {
    var canvas = document.getElementById("canvas"),
        c = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        rect = {
            x: width / 2 - 200,
            y: height / 2 -150,
            width: 400,
            height: 300
        };
        
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

    function clampRefined(value, min, max) {
        // make sure the value isn't less than min
       var value = Math.max(value, min);
       // make sure the value isn't greater than max
       return Math.min(value, max);
   }

    document.body.addEventListener("mousemove", function(event) {
        let x = clampRefined(event.clientX, rect.x, rect.x + rect.width),
            y = clampRefined(event.clientY, rect.y, rect.y + rect.height);
        
        c.clearRect(0, 0, width, height);
        c.fillStyle = "#0ABF04";
        c.fillRect(rect.x - 20, rect.y - 20, rect.width + 40, rect.height + 40);

        c.fillStyle = "#057301";
        c.beginPath();
        c.arc(x, y, 20, 0, Math.PI * 2, false);
        c.fill();

	});

};
