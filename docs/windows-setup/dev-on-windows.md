Develop software on Windows can be tricky. Especially all the Unix tools you familiar with could not be used on Windows.  

The most important part is the terminal or the emulator. You might be familiar with Tmux. That could not be used in Windows Terminal. Issues are be found [here](https://github.com/microsoft/terminal/issues/5132). You might use tmux on wsl on Windows terminal to achieve. Or to use a mitty, in other words, you have to install Cygwin or MYSY2.

For example, I choose MYSY2. There are some settings you might change to smoothly to use Tmux.

1. Open the MYSY2 terminal

   1. Find "Looks" option, change the theme to gruvbox, change "cursor" to block
   2. Find "Text" option, change the font to JetBrains Mono and 12pt
   3. Find "Selection" option, check on "Allow setting selection"
   4. Find "Window" option, check off "Modifier for scrolling"

   5. Find "Type" option, choose "xterm-256color"

2. Find `C:\msys64\msys2.ini` or `/c/msys64/msys2.ini`, uncomment `MSYS2_PATH_TYPE=inherit`

3. Add two more lines to tmux
   ```text
   set-option -g automatic-rename-format '#{b:pane_current_path}'
   set-option -g default-shell /c/Program\ Files/PowerShell/7/pwsh.exe
   ```


## mobaxterm
Mobaxterm is a wonderful ssh manager. To use tmux on mobaxterm, you have to set environment `OSC52ALLOWED=1`. Why was that? Because Mobaxterm relies on putty, and putty clearly doesn't want it to be enabled because of the security risks.
