elite-panel
===========

elite-panel is a side panel/companion for Elite Dangerous.

![Screenshot](https://raw.githubusercontent.com/Rahix/elite-panel/master/Screenshot.png)

## Features ##
* Youtube player(only Isinona and Obsidian Ant at the moment)
* Radio player
* Music player
* Customizable color scheme using an ED color matrix (See Arkku's [hud editor](http://arkku.com/elite/hud_editor/))

## How to ##
elite-panel can be controlled by either using a mouse, having the window and focus and using the key controls mentioned below or
by using the keys with the `CTRL` and `SHIFT` modifiers. This last option does not require the window to be in focus and is best when using the side panel on a second monitor.
Of course these keys can be mapped to joystick controls.

## Key Controls ##

Key | Function
--- | ---
`Q` | Move one tab to the left
`E` | Move one tab to the right
`W` | Move up
`S` | Move down
`A` | Move left (Previous video)
`D` | Move right (Next video)
`R` | Volume up
`F` | Volume down
`SPACE` | Select (Pause/Play video)

## Music Player ##

The music player needs a music directory that contains subdirectories, which are interpreted as playlists and which then should contain the actual music files:  

```
|
+-Music Dir
   +-Playlist 1
   |  +-Song 1
   |  +-Song 2
   |  +-Song 3
   +-Playlist 2
      +-Song 4
      +-Song 5
      +-Song 6
```

After a playlist was selected, the `SPACE` key will be used for play/pause and the `A` and `D` keys will switch through the playlist's songs.
