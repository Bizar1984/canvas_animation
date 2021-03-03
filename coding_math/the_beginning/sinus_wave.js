window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight;

    context.translate(50, height / 2);
    context.scale(1, -1);
    
    for(var angle = 0; angle < Math.PI * 2; angle += .1) {
            
        var x = angle * 220,
            y = Math.sin(angle) * 160;
            console.log(x, y);

        context.fillStyle = '#FFF000';
        context.fillRect(x, y, 5, 5)
        console.log(x, y)
    }  
    for(var angle = 0; angle < Math.PI * 2; angle += .01) {
            
            var x = angle * 220,
                y = Math.cos(angle) * 160;

            context.fillStyle = 'black';
            context.fillRect(x, y, 5, 5)
            console.log(x, y)
    }

};
