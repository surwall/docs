## Docker add completion
1. For Unix similar system use Bash
```bash
sudo curl https://raw.githubusercontent.com/docker/cli/master/contrib/completion/bash/docker -o /etc/bash_completion.d/docker.sh
```
2. For Windows users that use PowerShell
	1. Type the following command on PowerShell Console
	```bash
	Install-Module DockerCompletion -Scope CurrentUser
	```
	2. Append the following line at the end of your profile by typing:
	```bash
	echo "Import-Module DockerCompletion" >> $PROFILE
	```
	





## Docker replace mirror
1. Locate your docker engine settings. On Windows Desktop, it can find it on the settings. For Linux, it just locate at `/etc/docker/daemon.json`, create it if not exist.
2. Append as follows

## Docker container use proxy
Set the global docker settings to a proxy

`Docker settings located at /etc/default/docker`

`Or just use --network=host to use host's network`


## docker images problem
### ps not available
```bash
apt install procps # debian or ubuntu
dnf install procps-ng # red hat based
```
