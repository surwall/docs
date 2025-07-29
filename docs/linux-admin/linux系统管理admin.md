## unix系统发展
1. unix诞生 1969年底 ken tompson, dennis ritchie根据multics项目经验开发一个多任务操作系统  unics，后改为unix
2. 1973年，用c语言重写unix
3. 1991年10月，linus torvalds发布第一个公开版0.02内核linux

## linux系统内核
版本号：主版本.次版本.修订号

## linux发行版本
red hat enterprise linux 5/6/7/8 企业用的最多的是7 RHEL
suse linux enterprise 12
debian
ubuntu

## 磁盘介绍
ide 磁盘 接口是针 已经淘汰
scsi 金手指  服务器用
sata 金手指  家用

linux中用文件表示设备
1. /dev/sda sd表示scsi设备  a代表磁盘顺序号 sdb代表第二块scsi硬盘 
2. /dev/hda hd表示ide设备
3. /dev/vda vd是kvm虚拟机专用虚拟磁盘



## centos图形操作
![](assets/Pasted%20image%2020230308145522.png)

![](assets/Pasted%20image%2020230308145612.png)

右键打开终端
字体变大：ctrl shift +
字体变小 ctrl - 



## 命令行
经常使用`ls /`或者`ls /etc`去查看根目录的内容，熟悉结构。
ls可以查看指定目录内容，而不用cd进入那个目录
```bash
ls /etc
ls /home
ls /boot
ls /opt
ls /opt/ # 如果是列出文件夹可以加/
ls /root/anaconda-ks.cfg # 列出当前文件

```

![](assets/Pasted%20image%2020230308150209.png)
linux使用不同颜色表示不同文件类型，蓝色文件夹，黑色普通文件。

### 查看文件内容
```bash
cat /root/anaconda-ks.cfg # 查看文件内容
cat /etc/redhat-release # 查看系统版本
less /etc/redhat-release # 查看内容多的文本
```
### less查看文本文件
less适合查看内容较多文件
1. 按上下键滚动
2. 查询关键字 /bin  （全文查找bin关键字）
![](assets/Pasted%20image%2020230308151451.png)
3. 按n往下查询跳转，N往后查询
4. 按q退出

### 查看主机名
`hostname` 默认只显示第一个点之前的
`hostname A.haha.com`  临时设置主机名
`hostnamectl set-hostname nb.tedu.cn` 永久设置主机名

### 查看系统信息
1. 查看cpu `lscpu`
2. 查看内容 `cat /proc/meminfo`
3. 查看内核版本  `uname -r`


## 查看ip地址
`ifconfig`查看ip地址，网卡是ens33
临时设置ip `ifconfig ens33 192.168.1.1`

## 创建数据
1. 创建目录 `mkdir b.txt` 创建名为b.txt的目录（linux不以拓展名区分文件夹）`mkdir a b c` 创建a,b,c多个文件夹 
2. 创建文件 `touch a.txt`   `touch /opt/1.txt`

## 查看数据
1. 查看头部 `head -1 /etc/passwd` 查看头部第一行 默认展示10行
2. 查看尾部倒数3行 `head -3 /etc/passwd`
3. 过滤文本文件中的关键字  `grep root /etc/passwd` (打印带有关键词的行)
	1. 格式：grep '查找条件' 目标文件


## vim
末行模式 `:wq`  保存并退出  
末行模式 `:q!` 强制不保存退出

## 关机及重启
poweroff 关机
reboot 重启

## linux程序
![](assets/Pasted%20image%2020230308180723.png)
绿色是可执行程序，青色是快捷方式。

命令的执行依赖于解释器（默认解释器/bin/bash）
所有的解释器存放在`/etc/shells`中
用户 --> 解释器 --> 内核 --> 硬件
`which hostname`  查询命令对应的程序

### 命令行的一般格式
`command [选项]... [参数1] [参数2]` 中括号代表可选
`ls -al /root /proc`
使用帮助 `ls --help`
选项：
* 短选项 -l、-A、-c
* 多个短选项->复合选项 -lh、-lA、-ld ,也可以 -l -h这样写
* 长选项 --help `ls --all --escape`

`cat -n /etc/passwd` 显示行号 `cat -n /etc/fstab`

`ls -l /etc/passwd`显示文件详细信息，权限等信息
`ls -ld /root` 如果参数是文件夹，显示文件夹权限，而不是子内容
`ls -lh /etc/passwd`提供易读容量单位(K,M) 

## 终端编辑技巧
`ctrl+l`清屏
`Alt + .` 粘贴上一个命令的参数 `cat /etc/passwd -> cat -n [Alt + .]`


## mount挂载操作
在windows平台会自动挂载磁盘设备，有的linux发行版不会挂载，需要手动挂载。
实际案例：从光盘中安装软件包时，需要挂载光驱设备（也就是包含光盘的设备）。  
所有的设备都在 `/dev/`目录下，默认光驱名为`/dev/sr0` (SCSI CD-ROM)，也可以用快捷方式`/dev/cdrom` 

* windows  cd -> 光驱设备 -> cd驱动器（访问点）
* linux  cd -> 光驱设备 -> 目录（访问点）

mount挂载可以让目录成为设备的访问点
格式：mount 设备路径 挂载点目录   
`mount /dev/cdrom /dvd` 将/dvd作为光盘挂载点（只能是只读挂载），可以为设备设置多个挂载点。 `mount /dev/cdrom /cd` `mount /dev/cdrom /dvd`
`umount /dvd`取消挂载点 `umount /dev/sr0`卸载当前设备所有挂载点
`mount -l | grep /dev/sr0`查看设备所有挂载点
重启可以释放掉临时挂载。

## 基础专精
家目录专门存放用户个性化信息的目录，比如桌面是个性的，
`~lisi`代表用户lisi的家，普通用户的家在`/home`里面
`/root`是root的家

`ls -A /root`显示所有内容除.和..
`ls -R /opt/`列表当前和所有子文件夹内容

## 通配符
`*` 任意多个字符
`?` 单个字符
`ls -d /m*` 列出所有m开头文件
`ls /etc/*tab` 所有以tab结尾的
`ls /etc/re*.conf`
`ls /dev/tty?` tty1到tty9
`ls /dev/tty[3-9]` tty3到tty9 多个字符中的一个
`ls /dev/tty{26,19,22,33}` 多组不同字符串，全匹配 tty26, tty19

## 别名
`alias` 查看所有别名 
`alias 别名='实际执行的命令行'` =左右不能有空格 `alias myls=ls -al`
`alias myls` 查看myls别名具体内容
`unalias hn` 取消别名
`alias pwd=hostname` alias优先级比命令高，会覆盖命令

## 删除
操作系统定义了别名`alias rm=rm -i` 所以每次删除会有提示。
`rm -r` 递归删除
`rm -f`强制删除

