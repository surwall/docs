# UEFI Bootup

Before we are getting into UEFI stuff. We first state about the typical procedure to boot up a operating system.

![](https://oss.xuchaoyin.com/docs/grub%20bootloader.svg)

You can see there are several bootloaders to boot up our system. Because our operating system resides in hard drives. Our first stage boot loaders can recognize the file system of the disk where the system resides. Then it passes control to second stage boot loaders to let it handle the rest of the things, like initializing RAM system. 

In the era of BIOS, our boot loader has to resides in Master Boot Record (MBR). Due to the size limitations, boot loaders has to fit into this 512-byte MBR space, however, for feature-rich boot loaders, that's definitely not enough, to address this limitation, various strategies have been employed:

* Chain loading: A smaller boot loader that fits within the MBR can be used to load a larger second-stage bootloader from another location in the disk, allowing for more advanced functionality and flexibility. This overcomes the limitation of putting all bootloaders code in the 512-byte MBR space.
* Stage 1.5 Bootloader: Some bootloaders, like GRUB, use an intermediate "stage 1.5" bootloaders that resides between MBR and the first partition. This Stage 1.5 code bridges the gap between the MBR and the more extensive Stage 2 bootloader, allowing for more complex configurations. 

In the era of UEFI, things has changed. UEFI requires a FAT32-formatted partition to boot up. This partition is called "The EFI System Partition (ESP)". It contains UEFI bootloaders, configuration files, and boot-related data. With the advent of modern UEFI booting, without MBR size limitation, reducing the necessity for an stage 1.5 bootloader. First stage now has a different role, it acts as a boot manager for multi-booting. separation concerns between different stages of the bootloader, including the first-stage and second-stage bootloaders, continues to provide several benefits. For example, if you ever need to upgrade second-stage bootloaders, you can do so without affecting the first-stage bootloader. 



## UEFI boot process

As for UEFI, when we boot up our machines, UEFI firmwares follows up the boot order, because it knows nothing about your disk, it will follow a standard path: `/EFI/BOOT/bootx64.efi`. This path is commonly used for the default UEFI bootloader for 64-bit systems. This file serves as an entry point for the UEFI boot process. When the UEFI firmware starts, it will search for boot entries and, if none are found, it will often try to boot from the default `bootx64.efi` file in the `/EFI/BOOT` directory. This is often used for removable media or when no specific boot entry is set. This default bootloader actually acts as a shim, to call another bootloader located at the same partition, like `/EFI/Microsoft/boot/bootmgfw.efi` or `/EFI/ubuntu/grubx64.efi`. 

When an operating system is successfully booted using a bootloader (e.g., `/EFI/ubuntu/grubx64.efi`), the bootloader or the operating system itself can create a boot entry in the UEFI firmware's Non-Volatile Random Access Memory (NVRAM). This boot entry includes information about the bootloader's location and other relevant details.

By storing boot entries in the UEFI NVRAM, the firmware can streamline the boot process and directly load the desired operating system or bootloader, enhancing the efficiency and user experience of the system startup.



### Side Note

The boot process on mobile resembles that of PCs. You have heard that mobile manufactures provide options for customers to unlock BL(boot loader). The pre-installed bootloader can only boot their approved ROM, so in that case, you can't boot other ROM. In order to do that, we have to unlock BL, replace existing boot loader with more open one, namely, TWRP. This alternative bootloader empowers installing tailored ROMs, customizing OS experiences. Notably, dual-boot setups become feasible, accommodating diverse OS coexistence.

## Bootloader Rescue

We know that bootloaders are located at ESP partition, what if we accidentally remove some core files that our system can't boot up. We need to fix that. This really depends on what bootloader your are using, GRUB or Windows Boot Manager. 

Imagine a typical dual-boot situation like this:

![](https://oss.xuchaoyin.com/docs/%E5%BC%95%E5%AF%BC%E4%BF%AE%E5%A4%8D%E8%AF%B4%E6%98%8E.svg)

You normally set grub the first bootloader in the boot list. If you wanna completely remove ubuntu, you not only need to remmove the ubuntu partition, but also remove boot loader code in ESP partition. In this case, we need to remove that `/EFI/ubuntu` folder. That default boot loader `/EFI/boot/bootx64.efi` is a shim that points to the bootloader inside ubuntu folder. So we also need to remove that completely, and let Windows regenerate default bootloader for us. 



## Fix Windows Boot Loader

How to do that? Open your powershell or CMD, type `bcdboot C:\Windows`, this will not only generate default bootloader, but if you miss any thing in `/EFI/Microsoft`, it will also fix that for you. If your C:\Windows Partition and ESP partition are not on the same disk, you need to tweak this command a little. For example, you first mount this esp partition to letter G(choose whatever letter you like) `, open you CMD:

* type `diskpart` to start the DiskPart Utility
* List all the disks `list disk`
* Select the disk where the ESP is located: `select disk N`
* List the partitions on the selected disk `select partition 1`
* Assign a letter (for example, "G") `assign letter=G`

Run `bcdboot C:\Windows /s G:`  /s specifies the target location where the bootloader files should be created. In this case, it's the ESP mounted as letter `G:`. 


## Fix Linux Boot loader

As for linux, if we accidentally delete bootloader in Linux. We need to regenerate that. We use command

```bash
sudo grub-install
sudo update-grub
```

This will regenerate bootloader at ESP and regenerate grub config file. 

There's a extreme case that your ubuntu won't even boot up, in that case, we need to prepare a USB stick that contains ubuntu iso. 

1. Find your machine’s root partition:

```bash
sudo fdisk -l | grep "Linux filesystem$"
```

![](https://oss.xuchaoyin.com/docs/find-root-partition-ubuntu.webp)

2. mount linux root partition

```bash
sudo mount /dev/sda1 /mnt
```

3. mount esp partition inside that root path

```bash
sudo mount /dev/sdb1 /mnt/boot/efi
```

4. install grub by specifying these two places

```bash
sudo grub-install --efi-directory=/mnt/boot/efi /dev/sda1 # the last argument is the root partition
```



## Edit Boot Entries on Grub

use `efibootmgr` to see boot orders

```bash
sudo efibootmgr
```

![](https://oss.xuchaoyin.com/docs/Selection_002.png)

To change the order you can

```bash
sudo efibootmgr -o 0,1,4,9
```

Note that it may not work due some UEFI firmware aren't standard.



We're back to Grub. There are two kinds of grub config: **GRUB Menus**, **GRUB Default Behavior**. They located at `/etc/grub.d` and `/etc/defautl/grub`, respectively. 

Right now, we're interested in modifying the grub menus, there are several files inside that `/etc/grub.d`. 

![](https://oss.xuchaoyin.com/docs/Selection_003.png)

When we use `update-grub` to update our configs, it will compile those scattered files into a big grub config. You might notice that they all follow the same convention that their name start with a number. That number determines the order when they are compiled. So you always see the linux menu entry first, then any other custom ones. Because we would edit that `40_custom` file, 40 is way behind that `10_linux_zf`. So you might create a new file called `01_my_menu`, in that way, our custom menu can show up at first. 

Let us edit that `40_custom` file, in that file, it looks like this:

```bash
#!/bin/sh
exec tail -n +3 $0
# This file provides an easy way to add custom menu entries.  Simply type the
# menu entries you want to add after this comment.  Be careful not to change
# the 'exec tail' line above.

```

If you wanna append a custom windows entry, you don't need to manually write it. When we installed our  Linux system, it will run `30_os-prober`script(also any other files in this `/etc/grub.d/*`) to generate grub config. That script can auto detect Windows bootloader, and generate an menu entry for it. So we can check that by looking at the generated grub config at `/boot/grub/grub.cfg`. You will find a paragraph similar to this:

```bash
......

menuentry 'Windows Boot Manager (on /dev/nvme1n1p2)' --class windows --class os $menuentry_id_option 'osprober-efi-9C83-8340' {
        savedefault
        insmod part_gpt
        insmod fat
        search --no-floppy --fs-uuid --set=root 9C83-8340
        chainloader /EFI/Microsoft/Boot/bootmgfw.efi
}

....
```

We just need to grab that and paste into the bottom of`40_custom`, tweak a little if you like. Note that line `savedefault`, that line is important if we wanna GRUB remember our menu selection. 

Next, we edit the default behavior config `/etc/default/grub`, edit two lines if they doesn't exist, add it.

```bash
GRUB_DEFAULT=saved
GRUB_SAVEDEFAULT=true
```

The first line will ensure that it remembers our last selection, if your prefer a permanent selection, you can change that to 

```bash
GRUB_DEFAULT=0
GRUB_DEFAULT="My Windows"
```

These are two styles, first says that the 0 entry (which clearly means first entry) will be selected, the second says that the menu entry with name "My Windows" will be selected.

**That's it, don't forget to run `update-grub` after you modify grub config.** Reboot and Test it out.



## Edit Boot Entries on Windows Boot Manager

Windows Boot Manager are capable of booting multiple version of Windows, it reads its configuration file called BCD. To modify this file we using following command:

```powershell
bcdedit
```

[TODO]



## Customize Grub Look

[TODO]