var Vue = require("vue/dist/vue.js");
var VueRouter = require("vue-router");

var {ipcRenderer} = require("electron");

var fs = require("fs");

var vm;

var overlay_cb;

fs.readdir("plugins", function(err, items) {
  var routes = [];
  // Add plugins
  items.forEach(function(plugin) {
    routes.push({
      display_name: plugin,
      path: "/" + plugin,
      component: require("./plugins/" + plugin + "/index.js")
    });
  });
  // Add builtin
  routes.push({
      display_name: "Options",
      path: "/Options",
      component: {
        template: "#option-template"
      }
    },
    {
      display_name: "Close",
      path: "/Close",
      component: {
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
    });


  var router = new VueRouter({
    path: "/All",
    routes: routes
  });
  vm = new Vue({
    el: "#elite-panel",
    router: router,
    data: {
      plugins: items,
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


  router.push("/Radio");

  window.onkeydown = function(e) {
    var switch_route = function(o) {
      // Get current route
      var new_index = routes.findIndex(function(el) {
        return el.path == vm.$route.path;
      }, routes) + o;
      if(new_index >= 0 && new_index < routes.length) {
        vm.$router.push(routes[new_index].path);
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
