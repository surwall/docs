## Intro

Alpine is a niche Linux distros that have a very minimum size, it only appears as a base system for containers. It can reduce to 8M, which is unbelievable. 

## Getting Started with Alpine

You can download Alpine at [their download page](https://www.alpinelinux.org/downloads/). We choose extended version. After you boot into your iso either in real hardware or virtual machines. It will prompt you with a shell. You can login as root without password, and then type `setup-alpine` to start installation. 

You answer all the questions accordingly, then you can reboot into your newly installed system. Or you can preprogram various answers to `setup-alpine` questions. 

1. `setup-alpine -c ANSWER_FILE` will create a new answer file with the following default values. 
2. You can edit this file and use it with `setup-alpine -f ANSWER_FILE`. 



## Package Manager

`apk` is the Alpine Package Keeper - the distribution's package manager. Repositories for it are configured in a file named `/etc/apk/repositories`, and valid signing keys are located under `/etc/apk/keys/`. Here is an example of  `/etc/apk/repositories` file, that uses all stable repositories.  

```text
http://dl-cdn.alpinelinux.org/alpine/v3.13/main
# http://dl-cdn.alpinelinux.org/alpine/v3.13/community
```

### Changing Repositories

You may use `setup-apkrepos` utility, which will fetch a list of valid repositories, and you can choose the fastest among them. Or you can directly edit your `/etc/apk/repositories` (Multiple repositories is supported).  

```text
#/media/cdrom/apks
http://mirrors.ustc.edu.cn/alpine/v3.19/main
#http://mirrors.ustc.edu.cn/alpine/v3.19/community
http://mirrors.tuna.tsinghua.edu.cn/alpine/v3.19/main
#http://mirrors.tuna.tsinghua.edu.cn/alpine/v3.19/community
```


### Searching Packages

Note that the manual aren't shipped with the program package, it's a separate package that ends with `-doc`. For instance, the man pages for `vim` is `vim-doc`. 

```bash
apk search vim
apk search -e vim # exact search
```

### Adding or Removing Packages

```bash
apk add busybox-extras 
apk add bash zsh
apk del vim
```

### Bulk Install

The packages you want to have explicitly installed are listed in the "world file", available in `/etc/apk/world`. If you've edited it by hand, you may run `apk add` with no arguments to sync packages. 

### Querying Package Information

```bash
apk info vim
apk info -h vim # check "Info Options" 
apk info -L vim # display all its content
```

## System Upgrade

Updating the system using apk is very simple. One need only run two steps `apk update` and `apk upgrade`.  That's limited to a static version. How to do the big upgrade? Firstly you have to check your alpine version by these commads:  

```bash
cat /etc/alpine-release
alpine -version # RUN apk add alpine before you execute that
```

Here are steps to upgrade to a newer stable version: 

1. Edit the `/etc/apk/repositories`, in my case, it's Alpine 3.19, if then Alpine 3.20 comes out, change the version number from 3.19 to 3.20.

   ```text
   http://mirrors.ustc.edu.cn/alpine/v3.20/main
   #http://mirrors.ustc.edu.cn/alpine/v3.19/main
   ```

2. Fetch latest index by running the 

   ```bash
   apk update
   ```

3. Upgrade all your Alpine packages

   ```bash
   apk upgrade
   ```

4. Reboot the system by  typing `reboot`

