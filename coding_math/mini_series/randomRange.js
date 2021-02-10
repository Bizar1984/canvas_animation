window.onload = function() {
    var canvas = document.getElementById("canvas"),
        c = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight;

    function randomRange(min, max) {
        return min + Math.random() * (max - min);
    }
        

    for (let i = 0; i < 150; i += 1) {
        c.beginPath();
        c.fillStyle = "red";
        c.arc(randomRange(0, width * .33),
              randomRange(0, height),
              randomRange(10, 40),
              0, Math.PI * 2, false);
        c.fill();

        c.beginPath();
        c.fillStyle = "green";
        c.arc(randomRange(width * .35, width * .66),
              randomRange(0, height),
              randomRange(10, 40),
              0, Math.PI * 2, false);
        c.fill();

        c.beginPath();
        c.fillStyle = "blue";
        c.arc(randomRange(width * .68, width),
              randomRange(0, height),
              randomRange(10, 40),
              0, Math.PI * 2, false);
        c.fill();
        

        
        
    }

};
