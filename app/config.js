(function() {
  // Get configuration
  var config = {};
  if(cfg_str = localStorage.getItem("elite-panel-config")) {
    config = JSON.parse(cfg_str);
  }

  exports.get = function(key, default_val) {
    if(!config[key]) {
      config[key] = default_val;
      localStorage.setItem("elite-panel-config", JSON.stringify(config));
    }
    return config[key];
  };

  exports.set = function(key, val) {
    config[key] = val;
    // Write config again
    localStorage.setItem("elite-panel-config", JSON.stringify(config));
  };
})()
