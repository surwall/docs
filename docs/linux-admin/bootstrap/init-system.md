---
sidebar_position: 2
---

# Init System

Init is the first process started during system boot. It is a daemon process that continues running until the system is shut down. Init is typically assigend process identifier 1. The init process then launches the init scripts (or rc) such as mounting file systems, starting daemon processes. It may also involves a **service manager** that supervises all launched processes. These components combine to the init system.  



## SystemV init

The oldest and once-popular init system is called SystemV init. It introduces the notion of run levels. That is, at least one run level is the operating state of the system. You can checkout your runlevel by `runlevel` or `who -r`.  

In general, there are 7 runlevels, out of which three runlevels are considered "standard" as they are essential to the system:

* 0 - Turn off
* 1 - Single user mode  (also known as S or s)
* 6 - Reboot

Aside from these standard ones, Unix and Unix-like systems treat runlevel somewhat differently. The `/etc/inittab` file defines what each configured runlevel does in a given system. On Linux distros defaulting to runlevel 5, runlevel 5 invokes a multiuser graphical environment running the X Window System. When user system is booting into a runlevel, it will execute all the scripts in the `/etc/rc.[1-6]`directory, which are symbolic links to `/etc/init.d`. In that `/etc/init.d` folder, there are multiple service scripts that you can run. This is a example of actual service scripts in that folder:  

```bash
[root@localhost init.d]# ls
abrt-ccpp         fcoe          kdump         NetworkManager  psacct       smartd
abrtd             firstboot     killall       nfs             quota_nld    spice-vdagentd
abrt-oops         functions     livesys       nfslock         rdisc        sshd
acpid             haldaemon     livesys-late  nfs-rdma        rdma         sssd
atd               halt          lldpad        nscd            restorecond  sysstat
auditd            hsqldb        lvm2-lvmetad  nslcd           rngd         udev-post
autofs            htcacheclean  lvm2-monitor  ntpd            rpcbind      vncserver
blk-availability  httpd         mdmonitor     ntpdate         rpcgssd      wdaemon
bluetooth         ip6tables     messagebus    oddjobd         rpcidmapd    winbind
certmonger        ipsec         multipathd    openct          rpcsvcgssd   wpa_supplicant
cpuspeed          iptables      mysqld        pcscd           rsyslog      ypbind
crond             irqbalance    netconsole    portreserve     sandbox
cups              iscsi         netfs         postfix         saslauthd
dnsmasq           iscsid        network       pppoe-server    single
```

Check the status of the service sshd:  

```bash
[root@localhost init.d]# service sshd status
openssh-daemon (pid  3032) is running...
```

You can try other scripts as well, you are fortunate to find that all scripts accept four common parameters: **start**, **stop**, **status**, **restart**. 

### Managing services

The **service** utility allows you to **start**, **stop**, **status**, **restart** the services from the `/etc/init.d` directory.

```bash
service service_name --status--all # show the status of all available services
service service_name status
service service_name start
service service_name stop
service service_name restart
```



### Enabling and Disabling services

In SystemV init, the information about which services are enabled or disabled at a specific runlevel is stored in the runlevel-specific directories like `/etc/rc.d/rc5.d/`, inside that folder, you can create symbolic link to the script in the `/etc/init.d` directory. Here is the example of the `/etc/rc.d/rc5.d`:  

```bash
[root@localhost rc5.d]# ls
K01smartd        K69rpcsvcgssd      K89rdisc         S11portreserve     S24rpcgssd           S80postfix
K02oddjobd       K73winbind         K90network       S12rsyslog         S25blk-availability  S82abrtd
K05wdaemon       K74ipsec           K92pppoe-server  S13cpuspeed        S25cups              S83abrt-ccpp
K10psacct        K74nscd            K95firstboot     S13irqbalance      S25netfs             S90crond
K10saslauthd     K75ntpdate         K99rngd          S13iscsi           S26acpid             S95atd
K15htcacheclean  K75quota_nld       S00livesys       S13rpcbind         S26haldaemon         S99certmonger
K15httpd         K76ypbind          S01sysstat       S15mdmonitor       S26udev-post         S99livesys-late
K35vncserver     K84wpa_supplicant  S02lvm2-monitor  S20lldpad          S27pcscd             S99local
K36mysqld        K87multipathd      S05rdma          S21fcoe            S28autofs
K50dnsmasq       K87restorecond     S07iscsid        S22messagebus      S50bluetooth
K50kdump         K88nslcd           S08ip6tables     S23NetworkManager  S55sshd
K60nfs           K88sssd            S08iptables      S24nfslock         S58ntpd
K61nfs-rdma      K89netconsole      S11auditd        S24openct          S70spice-vdagentd
```

You can see that some scripts have its name starts with a letter indicating whether the service should be started (`S` for start) or stopped (`K` for kill) followed by a number that defines the order in which the services are started or stopped.

#### Using the chkconfig Utility

The `chkconfig` utility is a command-line tool that enables you to quickly do that operation without manually tinder with the alias names. To display a list of system services (services from `/etc/init.d` directory), type:  

