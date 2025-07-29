## Intro
There are three software installation methods:
1. install from repositories using a package manager
2. install individual packages downloaded to the local system
3. compile source code 

Since different distributions have different package format, namely, `.deb` for Debian-based distros, like Debian, or Ubuntu. `.rpm` for RHEL-based distros.

## Why Using a Package Manager
Package-management systems offer many benefits:
1. allow to upgrade softwares easily
2. provide dependency checking, so it might automatically donwload the required dependencies
3. provide verification for packages downloaded to ensure security
4. provide tools for building packages

RPM and Debian package names contain the same information, but they are expressed slightly differently. 
1. package-version-release.architecture.rpm
2. package_version-revision_architecture.deb
`release` and `revision` indicate the revision number of the package for that version. The value of architecture may be `i386` or `amd64` or `noarch` for a binary package or `src` for an RPM source package.
Both RPM and the apt system back up old files before installing an updated package.

## Package System
[apt package system](apt%20package%20system.md)
[Alpine-User-Guide](Alpine-User-Guide.md#Package%20Manager)


## Compiling Softwares
1. Download
2. Extract
3. Compile
4. Install

For a concrete example, let's compile [NGINX](https://nginx.org/en/download.html).

1. download the tarball
   ```bash
   wget https://nginx.org/download/nginx-1.26.2.tar.gz
   ```

2. see the content of it and make sure all the files are under a parent directory
   ```bash
   tar tf nginx-1.26.2.tar.gz
   ```

3. extract this file
   ```bash
   tar xvf nginx-1.26.2.tar.gz
   ```

4. configure before compiling (make sure "build-essential" is installed)
   ```bash
   cd nginx-1.26.2
   ./configure --help
   ./configure --prefix=/usr/local/nginx # the default value is also this
   ```

   > [!warning]
   >
   > Note that before configuring it, it best to read the README file, to know which location is configured to install, or you can manually specify the location

   It might has some errors when configuring, in this case, it requires some dependencies

5. compile the program
   ```bash
   make
   ```

6. install the program

   ```bash
   make install
   ```

7. link the NGINX binary or create a systemd unit
   ```bash
   ln -s /usr/local/nginx/sbin/nginx /usr/local/sbin/nginx
   ```

> [!tip]
>
> For GUI applications, we normally put them under `/opt/app-name` or `/opt/vendor/app-name` and create a desktop entry.

## 源码安装
1. /usr 系统目录
2. /usr/local 用户自己编译的软件安装到这个目录
3. /opt 用户级的程序目录，可以放第三方大型软件，或者游戏




## 常用软件安装

### redis
```bash
# latest stable
wget https://download.redis.io/redis-stable.tar.gz

tar -xzvf redis-stable.tar.gz
cd redis-stable
make
# 指定目录安装
make PREFIX=/usr/local/redis install
/usr/local/redis/bin/redis-server # 启动
```