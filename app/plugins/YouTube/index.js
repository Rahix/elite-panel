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
          is_playlist: Config.get("youtube_is_playlist", true),
          src_raw: Config.get("youtube_url", "https://www.youtube.com/playlist?list=UUtiq6FTXiFKQm-wqMuRijgA")
        }
      },
      mounted: function() {
        this.update();
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
              var id = this.src_raw.match(/youtu(?:\.be|be\.com)\/(?:.*list(?:\/|=)|(?:.*\/)?)([a-zA-Z0-9-_]+)/)[1];
              this.src_frag = "videoseries?list=" + id + "&";
            } else {
              var id = this.src_raw.match(/youtu(?:\.be|be\.com)\/(?:.*v(?:\/|=)|(?:.*\/)?)([a-zA-Z0-9-_]+)/)[1];
              this.src_frag = id + "?";
            }
            Config.set("youtube_url", this.src_raw);
            Config.set("youtube_is_playlist", this.is_playlist);
          } catch(err) {
              this.$root.overlay("Failed to parse youtube url", 1);
          }
        }
      }
    }
  };
})()
