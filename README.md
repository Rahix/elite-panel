elite-panel
===========

elite-panel is a side panel/companion for Elite Dangerous.

## Features ##
* Youtube player(only Isinona and Obsidian Ant at the moment)
* Radio player
* Music player
* Customizable color scheme using an ED color matrix (See Arkku's [hud editor](http://arkku.com/elite/hud_editor/))

## Configuration ##
elite-panel is configured from a json file. This file can be found by going to `Settings` and selecting `Open Configuration File`.
The file looks like this:

```json
{
	"colors": [
		[1.0, 0.0, 0.0],
		[0.0, 1.0, 0.0],
		[0.0, 0.0, 1.0]
	],
	"music_dir": "path/to/music",
	"radio_stations": [
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
		}
	]
}
```
