# vim reminder

## uppercase, lowercase

gUaw - make the current word uppercase

gUU - make the entire line uppercase

gUgU - make the entire line uppercase

gUap - make the entire paragraph uppercase

## quick navigation

using % to jump between parenthesis

## 光标快速跳转
光标跳转到指定行 `1G` `3G` 跳转到第一行 ，第三行 `gg`跳转首行， `G` 跳转末行

`2yy`复制从当前行往下两行，包括当前行
`3dd` 删除从当前行往下两行，包括当前行
`x或者delete`删除光标处的单个字符
`d^`从光标处之前删除至行首，exclusive
`d$或者D`从光标处开始删除到行尾, inclusive
`p、P`粘贴到光标之后、之前
`u,U`撤销最近的一次操作，撤销对当前行的所有修改
`ZZ`保存修改并退出
`:r /etc/filesystems` 复制文件内容到当行光标处下面
`:s/root/new` 替换光标所在行第一个root为new
`:s/root/new/g` 替换光标所在行所有root
`:1,10s/root/new/g` 替换1-10行所有root
`:%s/root/new/g` 替换文件内所有root

编辑器设置
`:set nu或者nonu` 显示或者不显示行号
`:set ai或者noai` 启动自动缩进，关闭自动缩进

`:x或者:wq` 保存已有修改退出
`:w /root/newfile` 另存为其他文件





