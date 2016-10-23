// Add styles
/* Reference:
html {
  --orange: #ff7100;
  --stripe-color: #3b0e00;
  --list-bg: rgba(156, 51, 0, 0.52);
  --list-bg-hover: rgba(210, 69, 0, 0.52);
  --list-bg-active: rgba(210, 69, 0, 0.74);
}
*/

(function(){
  var cutil = require("./color_utils.js");
  var el = document.querySelector("#style-vars");
  // Calculate colors
  // Get config matrix
  var fs = require("fs");
  fs.readFile("config.json", "utf8", function(err, data) {
    var config = JSON.parse(data);
    const matrix = config.Colors;
    /*const matrix = [
      [0.0, 0.2, 0.8],
      [0.0, 0.6, 0.0],
      [1.0, 0.3, 0.18]
    ];*/
    el.innerHTML = "html {\n"
                 + "  --orange: " + cutil.color_to_hex(cutil.apply_matrix([1.0, 0.443, 0.0], matrix)) + ";\n"
                 + "  --stripe-color: " + cutil.color_to_hex(cutil.apply_matrix([0.232, 0.055, 0.0], matrix)) + ";\n"
                 + "  --list-bg: " + cutil.color_to_rgba(cutil.apply_matrix([0.612, 0.2, 0.0], matrix), 0.52) + ";\n"
                 + "  --list-bg-hover: " + cutil.color_to_rgba(cutil.apply_matrix([0.824, 0.271, 0.0], matrix), 0.52) + ";\n"
                 + "  --list-bg-active: " + cutil.color_to_rgba(cutil.apply_matrix([0.824, 0.271, 0.0], matrix), 0.74) + ";\n"
                 + "  --overlay-bg: " + cutil.color_to_hex(cutil.apply_matrix([0.576, 0.2, 0.0], matrix)) + ";\n"
                 + "}";
  });
})()
