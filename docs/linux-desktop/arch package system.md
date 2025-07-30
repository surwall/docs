## Build Aur by Yourself
1. ensure `base-devel` and `git` is installed
2. Acquire the build files, including the `PKGBUILD`. using by `git clone` repos on [aur](https://aur.archlinux.org/)
3. Run `makepkg` in the directory where the files are saved. This will download the code, compile it, and package it.
4. Run `pacman -U _package_file_` to install the package onto your system. Or just use `makepkg -si` to make and install
## Paru
```bash
paru <target> # Interactively search and install `<target>`
# limit each source's result to 10,if have 2 sources, it woudl 20
paru <target> --limit 10 
paru # Alias for paru -Syu
paru -S <target> # install a specific package
paru -Sua # upgrade AUR packages
paru -Qua # Print available AUR updates
```
## Yay
### Build Yay
```bash
pacman -S --needed git base-devel
git clone https://aur.archlinux.org/yay-bin.git
cd yay-bin
makepkg -si # install(-i) and add required deps with -s
```
### Use Yay
>[!note]
>First use, use `yay -Y --gendb` to generate a development package database for `*-git` packages that were installed without yay. This command only be run once.
```bash
# search and install aur packages
yay <Search Term>
# Perform system upgrade, but also check for development package updates.
yay -Syu --devel
# clean unneeded deps
yay -Yc

yay #Alias to yay -Syu
```
>[!tip]
>- Use `yay -Y --devel --save` to make development package updates permanently enabled (`yay` and `yay -Syu` will then always check dev packages)

## Use Pacman

## Install a Package
1. directly install a package (may be stale) without updating

   ```bash
   pacman -S package_name
   ```
2. updating database(repo.db) first, and then install the package

   ```bash
   pacman -Syu package_name 
   ```
3. update all packages and install

   ```bash
   pacman -Syu # upgrade all packages
   pacman -S package_name # install that package
   ```
The `-y` will update the package lists(repo.db). 
The `-u` will upgrade all installed packages to the latest known versions.

>[!warning]
>We don't do something like `pacman -Sy package_name`, since we first update list, so we download the latest version of the package, so it requires all new version dependencies. However, we don't upgrade all old packages on the system. It make conflicts that new packages require new dependency, but old packages still rely on old dependency.

>[!tip]
>We can use crontab to update system automatically
>```bash
># run at 12am at week 1,3,5
>0 12 * * 1,3,5 pacman -Syu --noconfirm
>```
>Note that you should enable `cronie` service. 
## System Update

```bash
sudo pacman -Syu
```

## Remove a Package

```bash
sudo pacman -R package_name
# remove any unnecessary deps
sudo pacman -Rs packge_name
```

## Querying Package Databases

`-Q` flag queries the local package database.  

`-F` queries the files database(need to download first)  

`-S` queries the sync(remote) database

1. search for a string both in package's names and descriptions

   ```bash
   pacman -Ss string1 string2
   pacman -Ss '^vim-' # regex
   pacman -Qs string1 # local database
   ```
## Display Local Packages List

```bash
sudo pacman -Q
sudo pacman -Qm # show all packages not in the database, like aur
sudo pacman -Q package_name # show a specific package
```

## Display Information about Package

```bash
pacman -Si package_name
pacman -Qi package_name
```

## Search for a Package that Contains a Specific File
```bash
pacman -Fy # update the files database like apt-file update in debian
pacman -F pacman # search pkg that contains a file called pacman

pacman -Qo $(which vim) # for local packages, it should be a full path
```

## Retrieve All Files List of a Package

```bash
pacman -Sl package_name
pacman -Ql packge_name
```

## Change Repositories
The mirrors for the official repositories are included from `/etc/pacman.d/mirrorlist`

1. detect and change the mirror automatically

   ```bash
   reflector --country China --sort rate --save /etc/pacman.d/mirrorlist
   ```

2. manually add a mirror

   ```bash
   echo '' > /etc/pacman.d/mirrorlist # empty the file 
   sudo sed -i '1i \Server = https://mirrors.tuna.tsinghua.edu.cn/archlinux/$repo/os/$arch' /etc/pacman.d/mirrorlist
   ```

3. Use archlinuxcn (it contains paru and yay binary so you don't have to build it by yourself)

   ```bash
   # optional if import gpg key failed
   pacman-key --lsign-key "farseerfc@archlinux.org"
   
   pacman -Sy archlinuxcn-keyring
   
   # insert two lines into /etc/pacman.d/mirrorlist
   sudo sed -i '$a \
   [archlinuxcn]\
   Server = https://mirrors.tuna.tsinghua.edu.cn/archlinuxcn/$arch' /etc/pacman.conf
   ```

## Trouble Shooting

