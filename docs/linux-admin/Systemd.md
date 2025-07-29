## Intro

systemd is not like traditional init. It not only manages daemons but also manage timers and other things.
The entity that systemd manages is called unit. It could be a service, a timer, a mount point, socket, or device. Each unit has its own configuration file. There are many types of units:

1. Service units - Control the service
2. Target units - Control other units, usually by grouping them
3. Socket units - Represent incoming network connection request locations
4. Mount units - Represent the attachment of filesystem to the system
Of these, service and target units are the most common ones. Target units is more like a mode or run level in the traditional Sys Init. It requires other units or even targets. For example, we have a `multiuser.target` that requires `basic.target` and `cron.service`.

## Configuration
The systemd configuration files are spread among many directories across the system.

| Unit Files Directory                               | Description                                                                                           | Precedence Level |
| -------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ---------------- |
| `/usr/lib/systemd/system` or `/lib/systemd/system` | Systemd unit files distributed with installed RPM packages                                            | low              |
| `/run/systemd/system`                              | Systemd unit files created at run time.                                                               | middle           |
| `/etc/systemd/system`                              | Systemd unit files created by `systemctl enable` as well as unit files added for extending a service. | high             |
We normally create our own unit files at `/etc/systemd/system` directory. Avoid making changes to the system unit directory `/lib/systemd/system`, since those unit files might be overridden when upgrading.

You can check the current systemd configuration search path(including precedence) by:
```bash
systemctl -p UnitPath show | more
```
To see the system unit and configuration directories using:
```bash
pkg-config systemd --variable=systemdsystemunitdir
```

## Unit Files
The format for unit files is similar to `.ini` files. It specifies the properties, dependencies, and actions associated with a particular unit, such as a service, target, timer, mount point, swap, or automount. 

> [!important]
>
> Note that a unit file should always end with its corresponding unit type to clearly indicate its purpose. 
>
> * **.service:** For services that are started and stopped by systemd.
> * **.target:** For targets that represent a collection of units that should be started or stopped together.
> * **.timer:** For timers that schedule tasks at specific times or intervals.
> * **.mount:** For mount points that define filesystem mounts.
> * **.swap:** For swap devices that are used for virtual memory.
> * **.automount:** For automounts that automatically mount filesystems when accessed.

## Service Units

As an example, consider the `dbus-daemon.service`.

```ini
[Unit]
Description=D-Bus User Message Bus
Documentation=man:dbus-broker-launch(1)
DefaultDependencies=false
After=dbus.socket
Before=basic.target shutdown.target
Requires=dbus.socket
Conflicts=shutdown.target

[Service]
Type=notify
Sockets=dbus.socket
ExecStart=/usr/bin/dbus-broker-launch --scope user
ExecReload=/usr/bin/busctl --user call org.freedesktop.DBus /org/freedesktop/DBus org.freedesktop.DBus ReloadConfig
Slice=session.slice

[Install]
Alias=dbus.service
```
Unit Section is common to all types. In this section, we specify the dependency with other units or targets using `After`, `Before`, `Requires` or `Conflicts`.

Service Section is specific to service unit.

## Service Operation

```bash
sudo systemctl enable myservice # start on boot
sudo systemctl enable myservice --now # enable and start it
sudo systemctl start myservice
sudo systemctl status myservice
sudo systemctl status -l myservice # show content without cutting
```

## Target Units

Normally, we don't define target units. Because it just emulate the runlevel in SysV init. Since in our service unit, we can define dependencies. We don't need to modify target unit.

## Timer Units

### Time-based Timers

 These timers are triggered at specific points in time, such as daily, weekly, or monthly. The `OnCalendar` directive is used to specify the timing.

### Interval-based Timers

These timers are triggered at regular intervals, such as every 5 minutes, 1 hour, or 1 day. The `OnUnitActiveSec` directive is used to specify the interval.
```ini
[Unit]
Description=Run foo weekly

[Timer]
OnCalendar=weekly
Persistent=true

[Install]
WantedBy=timers.target
```

### Transient Timers
One can use `systemd-run` to create transient _.timer_ units. That is, one can set a command to run at a specified time without having a service file. For example the following command touches a file after 30 seconds:
```bash
systemd-run --on-active=30 /bin/touch /tmp/foo
```

### Timer Management
```bash
systemctl list-timers # list all timers
systemctl enable foo.timer --now # enable certain timer and start it
systemctl start foo.timer
```

## Manage Systemd

1. list all service units (only active)
   ```bash
   systemctl list-units --type=service
   ```

2. list all service units (not only active)
   ```bash
   systemctl list-unit-files --type=service
   ```

3. reload all unit files and configuration
   ```bash
   systemctl daemon-reload
   ```

4. reboot and restart
   ```bash
   systemctl reboot
   systemctl poweroff
   systemctl suspend
   ```

## Systemd Logging

systemd also manage the logging using `journald` daemon. `journald` catch system messages into `/run`. We can use `journalctl` to show all logs.

```bash
journalctl
```

show boot messages

```bash
journalctl --list-boots
```

show messages from a specific boot (all messages generated in this boot)
```bash
journalctl -b 0 # current boot messages
```

show specific unit's log (old entries at top)

```bash
journalctl -u nginx
journalctl -u nginx -r # newest entries at top
journalctl -ru nginx
```

## See Also
[systemd-units-example](systemd-units-example.md)
[digital ocean](https://www.digitalocean.com/community/tutorials/understanding-systemd-units-and-unit-files)
[red hat systemd](https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/9/html/using_systemd_unit_files_to_customize_and_optimize_your_system/assembly_working-with-systemd-unit-files_working-with-systemd#con_unit-file-structure_assembly_working-with-systemd-unit-files)