## 文件操作
### 创建文件
`mkdir /opt/aa/bb` 连同父目录一同创建

### mv文件
`mv /opt/1.txt /opt/nsd01` 将源文件移动到指定的目录（已经存在）
`mv /opt/nsd01 /opt/tc` 将nsd01文件(夹)改名
mv分为两种情况
`mv source dir` 如果dir是文件夹，就将source存入dir，不用管source是文件夹还是文件
`mv source target` target不为文件夹，执行改名的操作，如果target存在，会覆盖。

### cp文件
`cp source... target` target如果是一个文件夹，则可以将多个source复制到文件夹中
`cp source target` target不存在或者是普通文件，则复制到那个路径
`cp /etc/passwd /opt`
`cp -r /boot /opt` 复制文件夹需要带r
**有时候需要强制覆盖cp，但默认cp是alias cp=cp -i，覆盖会有提示，又不想取消别名，可以在命令前加`\`，临时取消别名**
`\cp -r /boot /opt/ ` 临时取消别名
`cp /etc/passwd .`将文件复制到当前目录下

## grep专精
grep是在每一行应用查询条件
`grep -i ROOT /etc/passwd` 忽略查询条件root的大小写
`grep -v root /etc/passwd`  不包含root，取反条件
`grep ^root /etc/passwd` 这一行必须以root开头
`grep root$ /etc/passwd` 这一行必须以root结尾

`grep ^$ /etc/default/useradd` 过滤出空行
`grep -v ^$ /etc/default/useradd` 不展示空行
`grep -v ^# /etc/default/useradd | grep -v ^$` 不展示#开头注释行以及空行
`grep -v ^# /etc/login.defs | grep -v ^$ > /opt/log.txt` 重定向写入文件  
`grep -v ^# /etc/login.defs | grep -v ^$ | wc -l` 统计有效行数
`grep -v ^# /etc/man_db.conf`



## 命令行基础

## 目录及文件管理


## 文本内容操作


## 归档和压缩
归档将多个零散文件整理为一个文件，大小不变
压缩用某种算法减少文件大小
* 常见压缩格式及命令工具
	* .gz -> gzip
	* .bz2 -> bzip2
	* .xz -> xz
### tar工具 集成备份工具
格式：tar 选项 /路径/压缩包名字 /源数据...
f必须要在选项的最后
-x 代表解开tar包
-c 代表创建tar包
-z、-j、-J 调用gz，bz2，xz格式工具进行处理
-t 显示归档中文件清单
-C 指定释放路径
`tar -zcvf /root/xixi.tar.gz /etc/passwd /home`
`tar -jcvf /root/xixi.tar.bz2 /etc/passwd /home`
`tar -Jcf /root/xixi.tar.xz /etc/passwd /home`
tar使用绝对路径会保留结构`/etc/passwd`变成`etc/passwd`
`.tgz`是`.tar.gz`的缩写,tar是tar包，gz是压缩包
`tar -xf /root/xixi.tar.gz -C /root` 解压缩会自动识别类型，-C指定解压路径。
`tar -tf /root/xixi.tar.gz` 查看tar包内容

### unzip工具
unzip跨平台
格式：zip [-r] 备份文件.zip 被归档文件...
-r 被归档数据有目录，必须加上此选项
`zip -r /opt/abc.zip /etc/passwd /home`
`unzip /opt/abc.zip -d /nsd20` 解压目标文件夹




## 重定向和管道
`head -2 /etc/passwd > /opt/y.txt` 将标准输出重定向到文件  
`hostname >> /opt/y.txt`  追加重定向  
`echo nb.tedu.cn > /etc/hostname` 输出到文件  
`>/opt/a.txt` **清空文件内容**

### 管道
管道负责将数据从一处传递到另一处，将左侧标准输出作为右侧的标准输入，不是所有命令支持标准输入，双参数以上命令不支持管道，没有参数的命令也不支持标准输入
`cat -n /etc/passwd | head -12 | tail -5` 显示8-12行
`wc -l /etc/passwd /etc/login.defs` 统计行号

## 查询帮助
如果是普通命令可以使用man查询，还可以使用`--help`
如果是shell命令，man不管用，需要使用help `help cd` 
`man 5 passwd` 查看配置文件类型帮助类型，，有命令叫passwd，有配置文件叫passwd，所以要区分类型。


## 文件查询
## find查询文件
find会查询路径内所有文件，即使找到了，也会继续查询。
格式：`find [目录] [条件1]`
条件：
* -type 类型 (f文本文件、d目录、l快捷方式)
* -name "passwd" 查询名字为passwd，严格匹配，"*tab"
	* `find /etc -name "*.conf" | wc -l`
	* `find /etc -name "*tab" | cat -n`
* 满足多个条件 `find /root -name "xixi*" -type d`
* 满足其中一个 `find /root -name "xixi*" -o -type d`
* -size +或者- 文件大小 （k,M,G）区分大小写
	* `find /boot -size +300k` 超过300k的文件
	* `find /boot -size +10M`
	* `find /boot -size +1M`
	* `find /boot -size +3M `
	* `find /boot -size -1M` 小于如果是1会有bug
* -user 所有者 
	* `find /home -user lisi`  所有属于lisi，   这个员工离职了，移出他的文件
* -mtime 修改时间 （所有时间条件都是过去时间）
	* `find /root -mtime +90` 90天之前的数据，查找3个月前的文件
	* `find /root -mtime -10` 最近10之内的数据
	* `ls -ld $(find /root -mtime +90)`
* -exec 处理搜索完数据,
	* `find /boot -size +10M -exec ls -lh {} \;` {}会填充搜索结果 `\;`表示结尾
	* `find /boot -size +10M -exec cp {} /mnt \;` 拷贝满足条件的文件
	* find每查询到一个结果就单独执行一次exec,所以`find /boot -size +10M -exec tar -zcf {} \;` 查询出两个结果，执行了两次单独的tar，前一次结果被覆盖

> /proc内存的数据，不占用硬盘空间,find不能查询会报错

## rpm软件包管理
rpm将安装的软件集中存放在某个数据库中

### 查询已经安装软件
-v 显示细节  
-h 以#号显示安装进度  
--force 强制安装、覆盖安装  
`rpm -ivh *.rpm` 安装某个包，可能要手动解决依赖关系  
`rpm -qa` 当前系统所有已安装软件  
`rpm -q firefox` 精确匹配 ，不太好  
`rpm -qa | grep firefox` 查询是否安装firefox  
`rpm -q httpd`  
`rpm -q bash`  
`rpm -qi firefox` 查询软件信息（查询已安装） 
`rpm -ql firefox` 查询软件安装哪些内容（软件清单）
`rpm -qf /usr/bin/vim` 查询命令对应的程序文件，是由哪个安装包安装的，即使`/usr/bin/vim`现在不存在（以前安装的时候有，记录在数据库中）也能查询，比如不小心将`/usr/bin/vim`删除，查询是由哪个程序安装的，重新装一遍程序，恢复该文件。

