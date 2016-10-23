(function(){
  exports.color_to_hex = function(color) {
    var red = Math.round(color[0] * 255.0);
    var green = Math.round(color[1] * 255.0);
    var blue = Math.round(color[2] * 255.0);
    return "#"
         + (red > 15 ? red.toString(16) : ("0" + red.toString(16)))
         + (green > 15 ? green.toString(16) : ("0" + green.toString(16)))
         + (blue > 15 ? blue.toString(16) : ("0" + blue.toString(16)));
  };
  exports.color_to_rgba = function(color, alpha) {
    var red = Math.round(color[0] * 255.0);
    var green = Math.round(color[1] * 255.0);
    var blue = Math.round(color[2] * 255.0);
    return "rgba("
         + red + ", "
         + green + ", "
         + blue + ", "
         + alpha + ")";
  };
  exports.apply_matrix = function(color, matrix) {
    return [
      color[0] * matrix[0][0] + color[1] * matrix[1][0] + color[2] * matrix[2][0],
      color[0] * matrix[0][1] + color[1] * matrix[1][1] + color[2] * matrix[2][1],
      color[0] * matrix[0][2] + color[1] * matrix[1][2] + color[2] * matrix[2][2],
    ];
  };
})()
