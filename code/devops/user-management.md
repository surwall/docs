# User Management

In modern systems, they all support multi user, in order to manage these users, desginers of systems introduce a role called super user, who can manage all users. In windows, they are called 'Administrator', in unix-like system, they are called 'root'.

## User and Group
We will look at how to check all the existing users, how to add one, and how to delete one.
Moreover, if we have numerous users to manage, we better split them into groups to better manage them. We have directly restrict or give permissions to a group, hence, all member in that group would have the same permission.

### Windows
1. User Management
In windows, there's some files with '.msc' ext, they are windows management files. Typically, we have some by default. Most frequently used is "compmgmt.msc". Type it in 'Win+R' or Windows Search Dialog, click 'user and group', to add and delete users.
So you might encounter a problem that your password is too short or easy. In that case, we can open "gpedit.msc", which is the group policy editor. Navigate to:
```bash
Computer Configuration > Policies > Windows Settings > Security Settings > Account Policies > Password Policy
```
Disable this functionality.

2. Group Management
In the same window you previously opened, we can add or delete a group. We have a bunch of existing groups, most notably, is the 'Administrator' and 'Remote Desktop Users'. For 'Administrator' Group, every member in it acts like a super user. Every member in 'Remote Desktop User' is allowed to connect Windows remotely. 

### Linux
1. User Management
In Linux, user info is stored in a file called "etc/passwd". It's a file with root permission, hence, only root can access it. This file looks like this:
```text
root:x:0:0:root:/root:/bin/zsh
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
bin:x:2:2:bin:/bin:/usr/sbin/nologin
sys:x:3:3:sys:/dev:/usr/sbin/nologin
sync:x:4:65534:sync:/bin:/bin/sync
games:x:5:60:games:/usr/games:/usr/sbin/nologin
man:x:6:12:man:/var/cache/man:/usr/sbin/nologin
lp:x:7:7:lp:/var/spool/lpd:/usr/sbin/nologin
mail:x:8:8:mail:/var/mail:/usr/sbin/nologin
news:x:9:9:news:/var/spool/news:/usr/sbin/nologin
uucp:x:10:10:uucp:/var/spool/uucp:/usr/sbin/nologin
proxy:x:13:13:proxy:/bin:/usr/sbin/nologin
www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin
backup:x:34:34:backup:/var/backups:/usr/sbin/nologin
list:x:38:38:Mailing List Manager:/var/list:/usr/sbin/nologin
irc:x:39:39:ircd:/run/ircd:/usr/sbin/nologin
_apt:x:42:65534::/nonexistent:/usr/sbin/nologin
nobody:x:65534:65534:nobody:/nonexistent:/usr/sbin/nologin
systemd-network:x:998:998:systemd Network Management:/:/usr/sbin/nologin
marcus:x:1000:1000:,,,:/home/marcus:/bin/zsh
messagebus:x:100:108::/nonexistent:/usr/sbin/nologin
```
The meaning of each column is:  
|username|placeholder|uid|gid|home dir|login shell|login shell|
|----|------|------|------|-----|-----|-----|
|root  |x     |0     |    0 |root |/root|/bin/zsh|
|marcus  |x     |1000 | 1000 |,,,|/home/marcus|/bin/zsh|

```bash
username/password placeholder/uid/gid/user description/home dir/login shell
```

You might wonder what is uid and gid. In short, system use uid(user id) to identify each user, and use gid(group id) to indentify each group. 
As for login shell, normally we would use bash or zsh, but for user that doesn't require login, we assign them with nologin shell for security reason. 
Note here that normal user's uid starts from 1000.

Put users aside, now we talk about the group. Each user must has a group. When you create a user without specify a group, it will automatically create a group with the same name. That is called "user private group". A user can belong to many groups(secondary group), but it can only have one primary group. The implication is that when a user creats a new file, its group column is set to their primary group not any secondary group.