`rpm -qpl /mnt/Packages/vsftpd-3.0.2-22.el7.x86_64.rpm` 查软件包安装清单  
`rpm -qpi /mnt/Packages/vsftpd-3.0.2-22.el7.x86_64.rpm` 查看软件包的信息  

经过认证的包有签名signature，每个包有红帽签名，警告是因为centos不认识红帽签名。
```bash
[root@nb Packages]# rpm -qpi ./vsftpd-3.0.2-22.el7.x86_64.rpm 
警告：./vsftpd-3.0.2-22.el7.x86_64.rpm: 头V3 RSA/SHA256 Signature, 密钥 ID f4a80eb5: NOKEY
```

`rpm --import /mnt/RPM-GPG-KEY-CentOS-7`导入红帽签名，警告消失。

### 解决依赖关系
安装包需要安装其他包。   
yum作用：自动解决软件包依赖关系  
yum服务端：具备众多软件包，存储仓库数据文件（分类），repodata就是仓库数据文件。
yum客户端：配置仓库位置，同步仓库数据文件  
yum执行流程： /etc/yum.repos.d/mydvd.repo -> baseurl  

1. 本地配置yum，yum服务端和客户端都是本机  
2. 配置存放在`/etc/yum.repos.d/*.repo` ，错误文件会影响正确文件  
3. 默认配置可能不好用，先备份起来  
	1. `mkdir /etc/yum.repos.d/bak`
	2. `mv /etc/yum.repos.d/*.repo /etc/yum.repos.d/bak`
4. 编写自己的repo文件
```conf
[mydvd] # 标识
name=centos7 # 描述
baseurl=file:///mnt  #仓库位置 http://
enabled=1 # 启动仓库
gpgcheck=0 # 不检查签名
gpgkey=file:///mnt/RPM-GPG-KEY-CentOS-7 #gpgcheck=1表示启动，需要写key的位置
```
5. 配置完repo，可以列出仓库信息 `yum repolist`
6. `yum -y install httpd` 安装
7. `yum remove gcc` 卸载软件，会判断依赖关系，依赖当前软件的也会被一并卸载。
8. `yum list` 展示所有软件
9. `yum list ftp` 展示ftp软件包，精确查询
10. `yum search ftp` 模糊查询， 介绍相关、名字相关就会匹配上
11. `yum provides /etc/hostname` 查询文件来源，查询所有仓库软件的文件清单 `yum provides */gcc` 不知道路径查询  
12. `yum -y reinstall hostname` 不小心删了hostname,重新安装
13. `yum clean all` 清空缓存，默认仓库配置缓存在内存中，改了仓库配置文件，需要清空缓存，重新加载配置 `yum repolist`

> yum install xeyes 安装一双大眼睛跟随你的鼠标

### 自定义yum
1. 在有rpm包的文件中运行 `createrepo /tools/other` 生成repodate数据文件夹，生成后这个文件有软件包也有数据文件符合了yum源的条件。  
2. 增加yum配置 `/etc/yum.repos.d/mydvd.rep`  
3. 查看源 `yum repolist`  
> 如果修改rpm库，需要重新生成repodata，因为不会自动更新，然后`yum repolist`还有缓存，所以还需要`yum clean all`。  


## 历史记录
`history` 默认展示最近1000条命令
`history -c` 清空历史命令
`! cat` 执行最近一条以cat开头的命令

## 统计目录所占空间
du统计文件占用空间
`-s` 只显示单个目录
`du -sh /root`
`du -sh /` 所有主目录

## 时间相关
`date` 显示默认时区时间
`date -s "2008-10-1 12:11:08"` 修改时间
`date +%Y`显示年
`date +%m` 显示月
`date =%d` 显示日
`date +%H` 显示时
`date +%M` 显示分
`date +%S` 显示秒
`date +%F` 显示年-月-日 (经常使用，作为备份名)
`date +%R` 显示时：分

## 制作链接文件
格式：ln -s /路径/源数据 /路径/快捷方式名称 
默认硬连接，-s代表软链接，硬链接只能链接文件，不支持目录，不支持跨分区
`ln -s /etc/sysconfig/network-scripts/ /ns`
`ls -l /ns` 查看快捷方式结尾不要带/，否则是文件夹里面的内容


## 用户管理
### 用户账户
作用：1.可以登录操作系统 2.不同用户具备不同权限
唯一标识： UID(编号从0开始，默认最大60000，可以手动改)，zhangsan(UID 1200)
管理员root的UID：永远为0，（可以手动改成多个0，就是多个管理员）
系统用户（为程序运行与服务运行提供身份）1-999
普通用户的ID： 默认从1000开始，第一个是1000

### 组账户
唯一标识：GID （编号从0开始，默认最大60000）
sg  (1500) 
linux一个用户至少属于一个组
基本组：创建用户没指定组，系统默认会创建的组与用户同名
附加组(从属组)：由管理员创建，由管理员进行加入

本地账户的数据文件
* `/etc/passwd`
	* 每个用户记录一行
	* 名字:密码占位符:UID:GID:用户描述信息:宿主目录:登录shell
* `/etc/shadow`
* `/etc/cgroup` 
* `/etc/cshadow`

### 添加用户
`useradd nsd01` 创建用户nsd01
`useradd -u 1300 nsd03` 指定uid 1300
`grep nsd01 /etc/passwd` 是否有该用户
`id nsd01` 查看用户的信息 (uid, gid, group)基本组，附加组
`whoami` 当前登录用户是谁

useradd
格式：useradd 【选项】用户名
-u 指定uid
-d 指定加目录，默认是/home/用户名，
-G 指定所属附加组
-s 指定登录shell
`useradd -d /opt/nsd04 nsd04` nsd04不能已经存在,指定家目录
`groupadd stugrp` 添加组
`useradd -G stugrp nsd08` 不影响基本组
`useradd -s /sbin/nologin nsd09` 禁止用户登录

### 修改用户属性
usermod  
格式：usermod  [选项]...  用户名
`usermod -l stu13 nsd13` 左侧新名字 右侧用户名
`usermod -u 1600 stu13` 修改uid
`usermod -s /sbin/nologin stu13` 修改shell
`usermod -d /opt/abc14 nsd14` 修改家目录，不会创建新的目录，只是改位置
修改属性本质上是修改`/etc/passwd`文件
`usermod -G tmooc nsd16` 重置附加组,基本组永远有
`gpasswd -a nsd16 tmooc` 添加nsd16用户到tmooc组中，（用来添加多个附加组）

### 修改用户密码
`passwd nsd01` 修改用户nsd01的密码，一个用户必须要有密码才能登录系统，管理员直接输入新密码重置
`echo 123 | passwd --stdin nsd01` 取消交互，直接设置密码，适用于脚本,（从标准输入获取密码）
`su - nsd01` 临时切换用户身份，`nologin`不能切换
`passwd` 普通用户只能修改自己密码

