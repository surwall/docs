# Vim
[Vim Tutorial](https://github.com/iggredible/Learn-Vim)

## save a file without sudo

When you login as a user and start to edit the file that requires root permission. You can't save changes. For instance, you may wanna edit a file called `/etc/apt/sources.list`. After you make some changes, you should enter:

```bash
:w !sudo tee %
```

In this case, `%` indicates the current filename, `!` indicates a command, `:w` will put the file content as standard input or buffer into this command. 

Then you will get another prompt as follows: 

```bash
W12: Warning: File "/etc/apache2/conf.d/mediawiki.conf" has changed and the buffer was changed in Vim as well
See ":help W12" for more info.
[O]K, (L)oad File: 
```

Make sure you type `L` to load file in the buffer and then hit `Enter`.

[Trick](https://www.cyberciti.biz/faq/vim-vi-text-editor-save-file-without-root-permission/)



## Toggle Comment Multiple Lines

TODO

[Trick](https://www.maketecheasier.com/comment-multiple-lines-vim/#:~:text=Start%20by%20navigating%20to%20the,key%20to%20remove%20the%20comments.)





## Normal Settings

```bash
:set laststatus=2 # This sets the status line to always be displayed with at least two lines of text.
:syntax on # only enable in current buffer
:syntax off
:syntax # check current syntax setting
syntax enable # enable syntax highlighting for all future sessions. add to ~/.vimrc or ~/.config/nvim/init.vim
set number
set wrap

# vim default encoding is latin1, can't show chinese characters
set encoding=utf-8

# show with tab titles
set showtabline=2

```



## Window Management

You may edit multiple files at the same time. One of the things I frequently do is split vertically current window to edit another file. Say, you wanna edit another file in the current directory, open command line mode, type `vsp .`, it will show a list of current files in current directory, choose one file and hit enter. 

You use `ctrl+w+[lrjk]` to move cursor to left, right, down, top window. Hit `ctrl+w+c` to close active window.

## Tab Management
To create a tab in Vim, use the following command:
```bash
:tabnew
:tabnew /path/to/your_file
[TODO]
tab navigation
```



## Plugin System And AutoStart

In Vim 8 and beyond, a groundbreaking evolution took place with the introduction of its native package management system, signifying the gradual eclipse of third-party plugin management tools.

Vim treats plugins located in each of these directories:

1. `~/.vim/pack/{package-name}/start` plugins placed in this directory are automatically loaded when vim starts up. They are considered "start-up plugins" and are active by default.
2. `~/.vim/pack/{package-name}/opt`: plugins placed in the `opt` directory are not loaded automatically. Nevertheless, you can manually load them using `packadd! {plugin-repo-name}` 



In the old times(without plugin management tools), people tend to use a trick -- `~/.vim/autoload` directory can place autoload scripts, which are VimScript files that are automatically loaded by Vim when specific functions or commands defined in those scripts are called for the first time.

Note here, for windows, config file is stored at `~/vimfiles` not `~/.vim`.



## Special Symbols

In vim, symbols function differently depending on the contxt.

### `!` Symbol

Command Modifiers: it can negate or modify the behavior of certain commands. For example: 

* `:q!` Quit without saving changes
* `:set option_name!`: Toggle an option, setting it to the opposite of its current value.
* `:sort!`: Sort the lines, ignoring case and special characters.

When used with certain file operations, such as `:edit`, `:write`, or `:read`, the `!` symbol can force the operation to proceed without checking for certain conditions. For example:

- `:w!`: Write the file, ignoring any read-only status or write permission issues.
- `:e!`: Edit the file, discarding any unsaved changes without warning.

The `!` symbol is used as a shorthand to execute shell commands from within Vim. For example:

- `:!ls`: Run the `ls` command in the shell from within Vim.
- `:!git status`: Run the `git status` command in the shell from within Vim.



### `%` Symbol

In Normal mode, the percent sign is used to move the cursor to the matching opening or closing bracket/parenthesis/curly braces.

In command-line mode, the percent sign is used as a placeholder for the current file path (e.g., `:w %` to write the current file).



## Registers

In Vim, a register is a storage area where text can be saved temporarily. Registers are used to store and manipulate text during editing operations. Vim provides several registers, each identified by a specific name (usually a single character).

1. **Named Registers:** Vim allows you to use named registers (specified by a letter or other characters) to save text. This can be helpful when you want to store multiple snippets of text and paste them selectively. 
2. **Anonymous Register** When you yank or paste without specify a register, it will use the default register to do the task.
3. **Special Register**: Register `+` and `*` are linked to system clipboard, you can copy to or paste from that register. `"+p` to paste from the clipboard. `"+y` to copy the current line to the clipboard.

The syntax for this is `"` + `[register name]` + `action`.



## Macros

The most easiest macro is `.` command, which repeats last execution sequence during the editing mode. You may move to a line, enter the editing mode, remove the last character, and done. You use `.` to operate this macro on the second line.

Other macros can be recorded by `q[Reg]`, for instance, you wanna record this macro inside register a, you type `qa`. After you are finished, you can hit `q` to stop recording.

Use `@a` to execute macros in register A, if you wanna execute multiples times, hit `5@a` it will repeat 5 times.



## vimrc 

This file is the config file for vim.

```vim
set backspace=indent,eol,start
syntax on
" clone follwoing repo into pack/onedark/opt
" https://github.com/joshdick/onedark.vim 
packadd! onedark.vim
colorscheme onedark
set encoding=utf8

nnoremap <F6> :30Le<CR>

"os specific
if has('win32')
    set backupdir=$HOME/vimfiles/backup
    set directory=$HOME/vimfiles/tmp
else
    set backupdir=$HOME/.vim/backup
    set directory=$HOME/.vim/tmp
endif

set number
set autoindent
set hlsearch
" Always display the status line, even if only one window is displayed
set laststatus=2

"************************ language specific ****************
set tabstop=4    " tab occupy how many space
set softtabstop=4
set expandtab    " convert tab to space
set shiftwidth=4 " when using >> << use how many space

" use case insensitive search, except when using capital cases
set ignorecase
set smartcase
```

## File Management
Vim has a built-in file explorer called `netwr`. We can use that to delete and create directories and files.
To creat a new directory, you type `d`, can type the name in the prompt.  
To delete a file or directory, you move your cursor on your target, and hit `D`, press 'y' and enter.
You may use visual mode to select multiple targets, then you press `a` to delete all files.
Note, if a directory contains files in it, you can't delete it, but you can change default behavior from `rmdir` to `rm -rf`.
You may wanna refresh your current list by using `ctrl+l`.  
You open the file in default application by using `x` on it.