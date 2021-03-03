window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        centerX = width / 2;
        centerY = height / 2;

    

    var circle = {centerX: centerX, centerY: centerY, radius: 125, angle: 0},
        ball = {x: 0, y: 0, speed: .05},
        radiusInc = .5,
        p0 = {x:60, y:20},
        p1 = {x:70, y:200},
        p2 = {x:140, y:280},
        p3 = {x:450, y:350},
        bezierBall = {x:0, y:0, speed: .003, t:0},
        // bezierball starts at t: 0 and slowly climbes to 1 (speed is added to t value)
        minRadius = 10,
        maxRadius = 100;
        // t = 0;
        
        // linear interpolation
        function lerp(norm, min, max) {
            return (max - min) * norm + min;
        };

        
        
    render();

    function render() {

        var t = bezierBall.t;

        // the equations
        var cx = 3 * (p1.x - p0.x);
        var bx = 3 * (p2.x - p1.x) - cx;
        var ax = p3.x - p0.x - cx - bx;

        var cy = 3 * (p1.y - p0.y);
        var by = 3 * (p2.y - p1.y) - cy;
        var ay = p3.y - p0.y - cy - by;

        // these euqations will give you the x- and y coordinates for bezier movement
        var xt = ax * (t * t * t) + bx * (t * t) + cx * t + p0.x;
        var yt = ay * (t * t * t) + by * (t * t) + cy * t + p0.y;
        

        // some if statements to keep the movement contained
        // t value becomes 1? end of bezier movement, so we reverse the speed and start looping
        if (bezierBall.t > 1) {
            bezierBall.t = 1;
            bezierBall.speed = -.004;
        }

        if (bezierBall.t < 0) {
            bezierBall.t = 0;
            bezierBall.speed = .004;
        }

        // the radius is constantly increasing and we cannot let this happen, now can we?
        // let's reverse it at 400 px;
        if(circle.radius > 400) {
            radiusInc = -.5;
        }

        // radius is getting to minus, what will this do? Circle will exit the screen!
        // this happens because after the radius reaches -300 it will only increment. We cannot let this happen
        if(circle.radius < -300) {
            radiusInc = .5;
        }

    
        context.clearRect(0, 0, width, height);

        // spiral movement, retrieve those lovely coordinates
        // notice that without multiplying with circle.radius you get a static value (the center values)
        // this happens because we don't increment the angle, we increment the radius;
        ball.x = circle.centerX + Math.cos(circle.angle) * circle.radius;
        ball.y = circle.centerY + Math.sin(circle.angle) * circle.radius;
        console.log("X- position: " + ball.x);
        console.log("Y- position: " + ball.y);
        

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

        // calculate distance between objects
        let dist = utils.distanceXY(ball.x, ball.y, xt, yt);
        // normalise the distance value to get a value between 0 and 1, more or less.. 
        let normValue = utils.norm(dist, 0, 980);
        
        // a lineair gradient works surprisingly to have a feel of looping through colors 
        // and why would it not!
        var gr = context.createLinearGradient(800, 400, 600, 0);
        // now add the color stops
        gr.addColorStop(0, 'rgb(22,160,133)');
        gr.addColorStop(1, 'rgb(244,208 ,63)');

        var gr_complex = context.createLinearGradient(0, 50, 100, 0);
        // more color stops
        gr_complex.addColorStop(0, 'rgb(131,58,189)');
        gr_complex.addColorStop(0.5, 'rgb(253,29,29)');
        gr_complex.addColorStop(1, 'rgb(252,176,69)');

        
        // change color on close proximity...
        if (dist < 50) {
            context.fillStyle = "orange";
        } else {
            context.fillStyle = gr;
        }
        
        // draw stuff
        context.beginPath();
        // let the radius depend on the distance between the two objects, this is nice!
    	context.arc(ball.x, ball.y, lerp(normValue, minRadius, maxRadius), 0, Math.PI * 2, false);
        context.fill();

        // arc moving along the bezier curve
        context.fillStyle = gr_complex;
        context.beginPath();
    	context.arc(xt, yt, 20, 0, Math.PI * 2, true);
        context.fill();

        // how do we increment for the spiral movement?
        circle.angle += ball.speed * normValue;
        // circle.angle increments slowly to infinity
        circle.radius += radiusInc;
        console.log("circle.radius: " + circle.radius);
        
        // how we get the arc moving along the nice bezier curve?
        bezierBall.t += bezierBall.speed;
        

        
        requestAnimationFrame(render);
    }
};
