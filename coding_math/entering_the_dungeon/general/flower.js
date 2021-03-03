window.onload = function() {
    const canvas = document.getElementById("canvas"),   
          context = canvas.getContext("2d"),
          width = canvas.width = window.innerWidth,
          height = canvas.height = window.innerHeight;

    context.translate(width / 2, height / 2);
    context.scale(1, -1);
    
    
    for(let loop= 0; loop< 500; loop++) {
            
        let length = Math.cos(loop * Math.PI / 100),
            angle = (2 * Math.PI * loop / 1000);
            to_cartesian_X = length * Math.cos(angle) * 100;
            to_cartesian_Y = length * Math.sin(angle) * 100;
            
            context.fillStyle = '#e8de04';
            context.fillRect(to_cartesian_X, to_cartesian_Y, 1, 1)
            
    }  

    function toCartesian(length, angle) {
        let xCoordinate = length * Math.cos(angle);
        let yCoordinate = length * Math.sin(angle);

        
        return xCoordinate + ", " + yCoordinate;
    }

    console.log(toCartesian(5, 37 * Math.PI / 180));
};