### `/etc/shadow` 
这个文件中存放用户密码，每创建一个用户，对应这个文件就要加一行。   
格式：
```bash
nsd01:$6$NVe937Nd$B0n94XrpQ.LipQHTpYh0iV/M4jCLdccfHxzRLprdxDzwk8WDDh/TzdTfh8lA9y9WKJ.8Ls/l5.w/1W.nV6CFX/:18481:0:99999:7:::
```
1. 用户名
2. 加密后密码字符串，没有密码为`!!`
3. 上次修改密码时间，距1970-1-1几天
4. 密码最短有效期，默认0，使用0天后可修改
5. 密码最长有效期，默认99999
6. 密码过期前几天警告，默认7
7. 密码过期后多少天禁用此用户账户
8. 账号失效时间，默认为空
9. 保留字段（未使用）

> 新建用户时，新建用户家目录，根据`/etc/skel`模板复制

### 删除用户
`userdel -r nsd14` 删除用户以及家目录
`userdel nsd01` 只删除用户

## shell配置
`~/.bashrc` 每次运行bash程序都会执行一遍，常用来定义别名
`~/.bash_profile` 每次登录系统时执行，定义初始变量值
`/etc/bashrc` 全局配置文件

### 组配置
`/etc/group` 保存组的信息
```bash
stugrp:x:1006:nsd08
组名：密码(现在都为x):GID:组的成员列表
```
添加成员 `gpasswd`
* -a 添加成员 `gpasswd -a kaka tarena` 加入kaka成员到tarena组
* -M 定义组成员列表 `gpasswd -M 'kaka,nb,jack' tarena` 重定义tarena组成员  
* -d 删除 `gpasswd -d nb tarena` 移出用户nb
* -M 清空组列表 `gpasswd -M '' tarena`

默认只能由root添加成员到组，可以分配组管理员，组管理不能分配管理权给其他人，只能由root指定。
`gpasswd -A 'nb,jack' tarena` 指定一个或多个组管理员给tarena
`/etc/gshadow` 存放组管理信息
```bash
tarena:!:nb:kenji,jack
组名：加密后密码：组管理员：组成员
```

`groupdel tarena` 删除组，不可以删除基本组  


## 计划任务
使用cron任务完成，
用途：按一定时间间隔反复执行某向操作
软件包：cronie, crontabs
系统服务：crond
日志文件：/var/log/cron
使用crontab命令
配置格式参考 /etc/crontab
```bash
# 月份1-12 星期0-7 0或者7代表星期日
分 时 日 月 周 任务命令（脚本的绝对路径）
*  *  *  * * 每分钟执行一次
30 8  *  * * 每天8:30执行一次
30 23 *  * * 每天23:30执行一次
30 23 *  * 5  每周五23:30执行一次
30 23 *  * 1-5 # 每周的周一至周五 23:30执行一次
30 23 *  * 1,3,6 # 每周周一、周三、周六23:30执行一次
30 23 1  * 1 # 每月的1号或者每周一晚上23:30执行一次
*/5 * * *   # 每隔5分钟
1  */2 * * # 每隔2小时执行

* * * * * datetime >> /opt/time.txt # 执行
```

* 编辑 crontab -e [-u 用户名]  `crontab -e -u root`
* 查看内容 crontab -l 一行就是一个计划任务


## 用户权限
判断用户是否对某个文件或文件夹有权限时，先判断是否是所有者，不是再判断是否属于组，不是那就是其他人，然后根据权限位决定权限。
```bash
-rw-r--r--.  1 root root      858 Nov  6  2016 GeoIP.conf.default
drwxr-xr-x.  8 root root      145 Mar  8 14:20 NetworkManager
```
权限依次是所属者，组，其他人。`-`代表没有该权限，在文件中`r,w,x`代表读取，修改，执行文件内容。一般给了x也要给`r`不然没有意义。
对于文件夹来说，`r`代表读取文件夹目录，`x`代表是否能进入目录，`w`代表能修改文件夹内容，比如删除某个文件，（但是能否修改文件取决于文件权限，如果文件没有写入权限但是有读取权限，vim能够使用强制写入，删除原文件，并创建新文件）。对于文件夹中`x`权限最重要，没有x,有了r，和w都没法进行别的操作。一般同时给`r,x`。
### 调整权限
`chmod o+x a.txt` 其他人加x权限
`chmod u+x,o-r a.txt`  设置多个权限
`chmod a+x a.txt` 所有人加执行权限
`chmod a=rwx /var/public` 设置权限
`chmod +x a.txt` 基本等于`a+x`但是会基于umask的最大允许权限判定，比如`umask -S`为`rwx rw r`那么只有owner才会加x权限。  

`chmod 770 /etc/fstab` 7代表4(r)+2+(w)+1(x)
数字模式：  
1. 0400 - 只允许读
2. 1000 设置sticky bit
3. 2000 设置setgid bit 
4. 4000 设置setuid bit
5. 7000 设置上述所有特殊权限

设置公开目录使用`chmod 777 /public` ，比如`tmp`就是公开目录，所以在终端下显示绿色，表示开放。但是公开目录，所有人能够随意删除其他人创建的文件，不太合理，想要除了所属人，所有人都只能修改或者新增文件夹内容，或者删除自己的内容，但是不能修改文件夹内容（意味着不能删除别人的内容），这时候可以设置粘滞位(sticky bit)，设置完后，会占用other的x位置，`drwxrwxrwt`，可能是大写T，意味着没有给x权限，（这没有意义）。
```bash
chmod 777 /home/public
chmod o+t /home/public # 设置粘滞位
```



### 修改归属关系
```bash
chown 属主：属组 文件...
chown -R 递归修改归属关系
chown lisi:tmooc /nsd15 # 同时修订user,和group
chown :tmooc /nsd15 # 只修改group
chown lisi /nsd15 # 只修改lisi
```

### 附加权限
set GID权限(SGID)
占用属组的(Group)的x位，显示为s或者S，取决是否有x位，只对目录有效。
在一个有SGID权限的目录下，新建文件会自动继承此目录的属组身份，新建文件夹后，改了属组，孙文件不会继承。  `chown g+s /nsd18`   

suid权限  
设置了suid权限后，其他人能在运行时获得属主身份，比如创建一个特殊的mkdir,为hahadir，赋予s权限，hahadir创建的文件都是属主都是root,能在根目录创建文件，非常危险，因为系统认为他就是root。  

预设权限
创建文件或者文件夹的默认权限
umask 展示0022 ，相当于777-022，文件夹默认有755权限，文件默认没有x权限。
umask -S 查看真实权限  

