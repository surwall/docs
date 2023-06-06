# mac环境配置

## PREREQUISITE

1. [Free] [Homebrew](https://formulae.brew.sh/)
1. [软件列表](https://github.com/jaywcjlove/awesome-mac/blob/master/README-zh.md)
1. [软件网站1](https://nmac.to/now/)
1. [软件网站2](https://cmacked.com/)
1. [软件网站3](https://www.macbed.com/)



## 软件列表

| 用途        | 安装                                              | 备注     |
| ----------- | ------------------------------------------------- | -------- |
| 截图        | `brew install --cask snipaste`                    |          |
| 卸载软件    | `brew install --cask appcleaner`                  |          |
| 看图        | `brew install --cask xnviewmp`                    |          |
| 输入法      | `brew install --cask baiduinput`                  |          |
| 视频播放器  | `brew install --cask vlc`                         | 额外设置 |
| PDF编辑阅读 | 百度网盘 PDF EXPERT                               |          |
| 邮件管理    | `brew install --cask readdle-spark` / [APP STORE] |          |
| NTFS读取    | `brew install --cask mounty`                      |          |
| 远程桌面    | `brew insta ll --cask microsoft-remote-desktop`   |          |
| 词典        | `brew install --cask eudic`                       | 导入词典 |
| BT下载      | `brew install --cask c0re100-qbittorrent`         |          |
| 游览器      | `brew install --cask google-chrome `              |          |
| 浏览器      | `brew install --cask firefox-esr`                 |          |
| 文件清理    | 百度网盘 cleanMyMac                               |          |
| 下载管理    | neat downloadManager                              |          |
| 视频剪辑    | [APP STORE] 剪映                                  |          |
| 百度网盘    | [APP STORE]百度网盘                               |          |
| 通讯聊天    | [APP STORE]微信                                   |          |
| todo        | [APP STORE]滴答清单                               |          |
| 终端        | `brew install --cask iterm2`                      |          |



## 额外设置

* vlc设置打开视频固定的默认窗口大小
  * settings -> show all -> interface -> macOsx -> uncheck resize interface to the native video size
  * playback-> check "quit after playback"
* 欧陆词典导入词库
  * 在HOME里创建data，在里面创建EU-DICT-LIB
  * 将词典文件放入语言放入
* Iterm2 设置默认shell和ssh handler
  * menu设置 make iterm2 default term
  * 打开preferences进入profiles设置url schemes -> ssh
* 