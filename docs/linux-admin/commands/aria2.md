aria2 is a download utility.

The common configuration is the following:
```text
# comment should at one line
continue
file-allocation=falloc
max-connection-per-server=4
max-concurrent-downloads=10
max-overall-download-limit=0
min-split-size=25M
rpc-allow-origin-all=true
input-file=aria2c.session
save-session=aria2c.session
log-level=error
log=aria2.log
rpc-secret=Xcy
dir=D:\Downloads
```

to use on the Windows use nssm pass the following argument
```bat
aria2c --conf-path=aria2.conf
```
