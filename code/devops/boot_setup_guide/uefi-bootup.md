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
