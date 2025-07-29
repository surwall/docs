## Install
* ubuntu
```bash
sudo apt-get install samba smbclient -y
```

## Configuration
The configuration file located at `/etc/samba/smb.conf`. 
It is best to set the following line:

```bash
[global]
netbios name = ubuntu
workgroup = WORKGROUP
security = user
```

netbios name will be our hostname. The final smb url is something like `/netbios-name/share-name`. Default netbios name is sambaserver.

### Create a Share Folder
```ini
[tmp]
    comment = tmp folder
    path = /tmp
    browseable = yes 
    read only = no
    guest ok = no
    security = user # optional
```

In this case, we create a share called "share". We set the path of to our home folder.

## Users

Since Samba has its own password hash, you need to create your own smb password.

1. add the existing Linux user into smb
   ```bash
   sudo smbpasswd -a marcus
   ```

2. change the password

   ```bash
   sudo smbpasswd # current user
   sudo smbpasswd marcus # for a existing smb user
   ```

> [!note]
>
> Make sure you create a local Linux user first. After that, we can use `testparm` to test smb syntax. 
> We use `sudo systemctl restart {s,n}mb` to restart server

## Permission

Note that Smb respect linux permission, so ensure that you give appropriate permission for that user.

## Mount Smb

```bash
sudo mount -t cifs -o username=smb-user //hostname/share /mnt/smb
```

### Make the Server Discoverable
For Linux and Macos, install avahi package.
>[!note]
>make sure the zeroconf package is installed on Linux. If so, we can access that server by `hostname.local`.

For Windows 10 and later, install [wsdd](https://github.com/christgau/wsdd) package. 
>[!note]
>With Windows 10 version 1511, support for SMBv1 and thus NetBIOS device discovery was disabled by default. 

## Debug
`smbstatus` can show samba status.
`smbclient -L //sambaserver` show all shares on a server called sambaserver
