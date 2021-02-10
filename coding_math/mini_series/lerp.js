window.onload = function() {
    var canvas = document.getElementById("canvas"),
        c = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        minX = 50,
        maxX = width - 50,
        minY = 100,
        maxY = height - 100,
        minAlpha = 0,
        maxAlpha = 1,
        minRadius = 10,
        maxRadius = 400,
        t = 0;
        // t will go from 0 to 1


    function lerp(norm, min, max) {
        return (max - min) * norm + min;
    }
    
    render() 
    
    function render() {
        c.clearRect(0, 0, width, height);

        c.globalAlpha = lerp(t, maxAlpha, minAlpha);
        // when t = 0, terp returns max alpha
        c.beginPath();
        c.arc(lerp(t, minX, maxX),
              lerp(t, minY, maxY),
              lerp(t, minRadius, maxRadius),
              0, Math.PI * 2, false);
            //   console.log(lerp(t, minY, maxY));

        c.fill();
             

        t += .003;
        if (t > 1) {
            t = 0;
        }

        requestAnimationFrame(render);
    };

    
};