## ACL策略
acl解决问题：对特殊的人设置特殊权限，实现更精准的控制。  
大多ext3/4,xfs已经支持acl  
设置acl后，使用acl权限判断机制，不再使用常规权限判断。
acl是一条一条规则，按照user,group,other匹配规则，（匹配即停止）  
显示判断是否是owner，是就匹配规则，else看有没有特殊user匹配，else是当前group，else特殊group，else匹配其他人。匹配到对应的那条规则后，进行权限判断。  

设置acl格式：  
setfacl 【选项】 u:用户名：权限 文件...  
setfacl 【选项】 g:组名:权限 文件...   
选项:  
-m 修改acl策略  
-x 清除指定策略   
-b 清除所有设置的acl策略  
-R　递归设置acl策略  
```bash
setfacl -m u:dc:rx /nsd22 # 给dc用户添加rx
setfacl -x u:zhangsan /nsd22 # 删除指定用户规则
setfacl -b /nsd22 # 清除所有acl策略

getfacl /nsd22 # 查看acl
```
acl是白名单机制，有一种黑名单用法，单独拒绝某些用户 。`setfacl -m u:lisi:--- /home/public`  


## 磁盘管理
磁盘使用的步骤  识别硬盘 -> 分区 -> 格式化 -> 挂载使用  
列出当前系统识别的硬盘 `lsblk`  
分区工具 `fdisk /dev/sdb`   一般用来格式mbr  
格式化分区 `mkfs -t ext4 /dev/sdb1` 格式化为ext4  
格式化分区为 `mkfs -t xfs -f /dev/sdb2` 强制格式化  
查看文件系统 `blkid /dev/sdb1`   
查看挂载信息 `mount | grep /dev/sdb`  
查看挂载信息 `df -h | grep /dev/sdb` 查看挂载点   
刷新分区表  `partprobe`  （最好分区前卸载设备，分区完再挂载） 

### 开机自动挂载
`/etc/fstab` 定义自动挂载配置
格式：   
设备路径 挂载点 文件系统类型        参数                           备份标记      检测顺序
/dev/sdb  /mypart   ext4                   defaults(默认配置)     0（不备份）     0（系统盘才检测，0不检测）


使用：`mount -a` 1. 检测fstab格式是否正确 2. 对没有挂载设备进行挂载

### gpt分区
gpt分区一般使用parted工具。  
```bash
parted /dev/sdb # 进入交互模式
mktable gpt # 转换成gpt分区
mkpart 
起始点：1 (默认开始位置)
结束点: 5GB （-1代表到末尾）

print # 当前情况
unit GiB  # 转换显示模式
quit # 退出

```

### 交换空间swap
swap最好不要超过16G,最好为内存的2倍，虚拟内存，用来缓解内存压力。  
`swapon`查看当前swap分区，swap分区可以有多个。 
使用交换分区必须格式化成swap格式。
`mkswap /dev/sdd2` 格式化分区为swap，使用`blkid`查看是否为swap格式，使用`swapon /dev/sdd2`启用swap分区，`swapoff /dev/sdd2`关闭swap分区。  
`free -mh` 查看交换空间的总大小  
开机自动启用交换分区  
`vim /etc/fstab`  `/dev/sdb2 swap swap defaults 0 0` 开机自动挂载swap  
`swapon -a` 检查fstab，并挂载未挂载的swap分区。 

使用大文件作为swap
生成2G大文件 `dd if=/dev/zero of=/opt/swap.txt bs=1M count=2048`  (每次读写1M，2048次)  
```bash
mkswap /opt/swap.txt 
swapon /opt/swap.txt # 挂载swap文件

# /etc/fstab
/opt/swap.txt swap swap defaults 0 0
```


## 逻辑卷LVM
![](assets/Pasted%20image%2020230314214305.png)
卷组可以动态扩充，逻辑卷从卷组中创建，只能从对应卷组取出。

1. 选择物理卷制作卷组 `vgcreate systemvg /dev/sdb[1-2]` (制作名为systemvg的卷组，选择sdb1和sdb2两个空分区)  
2. 查看所有物理卷信息  `pvs`  
3. 查看系统卷组信息 `vgs`  
4. 建立逻辑卷 LV `lvcreate -L 16G -n vo systemvg` (从systemvg卷组中拿16G名为vo的逻辑卷)
5. 查看逻辑卷  `lvs`  
6. 使用逻辑卷(格式化)   
	1. `ls -l /dev/systemvg/vo` 实际上是`/dev/systemvg/lvredhat -> ../dm-2`软链接方便记忆，`/dev/mapper/234H` 也是指向这个逻辑卷
	2. `mkfs -t xfs /dev/systemvg/vo`  格式化为xfs
	3. blkid `/dev/systemvg/vo` 查看文件系统  
	4. 编辑fstab `/dev/systemvg/vo /mylv xfs defaults 0 0`
	5. `mount -a` 挂载
	6. df -h 查看设备
7. 逻辑卷的扩展
有的时候逻辑卷不够用了，就需要动态拓展，拓展要求卷组还有足够剩余空间，如果不够需要先扩容卷组。
	1. 扩展卷组 `vgextend systemvg /dev/sdb3 /dev/sdb[5-6]` 指定三个没有数据的分区作为物理卷扩充
	2. 扩展逻辑卷空间 `lvextend -L 25G /dev/systemvg/vo`  扩展至25G  
	3. 扩展逻辑卷的文件系统(刷新文件系统)  `xfs_growfs /dev/systemvg/vo`  

> 逻辑卷系统是ex3/ext4使用resize2fs，xfs用xfs_growfs 
> 逻辑卷支持缩减 xfs不支持缩减，ext4支持缩减(工作中基本不用缩减，因为数据 重要)  

卷组划分空间的单位PE，默认为4M，`vgdisplay systemvg`展示卷组详细信息，可以看到单个pe是4M，意味着分配10M空间，至少用12M（3个pe）空间，可以修改为`vgchange -s 1M systemvg`  1M，但是如果使用1M分配后改回去难。  

创建逻辑卷时使用PE个数创建 `lvcreat -l 108 -n lvhaha systemvg` 从systemvg卷组创建。

逻辑卷组的删除 ，删除前首先要先卸载逻辑卷。
`lvremove /dev/systemvg/vo` 并且删除 `/etc/fstab`中自动挂载项。

## 进程管理
查看进程树 `pstree`   
查看具体某个用户的进程 `pstree -p lisi`  
展示具体命令的参数 `pstree -pa lisi`  

展示正在运行的所有进程 `ps aux`   统计 `ps aux | wc -l`  
展示所有进程 `ps -elf` 可以看到父进程PPID  

动态查看进程  top
格式： `top [-d 刷新秒数] [-U 用户名]` 
主要是查看哪个占用cpu最高  
![](assets/Pasted%20image%2020230314150824.png)
4 users代表有几个用户（不看用户名，同名也算，图形界面也算一个） 
up 代表运行时间16分24秒，
loader aveage表示1分钟平均负载量，5分钟平均负载量，15分钟平均负载量    
Task表示总共259进程，  

