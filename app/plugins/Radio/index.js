(function() {
  // Load template
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", "plugins/Radio/template.html", false);
  xhttp.send();
  module.exports = {
    template: xhttp.responseText,
    data: function() {
      return {
        stations: [
          {
            name: "Radio Sidewinder",
            url: "http://radiosidewinder.out.airtime.pro:8000/radiosidewinder_a",
          },
          {
            name: "Hutton Orbital Radio",
            url: "http://streaming.radionomy.com/HuttonOrbitalRadio"
          },
          {
            name: "Wasp Radio",
            url: "http://streaming.radionomy.com/WaspRadio"
          },
          {
            name: "Lave Radio",
            url: "http://laveradio.out.airtime.pro:8000/laveradio_a"
          },
          {
            name: "Dylan Radio",
            url: "http://173.192.198.244:8138/;"
          }
        ],
        current_hovered: 0,
        current_selected: -1,
        visualizer: undefined,
        context: new AudioContext(),
        volume: 1.0
      }
    },
    mounted: function() {
      this.stations[this.current_hovered].hover = true;
    },
    beforeDestroy: function() {
      if(this.visualizer) {
        window.cancelAnimationFrame(this.visualizer);
      }
      this.context.close();
    },
    methods: {
      keyboard: function(ev) {
        switch(ev.key) {
          case "s": if(this.current_hovered < (this.stations.length-1)) this.current_hovered+=1; break;
          case "w": if(this.current_hovered > 0) this.current_hovered-=1; break;
          case " ": this.select_station(this.current_hovered); break;
        }
      },
      set_volume: function(vol) {
        this.volume = vol / 100.0;
        if(document.getElementById("radio-audio") && document.getElementById("radio-audio").firstChild) {
          document.getElementById("radio-audio").firstChild.volume = this.volume;
        }
      },
      select_station: function(id) {
        this.current_selected = id;
        this.current_hovered = id;
        var audio = document.getElementById("radio-audio");
        audio.innerHTML = "<audio autoplay><source src=\"" + this.stations[id].url + "\" type=\"audio/mpeg\"></source></audio>";
        // Reset volume after station change
        document.getElementById("radio-audio").firstChild.volume = this.volume;

        this.visualize();
      },
      visualize: function() {
        var _this = this;
        if(this.visualizer) {
          window.cancelAnimationFrame(this.visualizer)
        }
        var source = this.context.createMediaElementSource(document.getElementById("radio-audio").firstChild);
        var analyser = this.context.createAnalyser();

        source.connect(analyser);
        analyser.connect(this.context.destination);
        analyser.fftSize = 32;
        analyser.smoothingTimeConstant = 0.8;
        var data_buffer = new Uint8Array(16);
        function draw() {
          analyser.getByteFrequencyData(data_buffer);

          for(var i = 0; i < 16; i++) {
            var height = (data_buffer[i] + 10) / 10.0;

            document.getElementById("radio-vis-" + (i+1)).style.height = height + "vw";
          }

          _this.visualizer = window.requestAnimationFrame(draw);
        };

        draw();
      }
    }

  };
})()
