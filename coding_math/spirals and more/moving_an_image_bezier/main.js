window.addEventListener('load', eventWindowLoaded, false);

var bullseye;

function eventWindowLoaded() {
    bullseye = new Image();
    bullseye.src = "./bullseye.png";
    bullseye.onload = eventAssetsLoaded();
}

function eventAssetsLoaded() {
    canvasApp();
}

function canvasApp() {

    
        
    function drawScreen() {

        var t = player.t;

        // the equations
        var cx = 3 * (p1.x - p0.x);
        var bx = 3 * (p2.x - p1.x) - cx;
        var ax = p3.x - p0.x - cx - bx;

        var cy = 3 * (p1.y - p0.y);
        var by = 3 * (p2.y - p1.y) - cy;
        var ay = p3.y - p0.y - cy - by;

        var xt = ax * (t * t * t) + bx * (t * t) + cx * t + p0.x;
        var yt = ay * (t * t * t) + by * (t * t) + cy * t + p0.y;

        
        context.clearRect(0, 0, width, height);

        player.t += player.speed;

        if (player.t > 1) {
            player.t = 1;
            player.speed = -.006;
        }
        if (player.t < 0) {
            player.t = 0;
            player.speed = .006;
        }


        // bezier point zero
        context.font = "10px sans";
        context.fillStyle = "#09B0AA";
        context.beginPath();
        context.arc(p0.x, p0.y, 10, 0, Math.PI * 2, false);
        context.closePath();
        context.fill();
        context.fillStyle = "#FFFFFF";  
        context.fillText("0", p0.x - 2, p0.y + 4);

        // bezier control point one
        context.fillStyle = "#09B0AA";
        context.beginPath();
        context.arc(p1.x, p1.y, 10, 0, Math.PI * 2, false);
        context.closePath();
        context.fill();
        context.fillStyle = "#FFFFFF";  
        context.fillText("1", p1.x - 2, p1.y + 4);

        // bezier control point two
        context.fillStyle = "#09B0AA";
        context.beginPath();
        context.arc(p2.x, p2.y, 10, 0, Math.PI * 2, false);
        context.closePath();
        context.fill();
        context.fillStyle = "#FFFFFF";  
        context.fillText("2", p2.x - 2, p2.y + 4);

        // bezier end point
        context.fillStyle = "#09B0AA";
        context.beginPath();
        context.arc(p3.x, p3.y, 10, 0, Math.PI * 2, false);
        context.closePath();
        context.fill();
        context.fillStyle = "#FFFFFF";  
        context.fillText("3", p3.x - 2, p3.y + 4);

        context.closePath();

        // what is happening over here?
        // you subtract half of the image its width and height
        // apparently images have these properties without you needing to specify them
        player.x = xt-bullseye.width / 2;
        player.y = yt-bullseye.height / 2;
        context.drawImage(bullseye, player.x, player.y);
        

    }
    // end of drawscreen

    var p0 = {x:150, y:440},
        p1 = {x:450, y:10},
        p2 = {x:50, y:10},
        p3 = {x:325, y:450},
        player = {x: 0, y: 0, speed: .01, t:0},

        canvas = document.getElementById("canvas");
        context = canvas.getContext("2d");
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;

        function gameLoop() {
            requestAnimationFrame(gameLoop);
            drawScreen();
        }
        gameLoop();




}
