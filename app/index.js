var Vue = require("vue/dist/vue.js");
var VueRouter = require("vue-router");

var {ipcRenderer} = require("electron");

var fs = require("fs");

var vm;


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
      volume: 50
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
      }
    };
    // Make sure no input element is currently focused
    if(document.querySelector(":focus") === null) {
      switch(e.key) {
        // Next Panel
        case "e": switch_route(1); break;
        // Previous Panel
        case "q": switch_route(-1); break;
        // Volume +
        case "r":
          vm.volume = Math.min(vm.volume + 10, 100);
          // Check wether the method exists
          if(vm.$route.matched[0].instances.default.set_volume) {
            vm.$route.matched[0].instances.default.set_volume(vm.volume);
          }
          break;
        // Volume -
        case "f":
          vm.volume = Math.max(vm.volume - 10, 0);
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
