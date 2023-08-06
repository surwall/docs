# Clean Windows

As an old Windows user who has experienced Windows XP, Windows 7, Windows 10, and Windows 11, I've observed a recurring issue. Over time, as you install numerous applications, your system tends to slow down when compared to its performance right after a fresh installation. The primary reason behind this slowdown is that a significant portion of the applications you install are not pure or lightweight.

Many applications tend to add daemon services, auto-start behaviors, and schedules to run in the background. These additional processes accumulate over time, leading to noticeable system lag. The more of these resource-intensive background tasks and services are running simultaneously, the more strain they put on the system resources, resulting in a degradation of overall performance.

To maintain a smoother and faster system, it's crucial to be mindful of the applications you install and regularly review and optimize the startup processes and background services. By keeping unnecessary background tasks to a minimum and opting for lightweight or portable applications when possible, you can mitigate the impact on system performance and enjoy a more efficient computing experience.



## Using Portable Apps

One approach to address this issue is by seeking out portable versions of the software. Using portable versions ensures that no additional components will slow down your system. However, it's not always possible to find a corresponding portable version for every application. In such cases, you can visit [portableapps.com](https://portableapps.com/) to download various portable apps.

The developers of these portable apps employ techniques like creating a portable executable that passes a dynamic `%AppData%` environment variable to the target programs. This means that the data typically saved in the home directory (which is the default location for `%AppData%`) is now stored in a custom directory. The website also offers instructions on how to create your own portable version if you're interested in trying it out yourself (I'll give it a shot when I have the time 😁).



## Using VHD(X) Native Boot

Regarding proprietary programs like Office, VMWare Workstation, and others, it's worth noting that making them portable might not be possible or recommended. In order to avoid these applications from slowing down your system over time, it's advisable to reinstall your operating system after a certain period. To expedite this process, you can take advantage of a feature known as native boot in VHD(x). This feature can help streamline the reinstallation process and improve system performance.

From my perspective, the only limitation of using VHD(x) as a normal system is its inability to add hyper-v or any related virtual features. However, VMWare works perfectly fine. Personally, I wouldn't consider using hyper-v or WSL2 again due to the hassle and complexity involved. Why not opt for using virtual machines directly, which is a common practice across various platforms like MacOS, Linux, and even ESXI?

One crucial lesson I've learned in recent years is to avoid using exclusive features or methods. While they might provide some accessibility initially, they can lead to more problems down the line. For example, I used a note-taking app called "Notability," which allowed adding notes to PDFs but stored them in its own format. Initially, it seemed fine, but as I imported larger PDF files, it became cumbersome to work with, and I couldn't easily switch because of important notes. Eventually, I struggled to export the notes back to PDF format. That experience made me realize the value of using standard formats like PDF, despite some limitations. PDF has been stable and can be opened using any PDF app on any platform.

In the case of WSL2 or hyper-v, they are just virtual technologies, and it's essential to understand the fundamentals by using older and more stable technologies like VMWARE or KVM. I've learned not to blindly trust Microsoft's so-called new technologies. On another note, there's the REFS file system, Microsoft's new file system, which is said to be more efficient and reliable than NTFS. However, this also means that there won't be further active development on NTFS, making NTFS even more stable. For me, the key factor is not speed but compatibility.

I've written another post about this topic, which you can check out. [TODO].

These links describe thoroughly about native boot in VHD(x):

*  [what is VHDX with Native Boot](https://learn.microsoft.com/en-us/windows-hardware/manufacture/desktop/deploy-windows-on-a-vhd--native-boot?view=windows-11)
* [Boot to a virtual hard disk: Add a VHDX or VHD to the boot menu](https://learn.microsoft.com/en-us/windows-hardware/manufacture/desktop/boot-to-vhd--native-boot--add-a-virtual-hard-disk-to-the-boot-menu?view=windows-11).



## Using Partitions

Using a single partition on macOS may be fine, but when it comes to Windows, it's advisable not to store all your data in the system partition. This precaution is essential in case you ever need to reinstall or restore the system. Having a separate partition is a good practice not only for Windows but also for Linux. It allows you to install different operating systems without the risk of corrupting your personal data, as it remains stored in its dedicated partition. That's the key benefit.

If you're tempted to relocate your desktop or document folder from the C drive to the D drive, there's no need to take that step. Instead, you can simply use soft links to link those special folders to directories on the D drive. The process is theoretically feasible, and I'm planning to give it a try in the near future.



## Additional Links
[uefi setup](./uefi-setup.md)
TODO