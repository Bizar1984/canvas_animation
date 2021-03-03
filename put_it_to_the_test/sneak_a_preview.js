window,addEventListener('load', eventWindowLoaded, false);

let shipImage;

function eventWindowLoaded() {
    

    shipImage = new Image();
    shipImage.src = "ship.png"
    shipImage.onload = eventAssetsLoaded;

}

function eventAssetsLoaded() {
    canvasApp()
}
    


function canvasSupport() {
    return Modernizr.canvas;
}

function canvasApp() {
    if(!canvasSupport()) {
        return;
    } 

        const pointImage = new Image();
        pointImage.src = "pointwhite.png";

        theCanvas = document.getElementById('canvas');
        context = theCanvas.getContext('2d');
        width = theCanvas.width = window.innerWidth,
        height = theCanvas.height = window.innerHeight;

        const easeValue = .05;
        const p1 = {x: 240, y: -20};
        const p2 = {x:640, y: 470};

        const ship = {x:p1.x, y:p1.y, endx:p2.x, endy: p2.y, velocityx: 0, velocityy: 0};
        
        const points = new Array();

        

        function drawScreen() {
            context.fillStyle = 'black';
            context.fillRect(0, 0, width, height);

            let dx = ship.endx - ship.x;
            let dy = ship.endy - ship.y;
            

            ship.velocityx = dx * easeValue;
            ship.velocityy = dy * easeValue;

            ship.x += ship.velocityx;
            ship.y += ship.velocityy;



            
            points.push({x:ship.x, y: ship.y});

            for(let i = 0; i < points.length; i++) {
                context.drawImage(pointImage, points[i].x + shipImage.width/2, points[i].y,1,1);
            }

            context.drawImage(shipImage, ship.x, ship.y);
    
            

    
                  
        }

        
            
        
        function gameLoop() {
            window.requestAnimationFrame(gameLoop);
            drawScreen();
        }
    
        gameLoop();
    
    }
             
               
                
            
            

        
        
        
        
        

        
        
        

