## Common Commands
```bash
wsl -l # list all distros
wsl -s Ubuntu # set ubuntu as the default distro
wsl --shutdown
wsl -t Ubuntu # terminate Ubuntu distro
wsl -e grep # run linux binary without opening the linux shell
```

## Mount a Linux disk in wsl2

[See more](https://learn.microsoft.com/en-us/windows/wsl/wsl2-mount-disk)

First, you need to get the disk id of that disk from Windows Side

```bash
GET-CimInstance -query "SELECT * from Win32_DiskDrive"
```

### Mounting an unpartitioned disk

```bash
wsl --mount <DiskPath>
# inside wsl
lsblk # do the regular partition and mounting
```

### Mounting an partitioned disk

```bash
wsl --mount <DiskPath> --bare
# inside wsl
lsblk -o +FSTYPE # identify the partition and fstype
wsl --mount <DiskPath> --partition <PartitionNumber> --type <Filesystem>
```

From Windows, the disk can be accessed from File Explorer by navigating to: `\\wsl$\<Distro>\<Mountpoint>` (pick any Linux distribution).

### unmount a disk

```bash
wsl --unmount <DiskPath>
```

## WSL advanced config

[See More](https://learn.microsoft.com/en-us/windows/wsl/wsl-config)

| name                      | meaning                                                      |
| ------------------------- | ------------------------------------------------------------ |
| `/etc/wsl.conf` (Linux)   | configure **local settings** per-distribution for each Linux |
| `~/.wslconfig`  (Windows) | configure **global settings** across all installed distributions |

### Examples for `.wslconfig`

```ini
[wsl2]
# set idle time for wsl instances
vmIdleTimeout=-1
```

