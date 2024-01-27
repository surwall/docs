# Shell
We use shells to run scripts or commands that GUI environment isn't suitable. 

## Config

Every shell have its own config file. 

### PowerShell Config

For PowerShell, it set a variable `$PROFILE` pointed to the profile path. You may need to create it first and then `notepad $PROFILE`. It also have global profile like `$PROFILE.AllUsersAllHosts`.

### Bash Config
![bash config execution flow](https://oss.xuchaoyin.com/docs/202311272258513.svg)

The above picture shows the procedure of reading configurations. You can see it is divided into two categories: login shells and non-login shells.

When you login into the system or through SSH, Bash is started as a login shell. **Please note here, reading non-login configurations is not required by a login shell, nevertheless every distros source it inside `/etc/.profile`.** This goes to personal configurations as well. We source `~/.bashrc` inside `~/.bash_profile`. 

As for non-login shells, when we open a terminal app on our preferred desktop environment or execute a new shell inside a existing shell, that is a non-lgoin 

There is a special file called `~/.bash_logout`, when you exit a login shell, it will execute this script.

In certain cases, when Bash is used non-interactively (e.g., running scripts or commands), it reads the following file: `BASH_ENV`: If the `BASH_ENV` environment variable is set, Bash reads the file specified in `BASH_ENV` before executing any non-interactive shell.

> We can check `echo $0` to ensure it's a login shell if it has hyphen like `-bash`, if without hyphen, that's a non-login shell.

Because of that login shells are only executed once during the login process, this is meant for heavy stuffs.  As for `rc ` file, they would run each time we start a new shell, we must set appearance and look every time. [link](https://unix.stackexchange.com/questions/324359/why-a-login-shell-over-a-non-login-shell/324391#324391)

Regardless of whether you start a child shell or a subshell, the prompt is not inherited from the parent shell. The prompt is a specific setting defined in the configuration file of each shell, and when a new shell is created, it uses its own configuration, including the prompt definition.



### CMD Config

There's no technical thing called profile in the world of CMD, but here's a trick that can do the same thing. First we define a CMD file somewhere. Put the content into it:

```cmd
@echo off
set TEST_VAR=something
```

Run `regedit` and navigate to `HKEY_LOCAL_MACHINE\Software\Microsoft\Command Processor`. Right Click `Command Processor` and create a new string value, enter the key `AutoRun`, and the value `C:\cmdrc.cmd` (which is your pre-defined script). 



### Zsh Config

![zsh config execution flow](https://oss.xuchaoyin.com/docs/202311272257024.svg)



## Reload Shell

After we made some changes to our config file, we need immediately reflect it. 

1. PowerShell

We use dot operator to reload profiles. `. $PROFILE` or `. $PROFILE.AllUsersCurrentHost`.

- `.` (dot-sourcing) runs the script in the current scope, making all variables, functions, and aliases defined in the script available in the current session.
- `&` (call operator) runs the script in its own scope, which means variables and functions defined in the script do not persist in the current session unless explicitly returned or stored in variables.



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