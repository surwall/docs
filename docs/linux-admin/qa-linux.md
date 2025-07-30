## "Command is not found" error
### "Clear" is not found
You can install it via the "ncurses" package with `sudo apt-get install ncurses-bin` on Debian-based distros or `sudo yum install ncurses` on rpm-based distros.

### "cal" is not found
1. On Ubuntu use `sudo apt install ncal`

### "man" is not found
1. On Fedora use `sudo dnf install man-pages man-db`
2. On Ubuntu use `sudo`



## Inspect Info about Linux

### Check Linux version and Distro name

1. use the command `screenfetch` or `neofetch`, the latter is preferred by its active development.
2. Almost Every distro have the file `/etc/os-release` that tells you about the Distro version and codename
3. You can also use the command `lsb_release -a`



## Software Related Issues
### Use custom repository address
First, we should [QA-LINUX](#check-linux-version-and-distro-name). For instance, the codename for Ubuntu 22.04lts is "jammy".


## find ip gateway in Linux
```bash
ip route
```

## alpine renew dhcp addresses
Alpine is a embed system the normal tool dhclient eth0 is not available, but the busybox toolset provides "udchp", you can use the following command:
```bash
udhcpc command
```
From [link](https://stackoverflow.com/questions/54294218/running-dhcp-renew-lease-command-from-docker-alpine-container)
[link](https://wiki.alpinelinux.org/wiki/Configure_Networking#Activating_Changes_and_Testing_Connectivity)


## remote connect Linux
1. Using rdp
   By using xrdp which is the open source implementation of RDP on Linux
3. Using x11-forwarding
4. [No machine](https://www.nomachine.com/)


## provide command not found suggestion like in ubuntu

```bash
sudo apt install command-not-found
```



## use custom dns

Dhcp might overwrite the /etc/resolve.conf

So you might use some tools to prepend your custom dns servers.

You can make static additions to /etc/resolv.conf. Those additions could override the things that are being automatically added.

First, install the resolvconf package.

Then, press Alt+F2 and run gksudo nautilus. Open /etc/resolvconf/resolv.conf.d/head if you want to add to the start of the file; open /etc/resolvconf/resolv.conf.d/tail if you want to add to the end. Make your changes, save/close the files, and then run sudo resolvconf -u to apply the changes.

(Sorry that I don't remember if the settings at the start or end of the file have the highest priority.)

 

From https://askubuntu.com/questions/58781/resolv-conf-keeps-getting-reset-by-something
