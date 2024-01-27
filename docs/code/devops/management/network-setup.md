# Network Setup
When are talking about configuring network, we only focus on Debian-based distros(Debian, Ubuntu) and RedHat-based distros(RHEL, Centos7, Fedora). 



## Ubuntu
For ubuntu,  for the purpose of easy use, it designed its own tool, [netplan](https://netplan.readthedocs.io/en/stable/netplan-yaml), to configure network. It can use debian's tools, NetworkManager, as backend. So it works like a high level tool built on top of these common used management tools.
The config files for netplan are stored inside `/etc/netplan`, you may have `00-xx.yaml`, `01-xx.yaml`, and `99-xx.yaml`, these files may specify the same interface, but because they are exectued in numerical order, so the configuration file with the highest numerical number prefix takes effect. In this case, `99-xx.yaml` will take effect.

1. To check current config use `sudo netplan get`
2. The configuration file is written in YAML format(if you wanna configure a static IP address):
```yaml
network:
  version: 2
  ethernets:
    enp6s0:
      dhcp4: false
      dhcp6: false
      accept-ra: false
      link-local: []
      addresses:
        - 172.16.0.1/24
      routes:
        - to: default
          via: 172.16.0.254
      nameservers:
        search:
          - netplanlab.local
        addresses:
          - 172.16.0.254
          - 172.16.0.253
```

If you just wanna auto configured IP addresses, you can just use this command: 

```bash
netplan set --origin-hint second-interface ethernets.enp6s0.dhcp4=true
```

This command specifies the second-interface as the name of the config file to be stored. 

We can test the changes first before permanently applying them using this command:  

```bash
sudo netplan try
```

If there are no errors, it will ask if you want to apply these settings.

To apply the changes without try, you can use `sudo netplan apply`.

*Note that default render is `networkd` not Debian's `NetworkManager`.*



## Debian

For Debian, which is a old distro, it continues to use `NetworkManager` as its tool to manage network. Its configuration files store at `/etc/networks/interfaces/*`. If you don't provide a config file, it will use DHCP to obtain IP addresses and network settings.

To set a static IP address for an interface named `ens33`, you can use the following configuration:  

```txt
iface ens33 inet static
     address 192.168.1.2/24
     gateway 192.157.1.1
```

The file could be saved as `/etc/networks/interfaces.d/ens33.conf`. 

To set a DHCP Address, just use a one-liner.   

```txt
iface ens33 inet dhcp
```



To apply your new network settings you will need to bring the interface offline and then back online.  

1. Bring the interface down

```bash
ifdown ens33
```

2. Bring the interface up

```bash
ifup ens33
```

