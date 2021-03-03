var rgbColor;

function colorGen() {
  var generateColor = Math.floor(Math.random() * 256);
  return generateColor;
}

for (var i = 0; i < 10; i += 1) {
  rgbColor = "rgb(" + colorGen() + "," + colorGen() + "," + colorGen() + ")";
  console.log(rgbColor)
  
};


