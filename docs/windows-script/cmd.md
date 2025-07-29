# cmd

## basic

```bat
:: change the dir
chdir 
:: change the dir
cd
:: clear the screen
cls
:: copy 
copy memo.doc letter.doc /a
:: print something
echo something
:: turn off the echo command feature
```

## move

* to return to the root directory

  ```cmd
  cd \
  ```

* To change the default directory on a drive that is different from the one you are on:

  ```bat
  cd /d D:\source
  ```

  

## Manipulate the files

### create

### delete

* deletes one or more files

  ```bat
  :: before using the wildcards to delete all the files, using the same wildcards to examine the files.
  dir *
  del *
  ```

* delete all read-only files in the current directory

  ```bat
  del /a:r *.*
  ```

* delete recursively (subdirectories) with quiet mode 

  ```bat
  del /s/q *
  ```

* remove the directory recursively

  ```powershell
  rmdir /s/q test
  ```

* 

### create

* create a directory or subdirectory

  ```powershell
  md Taxes\Property\Current
  ```

* create a symbolic link 

  ```powershell
  mklink /d portal D:\source
  :: delete the link
  rd portal
  ```

### change

* To move all files with the .xls extension from the *\Data* directory to the *\Second_Q\Reports* directory, type:

```powershell
move \data\*.xls \second_q\reports\
```

* rename the file or directory

```powershell
rename chap10 part10
```

### view

see the content of the file

```bat
type holiday.mar | more
```

### search

Displays the location of files that match the given search pattern.

```bat
where /r C:\ test
```





## time

* display or sets the system date ```date 2021/03/05```
* 

## comments

```bat
::Remarks
Rem Remarks
```

## utils

### code page

```bat
:: united states
chcp 437
:: chinese
chcp 936
```

### clipboard

```bat
dir | clip
:: copy the content of the file to the clipboard
clip < readme.txt
```

## Attributes

* To set the compression state of the current directory, its subdirectories, and existing files, type:  ```compact /c /s```
* 

## Misc

### cmd

```bat
:: 	Carries out the command specified by string and then stops.
cmd /c dir
```

### background

```bat
:: To change the Command Prompt window background color to gray and the foreground color to red, type:
color 84
```

### disk related

detail

diskpart

### computer

* ```host```
* 

## network

### ```ipconfig```

* To flush the DNS resolver cache when troubleshooting DNS name resolution problems

  ```powershell
  ipconfig /flushdns
  ```

  ```powershell
  ipconfig /displaydns
  ```

### ```netstat```

### ```nslookup```



---

## system related

### ```taskkill```

```powershell
taskkill /pid 1230 /pid 1241 /pid 1253
taskkill /f /fi "PID ge 1000" /im notepad.exe
```

### see the system version

```bat
ver
```





# cmd and powershell usage

## set variable设置变量

#### cmd

```powershell
set NODE_DISABLE_COLORS=1
set NODE_DISABLE_COLORS #　删除变量
set #展示所有变量
set NODE_DISABLE_COLORS # 展示当前变量
```

#### powershell

```powershell
$NODE_DISABLE_COLORS=1 # 设置变量
remove-variable NODE_DISABLE_COLORS # 移出变量
remove-variable -name $NODE_DISABLE_COLORS
get-variable #展示所有变量
get-variable NODE_DISABLE_COLORS # 展示当前变量
```

#### bash

```bash
env # 获取所有环境变量
env | grep #　查找相关变量
export VAR="my value" # 导出环境变量
set # 获取shell变量
xcy='xuchaoyin' # shell变量
printenv VAR # 获取当前变量

```

## soft link 设置软链接

#### cmd

```powershell
mklink [/d] [/h] [/j] link target
mklink /d # 文件夹链接
mklink /h # 硬链接
mklink /j # junction
```

#### powershell

```powershell
New-Item -ItemType SymbolicLink -Path .\link -Target .\Notice.txt
```

#### bash

```bash
ln -s target link # 创建软链接，默认硬链接
```





