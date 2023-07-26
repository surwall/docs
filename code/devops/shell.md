# Shell



## Config

Every shell have its own config file. 

### PowerShell Config

For PowerShell, it set a variable `$PROFILE` pointed to the profile path. You may need to create it first and then `notepad $PROFILE`. It also have global profile like `$PROFILE.AllUsersAllHosts`.

### Bash Config

Before our discussion, we could divide them into three categories:

1. **Login Shell, Interactive:**

When you login into the system or through SSH, Bash is started as a login shell, and it reads the following configuration( in this order):

* `/etc/profile` This file contains system-wide environment variables and settings for all users. It is read only once during the login process.
* `/etc/bash.bashrc` or `/etc/bashrc`: On some systems, a global Bash configuration file is sourced after `/etc/profile`.
* `~/.bash_profile`,`~/.bash_login`, `~/.profile`:  These files are alternative login scripts that are read if `~/.bash_profile` does not exist.

2. **Non-Login Shell, Interactive:**

* `/etc/bash.bashrc` or `/etc/bashrc`: The global Bash configuration file is read for non-login interactive shells.

* `~/.bashrc`: The user-specific configuration file that is sourced for interactive non-login shells. This file is read when you start a new terminal or open a new interactive shell within an existing session
* `~/.bash_logout`: The user-specific configuration file that is sourced when a user logs out of the shell.

3. **Non-Login Shell, Non-Interactive:**

* In certain cases, when Bash is used non-interactively (e.g., running scripts or commands), it reads the following file: `BASH_ENV`: If the `BASH_ENV` environment variable is set, Bash reads the file specified in `BASH_ENV` before executing any non-interactive shell.



We can check `echo $0` to ensure it's a login shell if it has hyphen like `-bash`, if without hyphen, that's a non-login shell.

If we login by SSH, we first check `/etc/profile`, then check `~/.bash_profile` or `~/.bash_login` or `~/.profile`. We won't actually read `.bashrc` unless we source it explicitly in the previous file. Because that config is meant for non-login interactive shells. And SSH sessions usually start a login shell by default. But after  you login by SSH, you type `bash` again, in that case, that's a non-login shell. That is same as we open a shell on desktop environment. If that is the case, we read from `~/.bashrc` only.



### CMD Config

There's no technical thing called profile in the world of CMD, but here's a trick that can do the same thing. First we define a CMD file somewhere. Put the content into it:

```cmd
@echo off
set TEST_VAR=something
```

Run `regedit` and navigate to `HKEY_LOCAL_MACHINE\Software\Microsoft\Command Processor`. Right Click `Command Processor` and create a new string value, enter the key `AutoRun`, and the value `C:\cmdrc.cmd` (which is your pre-defined script). 



### Zsh Config

TODO



## Reload Shell

After we made some changes to our config file, we need immediately reflect it. 

1. PowerShell

We use dot operator to reload profiles. `. $PROFILE` or `. $PROFILE.AllUsersCurrentHost`.



2. Unix-like Shells

We can use `source ~/.bashrc` or `. ~/.bashrc`. The actual config file may differ.



3. CMD

There is no way to reload CMD unless you restart it.



## Switch Shells

Before we switching our shells, we have to figure out what's the current shell is by typing `echo $0`. That's mainly for Unix-like systems, as for Windows, we have two shells: CMD and PowerShell. In CMD, we type `echo %ComSpec%`, in PowerShell, we type `echo $PSVersionTable`.

There are so many shells available for Unix-like systems, so we all have several built-in shells. We can check that by typing `cat /etc/shells`, that is, that contains all installed shells. We assign each user a login shell, by default, it's just bash. We really tempted to use `zsh` to replace it. As you know, those info are stored inside `/etc/passwd` (the last portion separated by colons,  we can manually edit this file, but this is error-prone. We have a specific command for it: `chsh -s /bin/zsh john`(root only), root can change anyone's shell, but normal user can only change their own. In that case, we use `chsh -s /bin/zsh` without a username.



## Shell Variables

There are two distinct variables: environment variables and normal variables(User-Defined Variables). Environment variables have a global scope and can be accessed by any process running on the system, including the shell and its child processes. On the other hand, normal variables have a local scope and are limited to the specific shell session or script in which they are defined.

1. CMD

In CMD, there only exists environment variables. You can use `set foo=bar` to set variables, and access its value by `echo %foo%`. It will replace the content inside `%%`.  We can use `set` to show all variables.

the `&` operator to chain the commands together.

```cmd
set VARIABLE_NAME=value & your_program.exe
```





2. Bash 

In Bash, we can define normal variable by `foo=3`. Note that the space is not allowed between name and value. After that, we can access it by `echo $foo`. As for environment variables, we can type `export JAVA_HOME=/home/marcus`. Accessing it is the same as normal variables. 

There is a trick for setting one-time environment variables for a single command. For instance,

```bash
TZ="Asia/Shanghai" LANG="zh_CN.UTF-8" date +"%Y年%m月%d日 %H时%M分%S秒"
```

This command will set two environment variables temporarily (only applies to this command) and output the time respect to shanghai time zone and output it using Chinese.



3. PowerShell

In PowerShell, we can set normal variables by `$foo = 5`, the space is allowed here. By `echo $foo` we can access this variable. Besides that, we can use `$Env:JAVA_HOME = "C:\tools"` to set a environment variable called "JAVA_HOME". And read it by `echo $Env:JAVA_HOME`. 

One can list all environment variables by running `Get-ChildItem Env:`. 

Sadly, PowerShell doesn't support bash one-time environment variables feature, once again, Windows sucks😥. 

```powershell
$env:VAR1 = "Value1"; $env:VAR2 = "Value2"; $env:VAR3 = "Value3"; ...; your_command_here
```



We can pre-define our environment variables inside our config files. 



## Special Variables
TODO