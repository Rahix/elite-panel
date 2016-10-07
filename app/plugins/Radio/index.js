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
            name: "Q-Music",
            url: "http://icecast-qmusic.cdp.triple-it.nl/Qmusic_nl_live_96.mp3"
          },
          {
            name: "538 Party",
            url: "http://vip-icecast.538.lw.triple-it.nl/WEB16_MP3"
          },
          {
            name: "538 Hitzone",
            url: "http://vip-icecast.538.lw.triple-it.nl/WEB11_MP3"
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
      select_station: function(id) {
        this.current_selected = id;
        this.current_hovered = id;
        var audio = document.getElementById("radio-audio");
        audio.innerHTML = "<audio autoplay><source src=\"" + this.stations[id].url + "\" type=\"audio/mpeg\"></source></audio>";
      }
    }

  };
})()
