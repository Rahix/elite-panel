(function() {
  var fs = require("fs");
  // Load template
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", "plugins/YouTube/template.html", false);
  xhttp.send();

  module.exports = {
    name: "YouTube",
    route: "youtube",
    panel: true,
    component: {
      template: xhttp.responseText,
      data: function() {
        return {
          src_frag: "videoseries?list=UUtiq6FTXiFKQm-wqMuRijgA&",
          is_playlist: true,
          src_raw: "https://www.youtube.com/playlist?list=UUtiq6FTXiFKQm-wqMuRijgA"
        }
      },
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
        },
        update: function() {
          try {
            if(this.is_playlist) {
              var id = this.src_raw.match("^https?:\\/\\/www\\.youtube\.com\\/playlist\\?list=(.*)")[1];
              this.src_frag = "videoseries?list=" + id + "&";
            } else {
              var id = this.src_raw.match("^https?:\\/\\/www\\.youtube\.com\\/watch\\?v=(.*)")[1];
              this.src_frag = id + "?";
            }
          } catch(err) {
              this.$root.overlay("Failed to parse youtube url", 1);
          }
        }
      }
    }
  };
})()
