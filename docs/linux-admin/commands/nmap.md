# Nmap

`Nmap` is simply a network security tool for scanning ports status whether they are open or closed. It was originally developed for Linux, but it has been ported to most major operating systems.  

It has many usages:

1. port scanning
2. host discovery
3. host or service uptime monitoring (using Xenmap)



## Port Scanning

The official Nmap website offers a target host at `scanme.nmap.org` that can be scanned as an example. 

```bash
nmap scanme.nmap.org
Starting Nmap 7.94 ( https://nmap.org ) at 2023-12-16 22:17 CST
Nmap scan report for scanme.nmap.org (45.33.32.156)
Host is up (0.21s latency).
Other addresses for scanme.nmap.org (not scanned): 2600:3c01::f03c:91ff:fe18:bb2f
Not shown: 992 closed tcp ports (conn-refused)
PORT      STATE    SERVICE
22/tcp    open     ssh
80/tcp    open     http
135/tcp   filtered msrpc
139/tcp   filtered netbios-ssn
445/tcp   filtered microsoft-ds
593/tcp   filtered http-rpc-epmap
9929/tcp  open     nping-echo
31337/tcp open     Elite

Nmap done: 1 IP address (1 host up) scanned in 21.60 seconds
```

You can probably figure out the output above - four TCP ports are open. There are four filtered ports which indicate the status is unclear.  

We can also specify predetermined ports, like 80, 443, for instance,  

```bash
nmap -p 80,443 www.baidu.com
Starting Nmap 7.94 ( https://nmap.org ) at 2023-12-16 22:20 CST
Nmap scan report for www.baidu.com (36.155.132.3)
Host is up (0.023s latency).
Other addresses for www.baidu.com (not scanned): 36.155.132.76 2409:8c20:6:1135:0:ff:b027:210c 2409:8c20:6:1d55:0:ff:b09c:7d77

PORT    STATE SERVICE
80/tcp  open  http
443/tcp open  https

Nmap done: 1 IP address (1 host up) scanned in 0.13 seconds
```

We can also specify a range, from 20 to 200, to a specific host

```bash
nmap -p 20-200 192.168.0.107
```

## Discover Hosts

We may discover hosts in the LAN by using

```bash
nmap -sn 192.168.1.0/24
```

The `sn` option indicates we only send ping packets instead of scanning.

## Topology

We can use `zenmap`, the gui version of `nmap`, to draw a network topology by first scanning all hosts in the LAN and click the `topology` tab.  



## Service Version

To run a service scan, we use the `-sV` flags.  

```bat
nmap -p 80 -sV www.csdn.net
Starting Nmap 7.94 ( https://nmap.org ) at 2023-12-16 22:27 CST
Nmap scan report for www.csdn.net (117.149.203.81)
Host is up (0.047s latency).

PORT   STATE SERVICE VERSION
80/tcp open  http    nginx

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 13.37 seconds
```

## Multiple Hosts

To scan multiple hosts, we use the following command:  

```bat
nmap -p 80 192.168.0.107/24 www.baidu.com
```

