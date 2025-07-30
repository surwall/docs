# docker
## 安装
### windows
### macos
### linux


## 配置镜像

![](assets/Pasted%20image%2020220918154152.png)

![](assets/Pasted%20image%2020220918154315.png)


## 安装镜像
```bash
docker run -d -p 80:80 nginx 
docker container run --detach --name nginx --publish 8080:80 nginx 
#  运行nginx镜像，没有从docker hub上先拉取镜像 --detach后台模式
# 开启一个新容器，左边的端口是本机端口，右边端口是容器端口 8080 -> 80
# 请求从8080导入到容器的80端口
[host:container]
docker container run -d --rm # 自动移除

docker container ls -a u# 当前所有的容器,包括没有运行的容器
docker container rm -f 63f 690 # 移出指定容器，强制移除正在运行容器
docker container ls 

# 停止容器
docker container stop mysql

# 查看日志
docker container logs mynginx

# 查看容器内部运行程序
docker container top mynginx

# 当前单元所有指令
docker container --help

# 终止所有
docker container stop $(docker container ps -qa)
```


## 镜像管理
```bash
docker image 

docker pull alpine # 拉取镜像

docker pull nginx:1.20.0 # 指定版本

# 查看docker layer层
docker image history nginx
# 架构，系统等
docker image inspect nginx

docker image rm 0922e

```

## docker run解释
```bash
docker container run -it nginx
docker container run [options] image command  
# 镜像是最后一个参数，后面根据镜像内部的命令
```

## 进入容器
```bash
# 开启容器的同时打开shell
docker container run -it nginx bash


# 打开容器并进入
docker container run -ai ubuntu 

# 进入已经运行的容器
docker container exec -it ubuntu bash
```

## 常用镜像
### mysql5.7
```bash
# 随机密码
docker container run --name mysql --detach --env MYSQL_RANDOM_ROOT_PASSWORD=yes --publish 3306:3306 mysql:5.7

# 固定密码
docker container run --name mysql --detach --env MYSQL_RAROOT_PASSWORD=root --publish 3306:3306 mysql:5.7 
```

### nginx
```bash


```

## alpine
alpine迷你镜像
```bash


```

## 网络
默认所有容器都在同一个虚拟网络中，可以互相通信。

```bash
docker port nginx
docker container port nginx

# 查看容器ip地址
docker container inspect --format '{{.NetworkSettings.IPAddress }}' nginx

# 所有网络
docker network ls

# 查看网络
docker network inspect bridge

# 创建网络
docker network create my_net

# 连接指定网络
docker network connect bridge nginx

# 断开连接
docker network disconnect bridge my_new_nginx
```

容器之间通信不用ip地址，通过docker内置的dns，
新创建的网络，开启了dns，可以指定容器的名字来通信，默认的网络需要创建时使用--link

```bash
docker container exec -it my_nginx ping new_nginx
```


## dockerfile构建
```dockerfile
# Dockerfile
FROM python
# 每一行的RUN命令都会产生一层image layer, 导致镜像的臃肿。其他不会
RUN cd $HOME \
  && mkdir run
  && cd run
ADD hello.py .
CMD ["python3", "./hello.py"] # cmd表示只会在容器创建时运行
```

```Dockerfile
# 比如把本地的 hello.py 复制到 /app 目录下。 /app这个folder不存在，则会自动创建
COPY hello.py /app/hello.py 

# `ADD` 比 COPY高级一点的地方就是，如果复制的是一个gzip等压缩文件时，ADD会帮助我们自动去解压缩文件。
ADD hello.tar.gz /app/

ENV VERSION=2.0.1
ARG VERSION=2.0.1

wget https://xxx/releases/${VERSION}

# argv构建中使用,修改变量值
docker image build -f .\Dockerfile-arg -t ipinfo-arg-2.0.0 --build-arg VERSION=2.0.0 .

# CMD
-   容器启动时默认执行的命令
-   如果docker container run启动容器时指定了其它命令，则CMD命令会被忽略
-   如果定义了多个CMD，只有最后一个会被执行。
```

## 构建
```bash
docker build -t hello:1.0 . # 指定镜像名:[TAG] dockerfile的位置

docker container commit 234 mynginx # 从容器创建镜像
```

## 上传docker hub
指定镜像名为  username/imagename的格式，
```bash
docker tag hello surwall/hello:1.0 # 命名

docker login

# push
docker image tag surwall/hello:1.0
```