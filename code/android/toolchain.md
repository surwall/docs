# 安卓介绍

安卓开发工程师分为几种：

1. 原生应用开发 使用kotlin语言
2. 跨平台开发（负责ios和安卓)
   1. 使用flutter或者react-native等框架，配合原生插件，（类原生），性能好
   2. 为uniapp或者cordova hybrid app开发原生插件，配合前端开发。
3. framework开发 (类似miui这种，修改安卓底层源码[aosp](http://www.baidu.com))

## 环境配置
安卓主要使用java和kotlin语言，这两种语言是jvm系语言，需要Java运行时支持，所以需要jdk。  

1. 安装jdk 配置环境变量

2. 安装android studio IDE

3. 在android studio里配置android sdk

4. 设置android studio
::: warning
windows控制台乱码问题  
需要在Help中的edit custom settings中加上一行  
`-Dfile.encoding=UTF-8`
:::

5. 配置安卓相关环境变量

```bash
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
```
