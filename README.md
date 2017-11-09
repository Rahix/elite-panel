elite-panel
===========

elite-panel is a side panel/companion for Elite Dangerous.

![Screenshot](https://raw.githubusercontent.com/Rahix/elite-panel/master/Screenshot.png)

## Features ##
* Youtube Video/Playlist player
* Obsidian Ant and Isinona dedicated YouTube panels
* Radio player
* Music player
* Customizable color scheme using an ED color matrix (See Arkku's [hud editor](http://arkku.com/elite/hud_editor/))

## Download ##
A windows installer is available [here](https://github.com/Rahix/elite-panel/releases/tag/v1.0.0).

## How to ##
elite-panel can be controlled by either using a mouse, having the window in focus and using the key controls mentioned below or
by using the keys with the `CTRL` and `SHIFT` modifiers. This last option does not require the window to be in focus and is best when using the side panel on a second monitor.
Of course these keys can be mapped to joystick controls.

## Key Controls ##

Key | Function
--- | ---
`Q` | Move one tab to the left
`E` | Move one tab to the right
`W` | Move up
`S` | Move down
`A` | Move left (Previous)
`D` | Move right (Next)
`R` | Volume up
`F` | Volume down
`SPACE` | Select (Pause/Play)

## YouTube ##

Put the link to a video/playlist in the text box at the bottom, select wether it is a video or a playlist and press Play.


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

After selecting a playlist, use `SPACE` for play/pause and `A` and `D` to switch through the playlist's songs.
