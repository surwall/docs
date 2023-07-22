# Processes

## Process Creation

### Windows

A large amount of programs aren't command line programs. So sometimes we may start a GUI Apps, how do we let our terminal stop waiting the GUI closing. Type `typora.exe someParameter &`, the key is the ampersand, that indicates to run it in the background. Beware that this only works on latest PowerShell, I recommend you to use PowerShell7.



## Process Monitoring



## Process Finding and Killing

### Windows

We use `Nginx` as our subject to demonstrate the procedure. Type `ps *nginx*` to search for Nginx. There is an advanced version, `Get-Process | Where-Object {$_.Name -like "*nginx*"}`. In this case, get-process returns a list of items, `where-object` (also can write as `where`) can run the expression in curly braces on each item. It acts like "ForEach" or "Map" on other languages. Curly braces act as a lambda expression, or anonymous functions. `$_` means the current selected item.

After we searching for the specified programs, we can now kill it. `ps *nginx* | kill` or `ps *nginx* | stop-process`. 

You might wanna specify multiple Pids, that is, we can type `kill 234,55`. Separate Pids using commas.

### Linux[TODO]

