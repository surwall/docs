# Services

First, how services differ from normal applications, in short, services are special programs that run in the background, it often be referred to as "Daemon" in linux.

## Service creation
### Windows
on windows, due to the limitations of windows, we don't really have a good way to create it. There are two ways to create services.

1. nssm(external program)

After we install `nssm`, we can type `nssm install` to open a GUI window to install a service. **Don't forget to type the command in the administrator mode.**

2. powershell

we can use `new service` to create a new service. Yet in my case, I didn't work it out.(windows sucks😥). So just leave it alone.

### Linux[TODO]
On Linux, life is so simple. Most distros use `systemctl` as their service management tool, in that case, we 

## Service Management
### Windows
on windows, we use `nssm` to handle it. We can use
```powershell
nssm list <servicename> # list all installed services
nssm start <servicename>
nssm stop <servicename>
nssm restart <servicename>
nssm status <servicename>
```

For those services which aren't handled by NSSM. We have to use PowerShell command, for example, to search Nginx service. We type `get-service *nginx*`. To start services, `start-service <servicename>`, to stop services, `stop-service <servicename`, to restart services, `restart-service <service-name>`. 

To open a GUI window to manage it, type `services.msc`. 



## Service Removal

### windows

```powershell
nssm remove <servicename>
```

For those services not handled by NSSM. Type `remove-service <servicename>` to remove it.

### Linux[todo]