```bash
chkconfig --list
chkconfig
chkconfig --list sshd # display the current settings for the sshd service
```

* Enabling a Service

  ```bash
  chkconfig service_name on
  chkconfig httpd on
  ```

* Disabling a Service

  ```bash
  chkconfig service_name off
  chkconfig httpd off
  ```

#### The ntsysv utility

The Text-GUI utility displays the list of available services along with their current status and a description by pressing `F1`. 



## Other Implementations

One of the major drawbacks of init is that it starts tasks serially, waiting for each to finish before moving on to the next. This will result in long delays during boot. Various efforts have been made to replace the traditional init daemons to address this and other design problems, including:

| Distro       | Init System                     |
| ------------ | ------------------------------- |
| Ubuntu       | SystemD(formerly Upstart)       |
| Debian       | SystemD(formerly SystemV)       |
| Arch Linux   | SystemD                         |
| OpenWrt      | procd(formerly busybox-init)    |
| Alpine Linux | OpenRC                          |
| Slackware    | SystemV                         |
| Gentoo       | OpenRC or SystemD (user choice) |
| Void Linux   | runit                           |



## OpenRC

OpenRC is the init system used in alpine. It is similar to SystemV Init. It also use `service` command, however, its canonical name, `rc-service`, is also used. 

### Manually Manipulating Services

The `rc-status` utility is a fast way to view the current state of your system's services. By default, it will list all the services that are currently running. You can list all the available runlevels by `rc-status -l`. To show a list of all the services, using `rc-status -s` or `rc-status --servicelist`. 

```bash
rc-status
rc-status -s # all services list
rc-status --manual # manually started services
```

```bash
localhost:~# rc-status -l
nonetwork
sysinit
boot
shutdown
default
```

You may be wondering what does those runlevels are, but what you really should care about is the `default` runlevel and `boot` runlevel. The only services you should add to the boot runlevel are those which deal with the mounting of filesystems, set the initial state of attached peripherals and logging. Other daemons should be added to the `default` runlevel.

* Manually start a service

  Let's make our discussion more concrete, we use `lighttpd` as the desired service. To manually start it, type:

  ```bash
  localhost:/# service lighttpd start
   * Starting lighttpd ...  
  ```

  Check the currently running service:

  ```bash
  Runlevel: default
   sshd                                                                                      [  started  ]
   crond                                                                                     [  started  ]
   chronyd                                                                                   [  started  ]
   acpid                                                                                     [  started  ]
  Dynamic Runlevel: hotplugged
  Dynamic Runlevel: needed/wanted
   sysfs                                                                                     [  started  ]
   fsck                                                                                      [  started  ]
   root                                                                                      [  started  ]
   localmount                                                                                [  started  ]
  Dynamic Runlevel: manual
   lighttpd                                                                                  [  started  ]
  ```

  You can see that `lighttpd` is added into the `manual` runlevel. You can check the status or stop this service:  

  ```bash
  rc-service lighttpd status
  rc-service lighttpd stop
  ```

### On-Boot Service Manipulation

Enabling a service means putting it in a runlevel, usually is `default` runlevel. Disabling a service involves removing it from one or more runlevels. This is all done using the `rc-update` utility. It may be used as such:

```bash
rc-update show -v # view the current services in any runlevel
rc-update add lighttpd default
rc-update add lighttpd # it will use the current runlevel, which normally is default runlevel
rc-update delete lighttpd
rc-update delete lighttpd -a # remove from all runlevels
```





## OpenWrt

OpenWrt uses **procd** as its default init system.  

| Command                      | Equivalent                       | Description                               |
| ---------------------------- | -------------------------------- | ----------------------------------------- |
| `service`                    | `ls /etc/init.d`                 | print a list of available services        |
| `service <service>`          | `/etc/init.d/<service>`          | print available actions for a service     |
| `service <service> <action>` | `/etc/init.d/<service> <action>` | execute that action on a specific service |

Common actions supported by most services:  

* start
* stop
* restart
* reload
* enable
* disable
* enabled
* running



## Systemd

Systemd is a pervasive init system. It is designed to be backwards compatible with Sys V init scripts, and provides dependency-based service control logic. It replaced the old Sys V in most distros. 

#### Difference between Systemd and Sys V Init

* Systemd has only limited support for runlevels. It provides a number of target units to facilitate the activation or deactivation of specific sets of services, to allow us to manage a group of services at once. 
* The `systemctl` utility does not support custom commands, but for authors of SysV Init scripts they could implement support for any number of arbitrary commands in order to provide additional functionality. 
* System services are unable to read from the standard input stream. When systemd starts a service, it connects its standard input to `/dev/null` to prevent any interaction with the user. 
* System services do not inherit any context (such as the HOME and PATH) environment from the invoking user and their session. 

### Managing Services

Previous distros which were distributed with SysV or Upstart used init scripts located in the `/etc/rc.d/init.d`. The init scripts were written in Bash. With Systemd, these init scripts are replaced with service units.  

Service units end with `.service` and serve a similar purpose as init scripts. Use the `systemctl` to replace previously used `chkconfig` utility. Here's the comparison of the service utility with systemctl:

