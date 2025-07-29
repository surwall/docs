---
sidebar_position: 4
---

## Common Examples

Since most commands return a list of objects. It is not uncommon to filter objects matching certain criteria. To filter objects using `Where-Object` with simple tests. You can also use `-and` logical operator to combine tests.

```powershell
Get-CimInstance -Class Win32_SystemDriver |
    Where-Object {($_.State -eq 'Running') -and ($_.StartMode -eq 'Manual')} |
    Format-Table -Property Name,DisplayName
```

### File Move

```powershell
ls *day* | Move-Item -Destination D:\some-dir\ & # put it in the background
```

### File Bulk Operation

```powershell
# use where-object to filter
ls | ? { $_.Name -match 'libgen' } 
| Rename-Item -NewName {$_.Name -replace ' - libgen.li',''}
```

### Process Operation

```powershell
Get-Process | Where-Object {$_.Name -match 'qq'} | Stop-Process
# simple way
ps *tick* | kill # alias of stop-process
ps telegram | kill
```

### Find Process

```powershell
ps | ? {$_.path} | select id,name,path # filter only process have path
```

### Find Process with Certain Ports

```powershell
ps -id (Get-NetTCPConnection -LocalPort 80).OwningProcess
```

> [!warning]
>
> Note that normally an application spawns several processes, so kill the process occupying the port won't actually stop it. We'd better find the name, and kill all the processes associated with this name.

### Find Active Services

```powershell
Get-Service | Where-Object {$_.Status -eq "Running"}
```

### Sorting

We can organize displayed data to make it easier to scan using the `Sort-Object` cmdlet. `Sort-Object` takes the name of one or more properties to sort on, and returns data sorted by the values of those properties.

```powershell
Get-ChildItem |
    Sort-Object -Property LastWriteTime, Name |
    Format-Table -Property LastWriteTime, Name
```

Normally, the order is ascending, you can change that by specifying `-desending`.

### Set Environment Variables

```powershell
# environment variable can be "user" or "machine"
$curVal = [Environment]::GetEnvironmentVariable("Path", "user")
[Environment]::SetEnvironmentVariable('path', "C:\bin\;" + $curVal, "user")
```

> [!CAUTION]
>
>Don't forget to specify which environment variable, "user "or "machine". Always store the current path in case you lose it. Last but not the least, don't forget the semicolon ";" as the delimiter.

## Selecting Parts of Objects

You can use the `Select-Object` cmdlet to create new, custom PowerShell objects that contain properties selected from the objects you use to create them. This is very useful when you only wanna list few properties from the result.

```powershell
ls | select name
ls | select name,Extension

```

### Alias

Note that those common cmdlets like `where-object`, `sort-object` can be simplified using aliases. To view all available aliases using

```powershell
get-alias *object*
```

There list some common one:

| Alias | cmdlet         | description |
| ----- | -------------- | ----------- |
| ?     | Where-Object   | filter      |
| %     | ForEach-Object | iterate     |
| sort  | Sort-Object    | re-sort     |
| where | Where-Object   | filter      |

## Registry Trees
[Registry](Registry.md#Structure%20of%20Registry)
Display `HKEY_CURRENT_USER` registry hive

```powershell
Get-ChildItem -Path HKCU:\ | Select-Object Name
```

You can also specify this registry path by specifying the registry provider's name, followed by `::`. The registry provider's full name is `Microsoft.PowerShell.Core\Registry`, but this can be shortened to just `Registry`. Any of the following commands will list the contents directly under `HKCU:`.

```powershell
ls -Path Registry::HKEY_CURRENT_USER
ls -Path Microsoft.PowerShell.Core\Registry::HKEY_CURRENT_USER
ls -Path Registry::HKCU
ls -Path Microsoft.PowerShell.Core\Registry::HKCU
ls HKCU:
```

> [!tip]
>
> You can `cd` into a registry hive, by using path like `HKCU:`.

To view all values associated with a key:

```powershell
get-itemproperty $pwd # registry key path
# check a property value named 'propertyName' at current key
Get-ItemPropertyValue . -Name 'propertyName' 

# retrieve hex format of that value
Get-ItemPropertyValue . -Name ltk | od -A n -t x1 | sed 's/ *//g'
```

To clear the data of default value inside a key:

```bash
Clear-ItemProperty $pwd -Name "(default)"
```

To add or modify a value inside a key:

```powershell
New-ItemProperty -Path . -Name PowerShellPath -PropertyType String -Value $PSHome
Set-ItemProperty $PWD -Name 'test' -Value 2 -Type DWord
```

In this case, we set a new value named 'test', and its data type is DWORD.

To remove a value(entry) inside a key

```powershell
Remove-ItemProperty . -Name PSHome
```

To add and remove a key:

```powershell
New-Item -Path HKCU:\Software_DeleteMe
Remove-Item -Path HKCU:\Software_DeleteMe
# Removing all keys under a specific key but not that key
Remove-Item -Path HKCU:\CurrentVersion\* -Recurse
```

See More on [Working with registry keys](https://learn.microsoft.com/en-us/powershell/scripting/samples/working-with-registry-keys?view=powershell-7.4#listing-all-subkeys-of-a-registry-key) and [working with registry entries](https://learn.microsoft.com/en-us/powershell/scripting/samples/working-with-registry-entries?view=powershell-7.4)

## Create File Link
```powershell
New-Item -ItemType SymbolicLink -Target .\src.exe -Path .\link.exe
```
Target is the source file, path is the link name.
## Customization

## Job Control

```powershell
get-job
```

## Text Manipulation

### Reverse Lines

```powershell
$x = Get-Content -Path ./abc.txt
[array]::Reverse($x)
$x
```

## Hash
## Get Md5
```bash
Get-FileHash -Algorithm MD5 .\rk3399-sd-debian-bullseye-desktop-4.19-arm64-20230210.img.gz
```

## 命令行设置环境变量
```powershell
# 设置user的环境变量
# 除了user,可以是'machine',设置为本机环境变量，需要管理员。
[System.Environment]::SetEnvironmentVariable('GOPROXY', 'https://mirrors.cloud.tencent.com/go, direct', 'User')
```

> `powershell`使用`[]` 访问.net的类库

