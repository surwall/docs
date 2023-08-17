# Mirror

In China, because of the GREAT WALL, any Internet connection to abroad servers will be extremely slow. In order to overcome this, we could use proxy server. However, proxy server's bandwidth costs, so we have set up a mirror repository for various things to reduce bandwidth and improve connectivity, like ubuntu apt source, npm mirror site, etc.

The following are just a list of all mirrors in China:

1. [大学镜像集合](https://mirrors.cernet.edu.cn/list)
1. [清华大学开源软件镜像站](https://mirrors.tuna.tsinghua.edu.cn/help/ubuntu/) 
2. [腾讯软件源](https://mirrors.tencent.com/)
3. [阿里巴巴开源镜像站](https://developer.aliyun.com/mirror/) (rate limit of 2MB)
4. [华为开源镜像站](https://mirrors.huaweicloud.com/home)



## Python
In Python, pip is the deafult package manager. The config file for it is store at `%appdata%/pip/pip.ini`on Windows or `$HOME/.config/pip/pip.conf` on Linux.

This command will set pip to download packages from mirrors:  

```bash
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
```



## NODEJS



## JAVA



## RUBY

