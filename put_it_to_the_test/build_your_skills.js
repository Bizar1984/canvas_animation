window.onload = function() {
    const canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight;

    
    let p0 = {
            x: utils.randomRange(0, width),
            y: utils.randomRange(0, height)
        },
        p1 = {
            x: utils.randomRange(0, width),
            y: utils.randomRange(0, height)
        },
        p2 = {
            x: utils.randomRange(0, width),
            y: utils.randomRange(0, height)
        },
        p3 = {
            x: utils.randomRange(0, width),
            y: utils.randomRange(0, height)
        },
        speed = 3,
        ball = {x:p0.x, y: p0.y};
        distance = utils.distance(p0, p3)
        moves = distance / speed,
        xunits = (p3.x - p0.x) / moves,
        yunits = (p3.y - p0.y) / moves,
        points = [],
        numPoints = 8;
        // create some random points for beziier action
        for(let i = 0; i < numPoints; i++) {
            let p = {
                x: Math.random() * width,
                y: Math.random() * height
            };

            points.push(p);
            console.log(points)
            
        }

        
        render();
    
        function render() {
            
            context.clearRect(0, 0, width, height);
            // draw ball
            context.beginPath();
            context.fillStyle = "azure";
            context.arc(ball.x, ball.y, 3, 0, Math.PI * 2, false);
            context.fill();

            // make the ball move
            if(moves > 0) {
                moves--;
                ball.x += xunits;
                ball.y += yunits;
                
            }

            // draw straight lines connecting the random points from the array
            context.beginPath();
            context.strokeStyle = "red";
            context.moveTo(points[0].x, points[0].y);
            for(let i = 1; i < numPoints; i += 1) {
                context.lineTo(points[i].x, points[i].y);
            }
            context.stroke();

            // draw bezier curve with the multicurve function
            context.strokeStyle = "orange";
            context.beginPath();
            utils.multicurve(points, context);
            context.stroke();

            // new bezier start
            context.beginPath();
            context.fillStyle = "purple";
            context.arc(p0.x, p0.y, 10, 0, Math.PI * 2, false);
            context.fill();

            // control points
            context.beginPath();
            context.fillStyle = "orange";
            context.arc(p1.x, p1.y, 10, 0, Math.PI * 2, false);
            context.fill();

            context.beginPath();
            context.fillStyle = "teal";
            context.arc(p2.x, p2.y, 10, 0, Math.PI * 2, false);
            context.fill();

            // bezier end point
            context.beginPath();
            context.fillStyle = "purple";
            context.arc(p3.x, p3.y, 10, 0, Math.PI * 2, false);
            context.fill();

            // draw bezier curve
            context.beginPath();
            context.strokeStyle = "lightblue";
            context.moveTo(p0.x, p0.y);
            context.bezierCurveTo(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
            context.stroke();
 
            // create generic object
            var pFinal = {};

            // draw arcs along the bezier curve
	        for(var t = 0; t <= 1; t += 0.01) {
                utils.cubicBezier(p0, p1, p2, p3, t, pFinal);
                context.beginPath();
                context.strokeStyle = "white";
                context.arc(pFinal.x, pFinal.y, 10, 0, Math.PI * 2, false);
                context.stroke();
	        }
            
    
            
            requestAnimationFrame(render);
        }
};
            
            
            
            
            
        
        


        
        
