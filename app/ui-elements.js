Vue.component("elite-checkbox", {
  template: "#checkbox-template",
  props: ["value", "highlight"],
  computed: {
    path: function() {
      if(this.value) {
        return `<path d="M3.41 3.41h27.726v9.242H12.652v64.696h18.484v9.243H3.41V3.409M58.864 3.41H86.59v83.18H58.864v-9.242h18.484V12.652H58.864V3.409"/>
        <path d="M21.894 21.894h46.212v46.212H21.894V21.894"/>
        <path d="M58.864 965.771H86.59v83.182H58.864v-9.242h18.484v-64.697H58.864v-9.243" filter="url(#a)" transform="translate(0 -962.362)"/>
        <path d="M3.41 965.771h27.726v9.243H12.652v64.697h18.484v9.242H3.41V965.77" filter="url(#b)" transform="translate(0 -962.362)"/>
        <path d="M21.894 984.256h46.212v46.212H21.894v-46.212" filter="url(#c)" transform="translate(0 -962.362)"/>`;
      } else {
        return `<path d="M3.41 3.41h27.726v9.242H12.652v64.696h18.484v9.243H3.41V3.409M58.864 3.41H86.59v83.18H58.864v-9.242h18.484V12.652H58.864V3.409"/>
        <path d="M58.864 965.771H86.59v83.182H58.864v-9.242h18.484v-64.697H58.864v-9.243" filter="url(#a)" transform="translate(0 -962.362)"/>
        <path d="M3.41 965.771h27.726v9.243H12.652v64.697h18.484v9.242H3.41V965.77" filter="url(#b)" transform="translate(0 -962.362)"/>`;
      }
    }
  }
})

Vue.component("elite-loader", {
  template: `<object data="res/EDLoader.svg" type="image/svg+xml"></object>`,
  mounted: function() {
    var _this = this;
    this.$el.onload = function() {
      var cutil = require("./color_utils.js");
      var matrix = Config.get("colors", [[1.0, 0.0, 0.0], [0.0, 1.0, 0.0], [0.0, 0.0, 1.0]]);
      var orange = cutil.color_to_hex(cutil.apply_matrix([1.0, 0.443, 0.0], matrix));
      _this.$el.contentDocument.children[0].innerHTML = "<style> svg { --orange: " + orange + " } </style>" + _this.$el.contentDocument.children[0].innerHTML;
    };
  }
})
