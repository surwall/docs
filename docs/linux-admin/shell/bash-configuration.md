---
sidebar_position: 3
---
## Install Completion
```
sudo apt install bash-completion
```

For MacOS, use:
```bash
brew install bash-completion
```

## Built-In Variables
There's a list of built-in variables.

| name         | value                                                                                                                                                                                |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| PWD          | current directory                                                                                                                                                                    |
| USER         | the name of the current user                                                                                                                                                         |
| SHELL        | the name of the current shell, e.g. bash, zsh                                                                                                                                        |
| BASH         | This is the absolute path of the current `bash` being invoked                                                                                                                        |
| BASH_VERSION | This is the version number of `bash`                                                                                                                                                 |
| BASHPID      | This is the process ID of the current `bash` process                                                                                                                                 |
| HOME         | the current user's home directory                                                                                                                                                    |
| HOSTNAME     | This is the name of the current host                                                                                                                                                 |
| PATH         | colon-separated list of directories where shell will look for commands orderly                                                                                                       |
| PPID         | the process ID of the shell's parent                                                                                                                                                 |
| `$$`         | Process ID (_PID_) of the script itself.                                                                                                                                             |
| `$?`         | [Exit status](https://tldp.org/LDP/abs/html/exit-status.html#EXITSTATUSREF) of a command, [function](https://tldp.org/LDP/abs/html/functions.html#FUNCTIONREF), or the script itself |
| $SHLVL       | shell level                                                                                                                                                                          |
More shell variables can be found in `man bash`.

## Config
```bash
# GIT bash integration
if [[ -e /usr/lib/git-core/git-sh-prompt ]]; then

   source /usr/lib/git-core/git-sh-prompt
   export GIT_PS1_SHOWCOLORHINTS=true
   export GIT_PS1_SHOWDIRTYSTATE=true
   export GIT_PS1_SHOWUNTRACKEDFILES=true
   export GIT_PS1_SHOWUPSTREAM="auto"
   # PROMPT_COMMAND='__git_ps1 "\u@\h:\w" "\\\$ "'
   # PROMPT_COMMAND='__git_ps1'
   # use existing PS1 settings
   PROMPT_COMMAND=$(sed -r 's|^(.+)(\\\$\s*)$|__git_ps1 "\1" "\2"|' <<< $PS1)
fi

if [[ -f ~/.bash_aliases ]]; then
	. ~/.bash_aliases
fi
```

## Alias
```bash
alias ll='ls -l'
alias ls='ls --color'
alias egrep='egrep --color=auto'  
alias fgrep='fgrep --color=auto'  
alias grep='grep --color=auto'  
alias l='ls -CF'  
alias la='ls -A'  
alias ll='ls -lF'  
alias ls='ls --color=auto'

# lxc 
alias lxc-ls='sudo lxc-ls -f'  
alias lxc-start='sudo lxc-start'  
alias lxc-stop='sudo lxc-stop'  
alias lxc-attach='sudo lxc-attach'  
alias lxc-destroy='sudo lxc-destroy'
alias lxc-create='sudo lxc-create'

lxc-run() { lxc-start "$@" && lxc-attach "$@"; }

# disk
alias ncdu='ncdu --color dark'

# paru
alias paru='paru --limit 7'

alias open='xdg-open'
alias yt-dlp='yt-dlp --write-subs'

alias df='df -h'
alias du='du -h'
alias free='free -h'

# term
# export TERM='xterm-256color'
export EDITOR="nvim"


# quick navigation
mcd() { mkdir -p "$1" && cd $_ ;}

export CDPATH=".:~:/usr"
```

## Cdpath

