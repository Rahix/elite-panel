(function() {
  var fs = require("fs");
  // Load template
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", "plugins/Music/template.html", false);
  xhttp.send();
  function load_playlists(v, f) {
    var playlist_folder = Config.get("playlist_folder", "/home/rahix/Music");

    fs.readdir(playlist_folder, function(err, items) {
      items.forEach(function(playlist) {
        v.push({name: playlist});
      });
      f(v);
    });
  }

  module.exports = {
    name: "Music",
    route: "music",
    panel: true,
    component: {
      template: xhttp.responseText,
      data: function() {
        return {
          playlists: [],
          tracks: [],
          current_hovered: 0,
          current_selected: -1,
          current_track: 0,
          playing: false,
          visualizer: undefined,
          context: new AudioContext(),
          volume: 1.0
        }
      },
      mounted: function() {
        _this = this;
        load_playlists(this.playlists, function(p) {
          p[_this.current_hovered].hover = true;
        });
      },
      beforeDestroy: function() {
        if(this.visualizer) {
          window.cancelAnimationFrame(this.visualizer);
        }
        this.context.close();
      },
      methods: {
        keyboard: function(ev) {
          var _this = this;
          function scroll(up) {
            document.getElementById("music-playlist-" + _this.current_hovered).scrollIntoView(up);
          }
          switch(ev.key) {
            case "s": if(this.current_hovered < (this.playlists.length-1)) this.current_hovered+=1; scroll(false); break;
            case "w": if(this.current_hovered > 0) this.current_hovered-=1; scroll(true); break;
            case "d": this.next(); break;
            case "a": this.prev(); break;
            case " ":
              if(this.current_hovered == this.current_selected) {
                this.toggle_pause();
              } else {
                this.select_playlist(this.current_hovered);
              }
              break;
          }
        },
        set_volume: function(vol) {
          this.volume = vol / 100.0;
          if(document.getElementById("music-audio") && document.getElementById("music-audio").firstChild) {
            document.getElementById("music-audio").firstChild.volume = this.volume;
          }
        },
        toggle_pause: function() {
          if(document.getElementById("music-audio") && document.getElementById("music-audio").firstChild) {
            if(this.playing) {
              document.getElementById("music-audio").firstChild.pause();
              this.playing = false;
            } else {
              document.getElementById("music-audio").firstChild.play();
              this.playing = true;
            }
          }
        },
        next: function() {
          if(this.current_track < (this.tracks.length - 1)) {
            this.select_track(this.current_track + 1);
          }
        },
        prev: function() {
          if(this.current_track > 0) {
            this.select_track(this.current_track - 1);
          }
        },
        select_track: function(id) {
          this.current_track = id;
          var audio = document.getElementById("music-audio");
          audio.innerHTML = "<audio autoplay><source src=\"" + this.tracks[id].file + "\" type=\"audio/mpeg\"></source></audio>";
          this.$root.overlay(this.tracks[id].name, 1);
          this.playing = true;

          document.getElementById("music-audio").firstChild.volume = this.volume;
          this.visualize();
        },
        select_playlist: function(id) {
          var _this = this;
          this.current_selected = id;
          this.current_hovered = id;
          this.current_track = 0;
          this.playing = false;
          // Load Tracks
          var playlist = Config.get("playlist_folder", "/home/rahix/Music") + "/" + this.playlists[id].name;
          fs.readdir(playlist, function(err, items) {
            _this.tracks = [];
            items.forEach(function(track) {
              if(track.charAt(track.length - 1) == "3") {
                _this.tracks.push({file: playlist + "/" + track, name: track});
              }
            });
            _this.select_track(0);
          });
        },
        visualize: function() {
          var _this = this;
          if(this.visualizer) {
            window.cancelAnimationFrame(this.visualizer)
          }
          var source = this.context.createMediaElementSource(document.getElementById("music-audio").firstChild);
          var analyser = this.context.createAnalyser();

          source.connect(analyser);
          analyser.connect(this.context.destination);
          analyser.fftSize = 32;
          analyser.smoothingTimeConstant = 0.8;
          var data_buffer = new Uint8Array(16);
          function draw() {
            analyser.getByteFrequencyData(data_buffer);

            for(var i = 0; i < 16; i++) {
              var height = (data_buffer[i] * (i+1) / 6.0 + 10) / 10.0;

              document.getElementById("music-vis-" + (i+1)).style.height = height + "vw";
            }

            _this.visualizer = window.requestAnimationFrame(draw);
          };

          draw();
        }
      }
    }
  };
})()