#### Comparison of the service utility with systemctl

| service                                  | systemctl                                                    | Description                              |
| ---------------------------------------- | ------------------------------------------------------------ | ---------------------------------------- |
| service name [start \| stop \| restart ] | systemctl [start \| stop \| restart ] name.service           | start, stop, restart a service           |
| service name condrestart                 | systemctl try-restart name. service                          | restarts a service only if it is running |
| service name reload                      | systemctl reload name.service                                | reloads configuration                    |
| service name status                      | systemctl status name.service<br />systemctl is-active name.service | checks if a service is running           |
| service --status-all                     | systemctl list-units  --type service --all                   | displays the status of all services      |

#### Comparison of the chkconfig Utility with systemctl

| chkconfig                  | systemctl                                         | Description                                                  |
| -------------------------- | ------------------------------------------------- | ------------------------------------------------------------ |
| chkconfig name [on \| off] | systemctl [enable \| disable] name.service        | enables or disables a service                                |
| chkconfig --list name      | systemctl is-enabled name.service                 | checks if a service is enabled                               |
| chkconfig --list           | systemctl list-unit-files --type service          | list all services and checks if they are enabled             |
|                            | systemctl list-dependencies [--after \| --before] | list services that are ordered to start before or after the specified unit |



### Shutting Down the System

The **systemctl** utility provides commands for shutting down the system, however the traditional `shutdown` command is also supported. To shut down the system and power off the machine, type the following as **root**:

```bash
systemctl poweroff
systemctl halt # halt cpu
systemctl --no-wall poweroff # to prevent systemd from sending poweroff message to all
shutdown --poweroff hh:mm 
shutdown -c # cancel the shutdown schedule
systemctl reboot
systemctl suspend # save the system state in RAM
systemctl hibernate # save the system state on the hard disks
systemctl hybrid-sleep # save the system state both in RAM and on hard disks
```

### Creating and modifying systemd unit files

Unit files can be store in three locations: 

| Unit Files Directory                               | Description                                                                                           | Precedence Level |
| -------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ---------------- |
| `/usr/lib/systemd/system` or `/lib/systemd/system` | Systemd unit files distributed with installed RPM packages                                            | low              |
| `/run/systemd/system`                              | Systemd unit files created at run time.                                                               | middle           |
| `/etc/systemd/system`                              | Systemd unit files created by `systemctl enable` as well as unit files added for extending a service. | high             |

#### Quick View

If we wanna make a unit file for aria2c, we could write a file like this:

```bash
[Unit]
Description=Aria2c download utility
After=network.target

[Service]
ExecStartPre=/usr/bin/env touch /var/tmp/aria2c.session
ExecStart=/usr/bin/aria2c --console-log-level=warn --enable-rpc --rpc-listen-all --conf-path=/etc/aria2.conf
Type=simple
Restart=always

[Install]
WantedBy=multi-user.target
Alias=aria2c.service a2.service
```

Note that although we are setting the alias line, it only works if your unit files in the vendor folder. The `/etc/systemd/system` is a local config compared to `/usr/...`, which is for vendor config. Everything in `[Install]` Section is all about vendor bits. If you really wanna create a alias, just create a symlink in that folder as we normally do. 


#### Why does "Wantedby=multi-user.targert" in most cases

What does "targets" in systemd mean? Well, you can think of it as a improved version of runlevel. This arises to another question? Why does runlevel exists? Runlevel is an extension of the basic "poweroff, boot" concept, which only has two modes. The Unix System is a little special, it can boot with no GUI, or boot with a desktop environment.   You see that there was a need for a more flexible way to control the system's operating state. Runlevels were introduced as a way to define and switch between different states. This allows system administrators to easily switch between different operating modes, such as single-user mode, multi-user mode, or graphical mode. For example, runlevel 1 is used for system maintenance. Runlevel 3 is used for a text-based multi-user system. Runlevel 5 is used for a graphical user interface. As the services required by Runlevel 3 are also running on Runlevel 5, additionally the X Window System is also running. You can think of Runlevel is a superset of Runlevel 3. In the case of systemd, `multi-user.target` is basically the closest equivalent of classic SysVinit runlevel 3 that `systemd` has. When a `systemd` system boots up, `systemd` is trying to make the system state match the state specified by `default.target` - which is usually an alias for either `graphical.target` or `multi-user.target`.  You can check you default target by `systemctl get-default`, or just find the `default target` in the vendor folder:  

```bash
┌──(root㉿NanoPi-R4S)-[/lib/systemd/system]
└─# ls -al | grep default
lrwxrwxrwx  1 root root    16 Jun 18  2023 default.target -> graphical.target
```

You can change it to the `multi-user.target`.   

The line `WantedBy=multi-user.target` is essentially the same as specifying "this service should start in runlevels 3, 4, and 5" in SysVInit System. It tells `systemd` that this service should be started as part of normal system start-up, whether or not a local GUI is active. 

#### Reload your unit files

When you make changes to systemd unit files, you need to run `systemctl daemon-reload` to reload all systemd configuration and make the changes to take effort. Or you can use `systemctl reload aria2.service` a specific unit file.  

