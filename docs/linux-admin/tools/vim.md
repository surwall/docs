[Vim Tutorial](https://github.com/iggredible/Learn-Vim)

## Common Scenarios

### Save a File without Sudo

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

### Toggle Comment Multiple Lines
1. Navigate to the beginning of the line
2. Use `Ctrl+V` to enter visual block mode
3. Use `j` to select multiple lines, and `l` to select length
	* Use `I` to insert at the beginning with the comment sign to comment
	* Use `x` or `d` to delete the block to uncomment

[Trick](https://www.maketecheasier.com/comment-multiple-lines-vim/#:~:text=Start%20by%20navigating%20to%20the,key%20to%20remove%20the%20comments.)

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

## Window Management

You may edit multiple files at the same time. One of the things I frequently do is split vertically current window to edit another file. Say, you wanna edit another file in the current directory, open command line mode, type `vsp .`, it will show a list of current files in current directory, choose one file and hit enter. 

You use `ctrl+w+[lrjk]` to move cursor to left, right, down, top window. Hit `ctrl+w+c` to close active window.

## Tab Management
To create a tab in Vim, use the following command:
1. Create a new tab by `:tabnew filename`
2. Navigation
	1. Previous Tab `:tabprevious`
	2. Next Tab: `:tabnext`
## Registers

In Vim, a register is a storage area where text can be saved temporarily. Registers are used to store and manipulate text during editing operations. Vim provides several registers, each identified by a specific name (usually a single character).

1. **Named Registers:** Vim allows you to use named registers (specified by a letter or other characters) to save text. This can be helpful when you want to store multiple snippets of text and paste them selectively. 
2. **Default Register** When you yank or paste without specify a register, it will use the default register to do the task. The default register is `"`.
3. **Special Register**: Register `+` and `*` are linked to system clipboard, you can copy to or paste from that register. `"+p` to paste from the clipboard. `"+y` to copy the current line to the clipboard.

The syntax for this is `"` + `[register name]` + `action`.

In the inserting mode, you can paste register content using `Ctrl+R + [register name]`.

## Macros

The most easiest macro is `.` command, which repeats last execution sequence during the editing mode. You may move to a line, enter the editing mode, remove the last character, and done. You use `.` to operate this macro on the second line.

Other macros can be recorded by `q[Reg]`, for instance, you wanna record this macro inside register a, you type `qa`. After you are finished, you can hit `q` to stop recording.

Use `@a` to execute macros in register A, if you wanna execute multiples times, hit `5@a` it will repeat 5 times.
To repeat last macro execution, use `@@`, or repeat five times of the last execution `@@`.
>[!important]
>After modifying the line and return to the normal mode. You need to  move cursor to the next line, so your macro can execute on multiple lines.

## File Management
Vim has a built-in file explorer called `netwr`. We can use that to delete and create directories and files.
To creat a new directory, you type `d`, can type the name in the prompt.  
To delete a file or directory, you move your cursor on your target, and hit `D`, press 'y' and enter.
You may use visual mode to select multiple targets, then you press `a` to delete all files.
Note, if a directory contains files in it, you can't delete it, but you can change default behavior from `rmdir` to `rm -rf`.
You may wanna refresh your current list by using `ctrl+l`.  
You open the file in default application by using `x` on it.

## Folding
Fold commands all begin with z. 
* `zA` Toggle the state of folds, recursively.
* `za` toggle the state of one fold
* `zf[motion]` Create a fold from the current line to the motion line like `zf2j` folds 3 lines
  normally, we would enter visual line mode, and selection lines and hit `zf`
* `zM` set option foldlevel to 0 (fold all levels)
* `zm, zr` decrease or increase the foldlevel by 1
* `zf%` to fold a C-like block
You can control the level of folds you see with the `:foldlevel` command. It takes an integer as its argument and displays only lines whose fold levels are less than or equal to the argument.
If we set `:set foldlevel=2`, it will display all header 2.

Actually we only need to remember 3 commands:
1. `za` to toggle one fold
2. `zm` to fold one level
3. `zr` to unfold one level

## Vim options
open a file in the existing vim.
``gvim --remote-tab`` open a file as a tab into existing vim

## See More
[vim-configuration](vim-configuration.md)
[vim-plugins](vim-plugins.md)
[neovim](neovim.md)