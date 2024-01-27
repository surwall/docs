# Dual Boot Issues

## Windows Time inconsistent with Linux

Both Windows and Linux reads RTC time(Real Time Clock), which is a hardware component in a computer that keeps track of the current date and time even when the computer is powered off. Windows and Linux interpret the RTC time in different ways. RTC time stores as a timestamp, linux interprets it as UTC time by default, however, Windows interprets it as local time. To resolve this issue, you have to change either of them. 

For Linux distros based on `systemd`, you can use `timedatectl set-local-rtc 1 --adjust-system-clock`, which will treat the hardware clock as local time.

For Windows, open the registry editor, navigate to the registry key, `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\TimeZoneInformation`, create a DWORD value, name the new value `RealTimeIsUniversal`, modify the value to `1`, and restart your computer to apply the changes.



## Mount NTFS drive

Linux can only autoamount the drives it's has mount points during installation. You can automount a drive by edit `/etc/fstab`.

In this file, it looks like this:  

```txt
# <file system> <mount point>   <type>  <options>       <dump>  <pass>
# / was on /dev/nvme0n1p1 during installation
UUID=83467304-8a1a-4648-bc08-55c146a40c99 /               ext4    errors=remount-ro 0       1
# /boot/efi was on /dev/nvme1n1p2 during installation
UUID=9C83-8340  /boot/efi       vfat    umask=0077      0       1
/swapfile                                 none            swap    sw              0       0

# nvme1n1p5 ntfs         data  40B0ADE3B0ADE020
UUID=40B0ADE3B0ADE020 /media/data ntfs-3g defaults 0 0
```

You can see that to auto mount a partition, you need the following information: uuid, mount point, file system, options, dump, pass. To check which partition you wanna mount, you can use `lsblk`, after that you can use `lsblk -f` to get uuid, or use `blkid`.

After you edit this file, type `mount -a`, it will try mount all the devices listed in this file.

