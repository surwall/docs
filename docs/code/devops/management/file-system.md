# File System
  There are many file systems in the market. But they are closely related to operating system. For example, os has different permissions that only certain file system can support it. That is, NTFS is designed for Windows, it completely support all permission concepts in Windows. As for Linux, it has many options: Ext4, XFS, BTRFS. Likewise, APFS is for Macos. Nevertheless, fat32 and exfat is designed to be cross platform. Despite this cool feature, they have a big drawback. They can't support any file permission.

## File permission
When a file is created, it will have some meta associated with it. Like, creator, modified time. You can control which user has permission to access this file.

### NTFS(Windows)
You choose a file or a directory, open its property, in order to change its permission, you have to disable permission inheritance.
![windows permission](https://oss.xuchaoyin.com/docs/202311272300031.png)


### Linux
In Linux, we use `ls -l` to list files with metadata. 
The output is like this:  

```bash
total 4
drwxr-xr-x 2 marcus marcus 4096 Jul 26 14:17 bash-test
```

| file permission | Number of hard links | owner  | group  | File Size (in bytes) | Modification Time |
| --------------- | -------------------- | ------ | ------ | -------------------- | ----------------- |
| drwxr-xr-x      | 2                    | marcus | marcus | 4096                 | Jul 26 14:17      |
|                 |                      |        |        |                      |                   |

The above table only says briefly about file permission. The file permission can divide into 4 parts:  

| file type | owner's permissions | group's permissions | others' (everyone else) permissions |
| --------- | ------------------- | ------------------- | ----------------------------------- |
| d         | rwx                 | r-x                 | r-x                                 |

The file type can be `-`(Regular file), `d`(Directory), `l`(Symbolic Link), `c` (character device file), `b`(block device file), `s` (socket file), and `p`(named pipe). 

The permission segment means r(read), w(write), e(execute), respectively. If it's a slash, it means it doesn't have that permission. You definitely see this command constantly,`chmod 755`, what does mean? It means give owner 7,  give group 5, give others 5. In short, so the total permission is accumulated by r(4), w(2), and x(1). In this example, owner has full control over this file, that is, he has `rwx`, as for group and others, they have 4+1, which means `r-x`.  

The following commands are some common usage:  

* `chmod 777 /home/public` give full access to every one
* `chmod 6000` set setuid bit bit and setgid bit.
* `chmod o+t /home/public` add sticky bit only to others
* `chmod go-x /bin/sh` remove execute from group and others

Additionally, we have three special permission: sticky bit(1), setuid(4), setgid(2).

TODO

That is enough for most cases, however, if we want to have a fine-grained control, this is where Access Control Lists(ACLs) comes into play.  

