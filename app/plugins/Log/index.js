(function() {
  // Register Handler for Log Changes
  const file = "/tmp/foo.log";
  var fs = require("fs");
  fs.watch(file, function(eventType) {
    if(eventType == "change") {
      // Get file contents
      fs.readFile(file, "utf8", function(err, data) {
        var lines = data.split("\n");
        var latest = lines[lines.length - 2];
        // Check for content
        var result = latest.match("\{.*\} System:\\d+\\((.*)\\) Body:.+ Supercruise");
        if(result) {
          vm.overlay("<span style='color: #60a2db; text-shadow-color: #60a2db'>Entered " + result[1] + "</span>", 2);
        }
      });
    }
  });
  module.exports = {
    template: '<h1>SOON</h1>'
  }
})()