大写P进行cpu排序  
大写M表示内存排序  

查找进程  
pgrep - process grep  
格式：pgrep [] 查询条件（模糊查询）
-I 同时输出进程名（默认只显示pid）
-U 检索指定用户  
-x 精确匹配  
`pgrep -lU lisi` 李四所有进程  
`pgrep -l a` 和a有关的  


### 控制进程 （进程调度）
bash的后台操作  
放入后台运行 `xeys &`  如果已经开启可以使用`ctrl+z`停止进程并放入后台
查看后台运行的进程 `jobs` 
恢复到前台  `fg 1`  写具体jobs中显示的编号  
在后台运行 `bg 1` 恢复xeyes的运行  
杀死后台进程 `kill $(jobs -p)`  带p表示展示进程号  

### 杀死进程
`ctrl +c` 中断当前  
`kill [-9] PID`  发送信号，带-9强制杀死（用在僵尸，停止进程必须要-9）
`kill [-9] %haha` 后台任务编号    
`killall [-9] 进程名字`  精准查询，所有相关  
`pkill [-9] 查找条件`  杀死前使用`pgrep`查看防止误杀  


## 网络配置
### 配置永久主机名
`hostnamectl set-hostname svr7.tedu.cn`  
echo svr7.tedu.cn > /etc/hostname 直接修改文件  

### 配置网卡名
因为centos6,7命令网卡的规则不同，有en33等，不太适合批量操作，需要全部同一网卡名，业界规则是`eth0,eth1,eth2`依次命名。  

强制使用`etho0,eth1`命名  
`vim /etc/default/grub`
内核那一行最后添加参数 `... quiet net.ifnames=0 biosdevname=0`表示不使用这些命名规则，默认使用`eth0,eth1`  
配置完生成内核文件 `grub2-mkconfig -o /boot/grub2/grub.cfg` 让规则生效   
重启才能生效，重新识别网卡名  

### 删除连接
使用nmcli工具管理，相当于修改配置文件`/etc/sysconfig/network-scripts/ifcfg-eth0`  
```bash
nmcli connection show # 展示
nmcli connection delete # 删除所有其他的连接
nmcli connection delete 有线连接\ 1

# nmcli必须要给网卡设置别名，才能设置，最好别名和网卡名一样。eth0就是eth0
nmcli connection add type ethernet ifname eth0 con-name eth0 # 第一个是网卡名，连接名是con-name

#设置ip地址
nmcli connection modify eth0 \
ipv4.method manual\ # 手动配置，可选 auto/manual
ipv4.addresses 192.168.4.7/24
ipv4.gateway 192.168.4.254
connection.autoconnect yes # 下次开机自动启用
# 编辑连接

# 下次改连接，直接改某个值
nmcli connection modify eth0 ipv4.addresses 192.168.4.7/24

# 激活连接
nmcli connection up eth0

# 激活 ifup eth0
# 挂掉 ifdown eth0
```

可以使用`nmtui`可视化配置  

### 配置dns服务器
`echo nameserver 8.8.8.8 > /etc/resolv.conf` 


## vmware通信
虚拟机与真机通信
![](assets/Pasted%20image%2020230314223104.png)


## 远程管理
linux平台需要有`openssh`的三个包  
ssh带用户名登录 `ssh root@192.168.1.10` 不写用户名默认以当前用户名为准   
`/root/.ssh/known_hosts` 登录会后有指纹记录  

文件传递
使用scp = ssh + cp  
格式： scp [-r] dir/file 用户名@192.168.1.2   
`scp -r /home root@192.168.1.2:/root` 传递自己的东西到指定服务器上  
`scp -r root@192.168.1.2:/root/some /temp` 下载到本地    


