## Intro
SSH is a client/server protocol that uses [security in network](../../3-cs-basics/security%20in%20network.md#Public%20Key%20Encryption), confidentiality, and integrity of communications between two hosts.
OpenSSH, the open source SSH implementation which is the most popular one. It contains several commands:
* ssh: ssh client
* sshd: ssh server
* ssh-keygen: generate pub and private key pairs
* ssh-keyscan: Get the public SSH keys of remote hosts.
* sftp-server 
* ssh-add and ssh-agent: cache the passphrase so you don't need to type twice

## Quick Start

To connect a server using the user `root`
```bash
# first way
ssh -l root server.com
# second way
ssh root@server.com
```
When you connect the server, ssh-client retrieves the public key from the host. If it's the first-time connection, it prompts the fingerprint of the host public key (`/etc/ssh/ssh_host_key.pub`). What is a fingerprint in this context? It's the hash of the public key. To ensure it's the correct server, you can check the fingerprint on the server with the command:
```bash
ssh-keygen -l -f /etc/ssh/ssh_host_ecdsa_key.pub
```
After you type `yes`, one record will be inserted into `~/.ssh/known_hosts` like this:
```bash
ubuntu-1,fe80::be24:11ff:fe98:c5c5%56 ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBJIUepm7DucHThA48xHuEIN7RiIEaTvEMjKLZD6Co0FL83jNi0hpGt0uY1kXrOEBiSaTwQhKWH1K7IygkqV2xNs=
```
It's the public key along with the host name, and the IP. If any of the components change, it will have warnings. You have to manually delete this record.

## SSh Client
```bash
ssh [options] [username@]host [command]
```
Note that you can execute a command on the remote host. For instance, to display log size:
```bash
ssh server.admin.com "df -h /var/log"
```
The command must be quoted to avoid bash interpretation. If you don't provide a username, it tries to use your current shell name. For convenience, ssh returns the exit status of the remote command.

## Useful SSH client configuration options

SSH client also has configuration.

| conf                            | desc          | precendence |
| ------------------------------- | ------------- | ----------- |
| ssh -o StrictHostKeyChecking=no | command line  | high        |
| `~/.ssh/config`                 | user config   | middle      |
| `/etc/ssh/ssh_config`           | global config | low         |

Configuration

| Option                | Meaning                                | Default       |
| --------------------- | -------------------------------------- | ------------- |
| AddKeysToAgent        | Automatically add keys to ssh-agent    | no            |
| ConnectTimeout        | Connection timeout in seconds          | varies        |
| ControlMaster         | Allow connection multiplexing          | no            |
| ForwardAgent          | Enable ssh-agent forwarding            | no            |
| Host                  | Marker for a new host alias            |               |
| IdentityFile          | Path to an authentication private key  | ~/.ssh/id_rsa |
| Port                  | Port to connect on                     | 22            |
| StrictHostKeyChecking | Require (yes) or ignore (no) host keys | ask           |



## public key authentication

SSH can use public key cryptography to authenticate users to remote systems. The steps are displayed:

1. the user creates a public/private key pair
2. give the public key to the administrator, who adds it to `~/.ssh/authorized_keys` in the host
3. the user then log in to the remote host with the specified private key

Use ssh-keygen to generate a key pair. Use `-t` to specify a algorithm, it could be `rsa` or `ecdsa`

```bash
# most secure algo
ssh-keygen -t ed25519 -a 100
# another way, must use 4096 bits
ssh-keygen -t rsa -b 4096
```

ssh-keygen prompts for an optional passphrase to encrypt the private key. If you  use a passphrase, you must type it to decrypt the key before ssh can read it. 

### ssh agent

In order to simplify this process, we can use `ssh-agent` and `ssh-add` to cache the passphrase, so you don't need to enter it again.

1. Run the `ssh-agent` process with `ssh-agent`

2. add your private key to `ssh-add` and provide the passphrase
   ```bash
   ssh-add path/to/private_key
   ```

> [!note]
>
> To use it on Windows, set`ssh-agent` service type to manual before using `ssh-agent.exe`
> ```bash
> get-service ssh-agent | select StartType # check type
> set-service ssh-agent -StartupType Manual
> ssh-agent.exe # run the service
> ```

### Add user's public key

```bash
cat /tmp/hello.pub >> ~root/.ssh/authorized_keys # window client
```

If you are using Unix as a client, use the following command:

```bash
ssh-copy-id -i path/to/pub_file [-p port] username@remote_host
```

> [!tip]
>
> You can use Ansible to automate this process.

### Connecting the server

```bash
ssh -i ~/.ssh/id_ecdsa [-p port] hello@server.com
```



## Host Alias

If you interact with a large number of servers. You can define alias commands in `~/.ssh/config`.

For example, consider two systems. The first is a web server with IP address  54.84.253.153 where sshd listens on port 2222 and you use a specific private key for authentication. The other is debian.admin.com, 
where your username is hsolo. You’d prefer to disable password authentication entirely, but the Debian server requires it.

```yaml
PasswordAuthentication no
Host web
    HostName 54.84.253.153
    User han
    IdentityFile /home/han/.ssh/id_ecdsa
    ForwardAgent yes
    Port 2222
Host debian
    Hostname debian.admin.com
    User hsolo
    PasswordAuthentication yes
```

After that you can simply using `ssh web` or `ssh debian` to connect.

## SSH PORT forwarding

### **Remote port forwarding**

```bash
# forward local host port 8000 traffic to webserver through server.admin.com
ssh -L 8000:webserver:80 server.admin.com
```

### Local port forward

You connect from your client to your server and thereby open a tunnel so that another program on your client can connect via a local port to a host&port on the server site.

A typical use case is you wanna access your NAT-based virtual machines from outside.

```bash
ssh -L 9999:localhost:22 -N -T virtual-machine-ip
```

In this case, the virtual machine send packets to `localhost:22`, which is itself. `-N` and `-T` are used to disabling pseudo-[T]ty allocation and executio[N] of remote commands:

You can create a daemon for this:

```bash
nohup ssh -L 9999:localhost:22 -N -T virtual-machine-ip &> /dev/null & 2>&1
```



## SSH Server Configuration

```yaml
PasswordAuthentication no
PubkeyAuthentication yes
```

After modifying the `/etc/ssh/sshd_config`, reload the configuration with:

```bash
sudo kill -HUP $(sudo cat /var/run/sshd.pid)
```

## File Transfer

OpenSSH has two utilities for transferring files: scp and sftp. They are all based on SSH connections. On the server side,  sshd runs a separate process called sftp-server to handle file transfers.

```bash
scp ./file server.admin.com: # local to remote
scp server.admin.com:file ./file # remote to local
scp server1.admin.com:file server2.admincom:file # remote to remote
```

sftp is an interactive experience similar to a traditional FTP client.

## dirty setup

```bash
# match the line starts with '#PermitRootLogin'
sed -i '/#PermitRootLogin/ a\PermitRootLogin yes' /etc/ssh/sshd_config
```
