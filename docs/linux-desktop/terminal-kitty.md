Kitty is a wonderful terminal that available on MacOS and Linux. 
## Installation

### Debian/ubuntu Based

## Quick Start
Kitty doesn't offer that GUI styles to allow you do those operations. You must use keyboard shortcuts to achieve that.

| Action                                   | Shortcut                                                                                                             |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| New tab                                  | [`ctrl+shift+t`](https://sw.kovidgoyal.net/kitty/conf/#shortcut-kitty.New-tab) (also ⌘+t on macOS)                   |
| Close tab                                | [`ctrl+shift+q`](https://sw.kovidgoyal.net/kitty/conf/#shortcut-kitty.Close-tab) (also ⌘+w on macOS) or middle mouse |
| switch tab                               | `ctrl+tab`                                                                                                           |
| Set tab title(rename)                    | [`ctrl+shift+alt+t`](https://sw.kovidgoyal.net/kitty/conf/#shortcut-kitty.Set-tab-title) (also ⇧+⌘+i on macOS)       |
| New Window(create a new split window)    | [`ctrl+shift+enter`](https://sw.kovidgoyal.net/kitty/conf/#shortcut-kitty.New-window) (also ⌘+↩ on macOS)            |
| Close window(close current split window) | [`ctrl+shift+w`](https://sw.kovidgoyal.net/kitty/conf/#shortcut-kitty.Close-window) (also ⇧+⌘+d on macOS)            |
| Move window to top                       | [``ctrl+shift+```](https://sw.kovidgoyal.net/kitty/conf/#shortcut-kitty.Move-window-to-top)                          |

> [!NOTE]
>
> When it create a new window, it split vertically or horizontally based on pre-defined layouts. The default layout is **Fat**, you can switch between layouts using the [`ctrl+shift+l`](https://sw.kovidgoyal.net/kitty/conf/#shortcut-kitty.Next-layout) key combination.

## Sessions
What is a Kitty Session? Well, kitty session is more like a workflow. You can control the tabs, windows, startup programs inside a session. You might have so many workflows that have dedicated session for it. You can use `kitty --session /path/to/session` to launch it or define the default session in `kitty.conf` by `startup_session /path/to/session`.
### Example
```bash
# Set the layout for the current tab
layout tall
# Set the working directory for windows in the current tab
cd ~
# Create a window and run the specified command in it
launch zsh
# Create a window with some environment variables set and run vim in it
launch --env FOO=BAR vim
# Set the title for the next window
launch --title "Chat with x" irssi --profile x

# Create a new tab
# The part after new_tab is the optional tab title which will be displayed in
# the tab bar, if omitted, the title of the active window will be used instead.
new_tab my tab
cd ~/somewhere
# Set the layouts allowed in this tab
enabled_layouts tall,stack
# Set the current layout
layout stack
launch zsh

# Create a new OS window
# Any definitions specified before the first new_os_window will apply to first OS window.
new_os_window
# Set new window size to 80x24 cells
os_window_size 80c 24c
# Set the --class for the new OS window
os_window_class mywindow
# Change the OS window state to normal, fullscreen, maximized or minimized
os_window_state normal
launch sh
# Resize the current window (see the resize_window action for details)
resize_window wider 2
# Make the current window the active (focused) window in its tab
focus
# Make the current OS Window the globally active window (not supported on Wayland)
focus_os_window
launch emacs
```

## Known Issues
For some cases, you might have ssh into some striped down systems that don't have enough terminfo packages supporting like `alacritty` or `xterm-kitty`. You might end up getting a lot of issue. The author of kitty said that it would never be xterm. So you have to install the additional term-info packages for kitty or use the [workaround](https://sw.kovidgoyal.net/kitty/faq/#i-get-errors-about-the-terminal-being-unknown-or-opening-the-terminal-failing-or-functional-keys-like-arrow-keys-don-t-work).
The issue also happens in alacritty. In practice, many servers may not have the `alacritty` term info installed.  
You can check terminfo by :
```bash
dircolors --print-database | grep '^TERM'
```
This issue was discussed in [Github](https://github.com/kovidgoyal/kitty/issues/713).  
Personally, I would not use kitty or alacrity that much, because in reality, a lot of servers may not have the `xterm-kitty` or `alacritty` term info installed.

You can add `export TERM=xterm-256color` in `.bashrc`
## Configuration
Kitty [config file](https://sw.kovidgoyal.net/kitty/conf/#fonts) located at `~/.config/kitty/kitty.conf`.
Here are some common configs
```bash
font_size 11.0
remember_window_size  yes
# comments
# initial_window_width  640
# initial_window_height 400

```

>[!tip]
>1. remember to use [`ctrl+shift+f5`](https://sw.kovidgoyal.net/kitty/conf/#shortcut-kitty.Reload-kitty.conf) (⌃+⌘+, on macOS) to reload the config
>2. open the config file within _kitty_ by pressing [`ctrl+shift+f2`](https://sw.kovidgoyal.net/kitty/conf/#shortcut-kitty.Edit-config-file) (⌘+, on macOS).
>3. display the current configuration by pressing [`ctrl+shift+f6`](https://sw.kovidgoyal.net/kitty/conf/#shortcut-kitty.Debug-kitty-configuration) (⌥+⌘+, on macOS).