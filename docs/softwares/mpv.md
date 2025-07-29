## Configuration Location
System Wide at `/etc/mpv`, per user at `~/.config/mpv`.
1. `mpv.conf` - general settings
2. `scripts/` - store scripts, scripts are automatically loaded
3. `script-opts` - store conf for scripts
4. `input.conf` - store additional key bindings, default bindings at `/etc/input.conf`
As for Windows,
scripts at `C:/Users/Username/AppData/Roaming/mpv/scripts/`
## Useful Scripts
More scripts at [here](https://github.com/mpv-player/mpv/wiki/User-Scripts).
You can write your own [scripts](https://mpv.io/manual/master/#lua-scripting)
### Autoload
This load all the files in the directory automatically.
```bash
wget https://raw.githubusercontent.com/mpv-player/mpv/refs/heads/master/TOOLS/lua/autoload.lua
```

### Playlist Manager
```bash
wget https://raw.githubusercontent.com/jonniek/mpv-playlistmanager/refs/heads/master/playlistmanager.lua
```
Keybinding:
* `Shift+Enter` open the list
* `Esc` close the list
* Arrow key to navigate and `Enter` to play
* `Backspace` to delete the file under the cusor
## Default Shortcuts

| shortcut            | meaning                                           |
| ------------------- | ------------------------------------------------- |
| space               | pause and play                                    |
| `[` and ` ]`        | Decrease/increase current playback speed by 10%.  |
| `{` and ``}`        | Halve/double current playback speed.              |
| BACKSPACE           | Reset playback speed to normal.                   |
| V                   | Toggle subtitle visibility.                       |
| j and J             | Cycle through the available subtitles.            |
| z and Z             | Adjust subtitle delay by +/- 0.1 seconds.         |
| l(small L)          | Set/clear A-B loop points.                        |
| Ctrl++ and Ctrl+-   | Adjust audio delay (A/V sync) by +/- 0.1 seconds. |
| Shift+g and Shift+f | Adjust subtitle font size by +/- 10%.             |
| s                   | Take a screenshot.                                |
| f and doubleclick   | fullscreen                                        |

## Configuration
save to `mpv.conf`
```
save-position-on-quit
geometry=70%x65%
```

## See Also
[mpv documentation](https://mpv.io/manual/stable/)
