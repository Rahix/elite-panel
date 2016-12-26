var VueRouter = require("vue-router");

var {ipcRenderer} = require("electron");

const {dialog} = require("electron").remote;

var fs = require("fs");

var vm;

var overlay_cb;

fs.readdir("plugins", function(err, items) {
  var routes = [];
  var plugins = [];
  // Add plugins
  items.forEach(function(plugin) {
    var plugin = require("./plugins/" + plugin + "/index.js");
    if(plugin.panel) {
      if(!plugin.component.name) {
        plugin.component.name = plugin.route;
      }
      routes.push({
        path: "/" + plugin.route,
        component: plugin.component
      });
      plugins.push({
        name: plugin.name,
        route: "/" + plugin.route
      });
    }
  });
  // Get current colors
  var colors = Config.get("colors", []); // No need for a default value here
  // Add builtin
  routes.push({
      path: "/all",
      component: {
        name: "all",
        template: "#all-template",
        data: function() {
          return {
            current_pl: 0,
            column: 0,
            visibles: []
          };
        },
        beforeMount: function() {
          this.visibles = this.$root.visibles;
        },
        methods: {
          keyboard: function(ev) {
            var _this = this;
            function scrollIntoView(up) {
              document.getElementById("all-pl-" + _this.current_pl).scrollIntoView(up);
            }
            switch(ev.key) {
              case "s": if(this.current_pl < (this.$root.plugins.length - 1)) this.current_pl++; scrollIntoView(false); break;
              case "w": if(this.current_pl > 0) this.current_pl--; scrollIntoView(true); break;
              case "d": if(this.column < 3) this.column++; break;
              case "a": if(this.column > 0) this.column--; break;
              case " ": if(this.column == 0) {
                  this.goto(this.$root.plugins[this.current_pl].route);
                } else {
                  Vue.set(this.$root.visibles, this.column - 1, this.$root.plugins[this.current_pl]);
                  // Update our UI
                  this.visibles = this.$root.visibles;
                  // Push config into local storage
                  Config.set("visibles", this.$root.visibles);
                }
                break;
            }
          },
          goto: function(route) {
            this.$router.push(route);
          }
        }
      }
    },
    {
      path: "/settings",
      component: {
        name: "settings",
        template: "#settings-template",
        data: function() {
          return {
            matrix_a: colors[0][0],
            matrix_b: colors[0][1],
            matrix_c: colors[0][2],
            matrix_d: colors[1][0],
            matrix_e: colors[1][1],
            matrix_f: colors[1][2],
            matrix_g: colors[2][0],
            matrix_h: colors[2][1],
            matrix_i: colors[2][2]
          };
        },
        methods: {
          apply_colors: function() {
            var matrix = [
              [this.matrix_a, this.matrix_b, this.matrix_c],
              [this.matrix_d, this.matrix_e, this.matrix_f],
              [this.matrix_g, this.matrix_h, this.matrix_i]
            ];
            Config.set("colors", matrix);
          },
          select_pd: function() {
            Config.set("playlist_folder", dialog.showOpenDialog({properties: ["openDirectory"]})[0]);
          }
        }
      }
    },
    {
      path: "/close",
      component: {
        name: "close",
        template: "#close-template",
        methods: {
          close: function() {
            ipcRenderer.send("close-app");
          },
          keyboard: function(ev) {
            if(ev.key == " ") {
              this.close();
            }
          }
        }
      }
    },
    {
      path: "*",
      component: {
        name: "not_found",
        template: '<h1 style="text-align: center;">Plugin not found</h1>'
      }
    }
  );


  var router = new VueRouter({
    path: "/all",
    routes: routes
  });
  var visibles = Config.get("visibles", [plugins[0], plugins[1], plugins[2]]);
  vm = new Vue({
    el: "#elite-panel",
    router: router,
    data: {
      plugins: plugins,
      visibles: visibles,
      volume: 50,
      overlay_text: "",
      overlay_vis: false,
    },
    methods: {
      overlay: function(text, duration) {
        this.overlay_text = text;
        this.overlay_vis = true;
        if(overlay_cb) {
          window.clearTimeout(overlay_cb);
        }
        var mdl = this;
        overlay_cb = window.setTimeout(function (){
          mdl.overlay_vis = false;
        }, duration*1000);
      }
    }
  });


  router.push("/all");

  window.onkeydown = function(e) {
    var switch_route = function(o) {
      // Get current route
      var nav_routes = vm.visibles.concat({route: "/all"}, {route: "/settings"}, {route: "/close"});
      var new_index = nav_routes.findIndex(function(el) {
        return el.route == vm.$route.path;
      }) + o;
      if(new_index >= 0 && new_index < nav_routes.length) {
        vm.$router.push(nav_routes[new_index].route);
        if(vm.$route.matched[0].instances.default && vm.$route.matched[0].instances.default.set_volume) {
          vm.$route.matched[0].instances.default.set_volume(vm.volume);
        }
      }
    };
    // Make sure no input element is currently focused
    var focus = document.querySelector(":focus");
    if(focus === null || focus.tagName != "input" || focus.type != "text") {
      var v_delta_pos = 20;
      var v_delta_neg = 20;
      if(vm.volume < 60) {
        v_delta_pos = 10;
      }
      if(vm.volume < 61) {
        v_delta_neg = 10;
      }
      if(vm.volume < 30) {
        v_delta_pos = 5;
      }
      if(vm.volume < 31) {
        v_delta_neg = 5;
      }
      if(vm.volume < 5) {
        v_delta_pos = 1;
      }
      if(vm.volume < 6) {
        v_delta_neg = 1;
      }
      switch(e.key) {
        // Next Panel
        case "e": switch_route(1); break;
        // Previous Panel
        case "q": switch_route(-1); break;
        // Volume +
        case "r":
          vm.volume = Math.min(vm.volume + v_delta_pos, 100);
          vm.overlay("Volume " + vm.volume + "%", 0.5);
          // Check wether the method exists
          if(vm.$route.matched[0].instances.default.set_volume) {
            vm.$route.matched[0].instances.default.set_volume(vm.volume);
          }
          break;
        // Volume -
        case "f":
          vm.volume = Math.max(vm.volume - v_delta_neg, 0);
          vm.overlay("Volume " + vm.volume + "%", 0.5);
          // Check wether the method exists
          if(vm.$route.matched[0].instances.default.set_volume) {
            vm.$route.matched[0].instances.default.set_volume(vm.volume);
          }
          break;
        // Send to active route
        default:
          // Check wether the method exists
          if(vm.$route.matched[0].instances.default.keyboard) {
            vm.$route.matched[0].instances.default.keyboard(e);
          }
          break;
      }
    }
  }
});

ipcRenderer.on("keyboard-command", function(ev, key) {
  window.onkeydown({key: key});
})
