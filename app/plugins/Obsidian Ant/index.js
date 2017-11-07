(function() {
  module.exports = {
    name: "Obsidian Ant",
    route: "obsidian_ant",
    panel: true,
    component: {
      template: '<div><elite-loader style="transform: scale(2); position: absolute; padding-left: 37vw; padding-top: 32vh; z-index: -1" /><iframe width="560" height="315" style="width: 100%; height: 90vh" id="obsidian-iframe" src="https://www.youtube.com/embed/videoseries?list=UUtiq6FTXiFKQm-wqMuRijgA&autoplay=1&enablejsapi=1&controls=0" frameborder="0" allowfullscreen></iframe></div>',
      mounted: function() {
        this.player = new require("youtube-player")("obsidian-iframe");
        this.playing = true;
      },
      methods: {
        keyboard: function(ev) {
          switch(ev.key) {
            case " ": if(this.playing) {this.player.pauseVideo(); this.playing = false} else {this.player.playVideo(); this.playing = true} break;
            case "d": this.player.nextVideo(); break;
            case "a": this.player.previousVideo(); break;
          }
        },
        set_volume: function(vol) {
          this.player.setVolume(vol);
        }
      }
    }
  };
})()
