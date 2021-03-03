window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight;
        

    var centerY = height * 0.5,
    	centerX = width * 0.5,
        baseAlpha = 0.45,
        baseRadius = 80,
        radius_space = 75;
    	offset = 0.35,
    	speed = 0.02,
        angle = 45,
        vertical = height * .4,
        horizontal = width * .4
        
        
    render();

    function render() {

      var y = centerY + Math.sin(angle) * vertical;
      var x = centerX + Math.sin(angle) * horizontal;
      var alpha = baseAlpha + Math.sin(angle) * offset;
      var radius = baseRadius + Math.sin(angle) * radius_space;
      console.log(radius);

      
      context.fillStyle = "rgba(0, 0, 255, " + alpha + ")";
      context.clearRect(0, 0, width, height);
      context.beginPath();
      context.arc(x, centerY, radius, 0, Math.PI * 2, false);
      context.fill();

      angle += speed;
      

      requestAnimationFrame(render);
    }
};
