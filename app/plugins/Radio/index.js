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
        current_selected: -1
      }
    },
    mounted: function() {
      this.stations[this.current_hovered].hover = true;
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
        document.getElementById("radio-audio").firstChild.volume = vol / 100.0;
      },
      select_station: function(id) {
        var vol = 1.0;
        if(document.getElementById("radio-audio").firstChild) {
          vol = document.getElementById("radio-audio").firstChild.volume;
        }
        this.current_selected = id;
        this.current_hovered = id;
        var audio = document.getElementById("radio-audio");
        audio.innerHTML = "<audio autoplay><source src=\"" + this.stations[id].url + "\" type=\"audio/mpeg\"></source></audio>";
        // Reset volume after station change
        document.getElementById("radio-audio").firstChild.volume = vol;
      }
    }

  };
})()
