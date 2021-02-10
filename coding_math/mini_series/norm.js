window.onload = function() {
    var canvas = document.getElementById("canvas"),
        c = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,

    values = [7, 5, 19, 23, 40, 27, 24, 14, 6, 21, 25, 16, 3, 20, 14],
    min = Math.min.apply(null, values),
    max = Math.max.apply(null, values);

    function norm(value, min, max) {
            return (value - min) / (max - min);
        }

    c.beginPath();

    for (let i = 0; i < values.length; i += 1) {
        let normValue = norm(values[i], min, max),
            x = width / (values.length -1) * i,
            y = height - height * normValue;

            if (i == 0) {
                c.moveTo(x, y);
            }
            else {
                c.lineTo(x, y);
            }

    }


    c.stroke();

};
