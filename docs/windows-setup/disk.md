# disk

## convert gpt to mbr

```cmd
diskpart
```

```cmd
list disk // 列出当前所有的磁盘
```

```
select disk 0
clean
convert mbr
```

* 创建主分区 

  ```cmd
  create partition primary size = 40960
  ```

* 格式化分区

  ```cmd
  format fs=ntfs quick 
  ```

* 选择分区

  ```cmd
  select volume 3
  ```

* 给盘符

  ```cmd
  assign [{letter=<d> | mount=<path>}] [noerr]
  ```

  [ref](https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/assign)



​	

## remove

remove a drive letter or mount point from the volume

```power
remove letter=d
```



