## Installation
1. download fedora iso, besides the gnome version, there are other variants like KDE, XFCE. I like KDE Spin. You download through a [mirror](https://mirrors.tuna.tsinghua.edu.cn/#).
2. 

check more about [KDE release schedule](https://community.kde.org/Schedules/Plasma_6)



## use flatpak
Flatpak is the recommended way to use GUI applications on Linux Desktop because it's reduce the chance of dependency conflicts.
To use Flatpack in China you normally would set a mirror to download packages from [FlatHub](https://flathub.org/en), type the following:
```bash
sudo flatpak remote-modify flathub --url=https://mirror.sjtu.edu.cn/flathub

# if any error happened
wget https://mirror.sjtu.edu.cn/flathub/flathub.gpg sudo flatpak remote-modify --gpg-import=flathub.gpg flathub
```