### 无密码登录
利用非对称加密，本地保存私钥（相当于钥匙），私钥能证明你的身份，因为是私密的，公钥存放在服务器中（相当于锁），放在authorized_keys(别的机器传递过来的公钥）中，authorized_keys文件中可以存放多个公钥，供不同主机连接到该服务器，私钥解锁公钥，是单向的，本地去登录服务器，服务器不能登录本机。  
```bash
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDTCi1Ri3my9OtcDb54pHmvmLHEDBvBj7KJlIZLYg2RKW7n87C8zW+R6wAudgZPKKkxc+UEdYfP+jUDtuROuKHC+Py7K6M0vxsQ5AZcmZSHXhQmZGepRmS6uNAiPe7d/DbFnKNrrrJrq53sN81KsYpRJMnE/FlsSrgWr9RYdiZ6O7JCdNsmFmkug3z3+C3RHpew3dah0kNY5MbIwejk0Pvwub4IF5WIhav8DBZIs2b98QPOVctTRcreo8hwlaIVHGaY1jWruj2YVqcKSC+M3gJmdiWYy1ZuBKLiNHTxpTDYlJzrLMA5OxKCQrGJFftr1xcqYULV/36tLVxHqeSMZ7eX root@svr7.tedu.cn
```

本地生成一堆公钥和私钥对，上传公钥到服务器。  
`ssh-keygen`  在`~/.ssh/id_rsa` 是私钥，`~/.ssh/id_rsa.pub` 是公钥。  
使用`ssh-copy-id root@192.168.4.207`传递公钥，如果在windows上手动吧公钥的内容附加到`~/.ssh/authorized_keys`中。  

定义多个alias快速登录  
```bash
# 在~/.bashrc中设置永久别名 
alias goweb='ssh root@192.168.4.207'
alias gomail='ssh root@192.168.4.207'
alias godns='ssh root@192.168.4.207'
```

`ip address show` 输出ip地址 快捷写法 `ip a s`    
`ip address add 192.168.10.1/24 dev eth0` 添加临时ip地址  
`ip address delete 192.168.10.1/24 dev eth0` 删除临时ip地址  

`ping -c 3 192.168.4.7`  只ping3个包  


## 用户登录分析
`users，who,w` 显示已经登录的用户，w最详细,who用的最多  
`pts/0` 代表第几个终端  ，`:0`代表图形登录  
`last -2` 最后登录成功的两个 
`lastb` （bad）登录失败的用户  

## 日志
### 日志级别
Linux内核定义事件的紧急程度 ，分为0~7共8种优先级别  
数值越小，越紧急  

### selinux
selinux由美国国家安全局开发，内置在linux中。  
![](assets/Pasted%20image%2020230315130440.png)
SELinux的运行模式
1. enforcing（强制）
2. permissive（宽松）
3. disabled（彻底禁用）  
任何模式变成disabled模式，都要经历重启系统  
切换运行模式  
1. 临时切换：setenforce  1或0 (1代表强制，0代表宽松)
2. 固定配置：/etc/selinux/config 文件
3. 获取当前模式 `getenforce `
4. 永久切换 `vim  /etc/selinux/config` 修改 `SELINUX=permissive` 或者 `SELINUX=disabled` 或者`SELINUX=enforcing`  

### 遗忘root密码
进入救援模式  
1. 在引导菜单按e键  ![](assets/Pasted%20image%2020230315153220.png)
2. 找到16行,修改ro为rw, 最后空格加上rd.break![](assets/Pasted%20image%2020230315153236.png)



### 防火墙
默认安装了http服务，防火墙开启，只能本机访问，需要开启80端口。  
`curl 192.168.4.7` 测试网址（默认使用http协议）  



ftp服务 `yum -y install vsftpd`  默认是 `/var/ftp`目录  
`curl ftp://192.168.4.7`  

作用：隔离，严格过滤入站，放行出站  
系统服务：firewalld  
管理工具： firewall-cmd, firewall-config  

防火墙预设保护集  
1. public 仅允许访问本机 ssh, dhcp, ping 服务
2. trusted 允许任何访问
3. block 拒绝任何来访请求，明确拒绝客户端
4. drop 丢弃任何来访的数据包，不给任何回应 (尽量不要用)

防火墙判断原则：
1. 查看客户端来源ip地址，查看命中的规则，如果符合，则进入该区域
2. 进入默认区域（默认是public）

防火墙修改  
`firewall-cmd --get-default-zone`  查看默认区域  
`firewall-cmd --set-default-zone=public` 修改默认区域为public  
`firewall-cmd --zone=public --add-service=http` 允许所有http协议  
`firewall-cmd --zone-public --list-all`  查看区域所有规则  
`firewall-cmd --zone=public --add-service=ftp`  
`firewall-cmd --zone=public --remove-service=ftp` 删除  
上述命令只是临时修改，但是会立即生效，如果要永久修改需要加上`--permanent` 相当于修改配置，但是需要`firewall-cmd reload`重新加载配置  
`firewall-cmd --permanent --zone=public --add-service=http`  
`firewall-cmd reload`  重新加载配置  

## 服务管理
一般的发行版都是使用systemd来管理服务，设置开机自启等。  
systemd是init程序，是内核引导完成后第一个启动的服务。  
配置目录： `/etc/systemd/system/`  
服务目录： `/lib/systemd/system` 
比如`/lib/systemd/system/httpd.service`  

### 服务的管理
1. `systemctl restart 服务名` 重启服务  
2. `systemctl enable 服务名`  设置开机自启
3. `systemctl is-enabled httpd` 查看httpd是否设置开机自启  
4. `systemctl disable httpd` 关闭httpd开机自启

### 服务的运行级别
RHEL6：运行级别 有7种 
1. init 0 代表关机
2. init 3 代表只运行基础模式 （企业常用）
3. init 5 代表图形模式 （需要图形界面时启用）
4. init 6 重启 0服务
RHEL7开始，模式只分为2种
`systemctl isolate multi-user.target` 相当于init 3  字符模式  
`systemctl isolate graphical.target` 相当于init 5  图形模式    
`systemctl get-default` 获取默认模式   
`systemctl set-default multi-user.target`  字符模式  


## web服务
httpd默认根目录在 `/var/www/html/`中  
主配置文件在`/etc/httpd/conf` ，一旦写错，服务会启动失败，使用`journalctl -xe`排查。  修改完配置要重启服务。  


默认配置：
1. Listen: 监听地址：端口(80)
2. ServerName: 本站点注册的dns名称 (空缺)
3. DocumentRoot: **网页文件根目录（/var/www/html）**
5. DirectoryIndex：起始页/首页文件名（index.html），不写资源名，只写文件名。

apache服务器(httpd)会基于网页文件目录，进行访问控制。   
如果文件夹配置了访问控制，就使用当前配置，否则会继承父目录的配置，如果父目录没有，向上查找。  比如根目录配置了`denyAll`，`/webroot`没有配置会继承父目录配置，所以不允许访问，http默认还配置了`/var/www`允许访问，所有在其他的文件都是允许访问的。  
```conf
<Directory "/webroot">
	Require all granted # 允许所有访问，基本两种配置允许或denyAll
</Directory>
```

在图形浏览器中`http://192.168.4.7/abc`会补全`/abc/`，但是curl中不会，curl要加`abc/`指定是文件夹，否则服务器会认为是文件名。  

定义多个端口，自定义端口尽量在1024外  `Listen 8080`    

### 虚拟web主机
通过虚拟web主机可以实现多个DocumentRoot，一台主机提供多个站点。  
区分方式：
1. 基于域名的虚拟主机（常用）
2. 基于端口的虚拟主机 （常用）
3. 基于ip地址的虚拟主机

配置文件路径：
1. 主配置文件 `/etc/httpd/conf/httpd.conf`
2. 调用配置文件 `/etc/httpd/conf.d/*.conf`

一旦使用虚拟主机，所有网站都要使用虚拟主机配置，原配置不生效，如果用ip访问，按照优先匹配，所以匹配的是www.qq.com。
```apacheconf
# /etc/httpd/conf.d/haha.conf
<VirtualHost *:80> # 在所有ip监听80
 ServerName www.qq.com # 网站域名
 DocumentRoot /var/www/qq # 网站根目录
</VirtualHost>
<VirtualHost *:80>
 ServerName www.lol.com
 DocumentRoot /var/www/lol
</VirtualHost>
```

通过端口号区分  
```apacheconf
<VirtualHost *:80>
 ServerName www.qq.com
 DocumentRoot /var/www/qq
</VirtualHost>
Listen 8080 # 端口Listen只能写一遍
<VirtualHost *:8080>
 ServerName www.qq.com
 DocumentRoot /var/www/lol
</VirtualHost>
```

### nfs服务
Network File System网络文件系统  
用途： 为客户端提供共享文件夹  
协议： NFS(2049)，rpc(111)  
所需软件包：nfs-util  
系统服务： nfs-server.service  


创建nfs:  
1. mkdir /public 创建共享目录
2. echo haha > /public.h.txt
3. vim /etc/exports 配置文件 （man exports查看帮助）
```bash
文件夹路径         客户端地址（权限）
/public          *(ro) #允许所有客户端只读，可选项rw
```
4. systemctl restart rpcbind 依赖rpc服务  涉及动态端口，nfs-server依赖此服务  
5. systemctl restart nfs-server 重新加载配置

## dns服务
bind服务（伯克利大学开发）的dns服务器
安装`yum install bind` 程序名为named  
配置文件：
1. /etc/named.conf 主配置文件  负责解析的域名
2. 地址库文件：/var/named/  # 完全合格的域名与ip地址对应关系

```bash
# /etc/named.conf
zone "tedu.cn" IN { # 定义解析的域名
	type master; # 设置是权威主DNS服务器
	file "tedu.cn.zone" # 地址库文件名称
}
```

检测格式是否正确 `named-checkconf /etc/named.conf`  

使用`cp -p named.localhost tedu.cn.zone` 保持和原文件一样权限，因为named服务默认使用name账号需要对文件有读取权限。  

```bash
# /var/named/tedu.cn.zone 命名保持和域名一致
。。。 前面保持一致

tedu.cn.   NS   svr7 # 声明dns服务器为svr7
svr7       A     192.168.4.7 # svr7解析结果是192.168.4.7
www        A      192.168.4.7 
*          A      7.7.7.7  # 泛域名，没有匹配到的，匹配这个
tedu.cn    A       6.6.6.6 # 解析tedu.cn 域名
mail      CNAME     www  # 是www的别名

# 批量化 $表示1-50的变量，生产 
# pc1 192.168.10.1
# pc2 192.168.10.2
$GENERATE 1-50 pc$ A 192.168.10.$
```
使用`named-checkzone tedu.cn /var/named/tedu.cn.zone` 测试语法  
验证 `nslookup www.tedu.cn`  


### 时间同步
在内网，所有服务器都保持相同时间，通过搭建标准时间服务器，企业内部服务器和时间服务器同步时间。  
NTP协议：  
用来同步网络中计算机时间的协议    
`rpm -q chrony`  查看软件是否安装  
`vim /etc/chrony.conf`  配置文件  
```bash
# /etc/chrony.conf
# server 0.centos.pool.ntp.org iburst    # iburst表示快速同步

allow all # 表示允许所有客户端连接
local stratum 10 # 设置本地服务端为第10层时间服务器

# 客户端设置
# server 0.centos.pool.ntp.rog iburst # 注销其他ntp服务器
server 192.168.4.7  iburst  #　客户端设置内网同步服务器
```
修改客户端时间 `date -s "2008-1-1"`  
重启本机时间服务   `systemctl restart chronyd`  查看时间 `date`  
列出时间服务器信息  `chronyc sources -v`  

### 自动挂载(autofs) todo 

### 电子邮件通信
1. 在dns中配置MX记录 
```bash
# /var/named/qq.com.zone
qq.com. MX   10 mail # 10表示优先级，越小越优先，可配置多条记录
mail   A  192.168.4.7  # 
www    A  192.168.4.15
```
测试qq.com区域邮件交换记录  `host -t MX qq.com`  
`host mail.qq.com` 查看ip地址  

2. 安装邮件服务器
`rpm -q postfix`  
修改配置  `/etc/postfix/main.cf`  
```bash
99行 myorigin = qq.com  # 默认补全的域名后缀
116 inet_interfaces  = all # 所有ip地址均提供邮件收发功能  
164 mydestination = qq.com  # 判断是否为本域邮件的依据
```

发邮件测试 简单命令 
格式：
`mail -s "test01" -r yg xln`  

### dhcp服务
安装dhcp服务器 `yum -y install dhcp`  
DISCOVERY -> OFFER -> REQUEST -> ACK  
一个局域网内有两台dhcp，先到先得，不要有两台dhcp服务器。  
租期：允许 客户机租用ip地址的时间，单位为秒
配置：`/etc/dhcp/dhcpd.conf`  
末行模式下 r: `/usr/share/doc/dhcp*/dhcpd.conf`  
```conf
subnet 192.168.4.0 netmask 255.255.255.0 {
  range 192.168.4.100 192.168.4.200;
  option domain-name-servers 192.168.4.7; # 分配的dns服务器
  option routers 192.168.4.254;  # 默认网关
  default-lease-time 600;
  max-lease-time 7200;
}   
```

### 网络装机
规模化：同时装配多台主机  
自动化：装系统、配置各种服务  
远程实现：不需要光盘、u盘等物理介质  

在网卡芯片中有PXE client，从网络启动时，会调用PXE client调入内存执行，获取PXE server配置、显示菜单，根据用户选择将远程引导程序下载到本机运行。  


## 源码编译安装
1. 使用rpm安装自定义性差，安装位置固定。
2. 源码包灵活度高，可以决定安装位置，软件功能按需定制
3. 获得软件的最新包

所有的解压后的源码都要放在`/usr/local/src`里面，安装程序位置指定为`/usr/local` ，命令可以创建软链到`/usr/local/bin`中。

安装过程：
1. 一定要cd到软件根目录
2. 安装开发工具gcc和make，释放源代码到指定目录  
3. 想用./configure 检查当前系统环境（linux,windows），检查所需依赖(gcc等有没有安装)，依赖全都满足后，根据makefile.in模板生成Makefile。
	1. .configure --help 查看帮助
	2. 大部分源码包都支持--prefix选项指定安装位置，基本都在`/usr/local`下
4. 运行 make && make install (make相当于运行默认target通常是第一条指令，编译软件)， install 将编译好的文件复制到安装目录


### 同步软件
#### rsync
简述：remote sync,进行同步数据，单向同步。
同步与复制的差异：
1. 复制：完全拷贝源到目标
2. 同步：增量拷贝，只传输变化过的数据

选项：
1. -n 测试同步过程，不做实际修改
2. --delete 删除目录文件夹内多余文件
3. -a 归档模式(保持原文件权限等)  -rlptgoD
4. -v 显示详细操作信息
5. 传输过程启用压缩、解压
`rsync -av /mydir /todir` 会把mydir本身放入到/todir里面
`rsync -av /mydir/ /todir` 同步mydir的内容到/todir里面，不会删除todir已有内容  
`rsync  -av  --delete   /mydir/   /todir/` 删除目标文件多余文件  
`rsync -nav --delete /mydir/ /todir/` 查看要删除的内容  

远程同步：
1. 下行 rsync [...] user@host:远程目录  本地目录   （远程下载到本地）
2. 上行 rsync [...] 本地目录   user@host:远程目录   （本地同步到远程）

#### inotify 实时同步  
inotify监控目录内容的变化，属性的变化。  
用法：
1. -m 持续监控（捕获事件不退出）
2. -r 递归监控
3. -q 减少屏幕输出

inotifywait负责监控，需要联动rsync进行同步。  


### 数据库
安装数据库 `yum -y install mariadb-server`  
进入mysql `mysql`  
`ctrl+l`清屏  
`exit`退出
mysql默认数据库文件在`/var/lib/mysql`中，
数据库管理员默认为root，记录在`user`表中，和linux系统管理员不同。
修改数据库root密码 `mysqladmin -u root password '123'` 修改为123（默认没有密码所以不用加-p）,修改旧密码 `mysqladmin -u root -p123 password '456'`  旧密码必须紧跟`-p`  


## 镜像
### podman
podman类似docker
`podman images` 查看所有镜像
`podman load -i /root/httpd.tar.gz`  导入镜像  

镜像的标识：
镜像名称+标签 = 唯一 （两者合并必须是唯一的）
`podman rmi ImageId` 删除镜像
`podman rmi localhost/myos:latest` 不写标签，默认就是latest  

