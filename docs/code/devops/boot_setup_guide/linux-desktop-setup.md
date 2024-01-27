# Linux Desktop Setup



## Create a desktop icon

For some binaries you downloaded from Internet, you have to create your custom desktop icons. the concept of creating a custom desktop icon using a `.desktop` file is widely supported across different Linux distributions that use desktop environments conforming to the Freedesktop.org specifications. These steps should generally work for popular desktop environments like GNOME, KDE Plasma, XFCE, and more.

1. Create a Desktop Entry File in `~/.local/share/applications/yourapp.desktop`

```bash
[Desktop Entry]
Name=Your App Name
Exec=/opt/yourapp/executable
Icon=/opt/yourapp/icon.png # can be omited
Type=Application
Categories=Graphics;
```

2. Ensure the executable has the necessary permissions to be run
3. Refresh Icon Cache[May not necessary]

```bash
update-desktop-database ~/.local/share/applications/
```



### Open Desktop Icon as Root

[link](https://askubuntu.com/questions/118822/how-to-launch-application-as-root-from-unity-launcher) [TODO]

1. locate your desktop `locate .desktop | grep APPNAME`
2. edit this desktop config file



