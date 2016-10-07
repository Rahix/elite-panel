(function() {
  module.exports = {
    template: "<input type='text'></input>",
    methods: {
      keyboard: function(ev) {
        console.log(document.querySelector(":focus"));
      }
    }

  };
})()
