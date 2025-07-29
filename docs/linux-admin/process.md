A process is a unit of work on a Linux system. Every process is identified by a numeric process ID, or PID. That can be examined in the directory `/proc`.

## Ps Command
The ps command displays information about running processes.
1. view all process 
   ```bash
   ps -ef # truncated to the width of the screen
   ps -efww # full command lines
   ```

2. view your processes

   ```bash
   ps -u $(id -u) -F # show your process in full format
   ps -u $(id -u root) -F # show root process
   ps --user $(id -u) f # list as a tree
   ```

3. view particular process 1,2,

   ```bash
   ps -p 1,2
   ```

4. prints the PIDS of all running python process:

   ```bash
   pgrep python # return only pids
   pgrep -c python # count the process of python
   ```

5. locate processes that match a string

   ```bash
   ps -fwp $(pgrep python)
   ps -fp $(grep python)
   ```

## Controlling Processes

| command | usage                                                     |
| ------- | --------------------------------------------------------- |
| kill    | terminate a process (or send a signal)                    |
| pkill   | terminate processes by name (or send them a singal)       |
| timeout | kill a command that runs for too long                     |
| nice    | invoke a program at a particular priority                 |
| nohup   | run a process that continues after you log out            |
| flock   | ensure that only one instance of a command runs at a time |

1. terminate a process

   ```bash
   kill 13243
   kill -KILL 13243 # send a kill signal 
   kill -9 13243 # equilavent to KILL
   kill $(pgrep emacs) # kill by name
   pkill emacs # kill by name
   ```

2. killed after 3 seconds if still running

   ```bash
   timeout [otpions] seconds command...
   timeout 3 sleep 60 # kill this command after 3 seconds
   ```

3. set a process run at nice level 7

   ```bash
   nice -n 7 sort hugefile > outfile
   renice -n 5 -p 2673 # change a existing process niceness
   ```

4. keep a command running after terminating the shell

   ```bash
   nohup command
   nohup some_long_command & # direct a file `nohup.out` in the pwd
   ```

5. avoid duplicate schedulated tasks using lock method

   If you run automatic backups every hour, there's a slight chance that a previous task might still be running when the next backup launches.

   ```bash
   flock -n /tmp/rsynclock rsync -av dir1 dir2
   ```

## Debugging Process

 you can snoop on the process at a lower level with the `strace`.

**These commands display every system call that a process makes and every signal it receives.**   

You can attach strace or truss to a running process, snoop for a while, and then detach from the process without disturbing it.

```bash
sudo strace -p 5810
strace -e trace=file program # trace file operations only
# Trace a process and filter output by system call
strace -p pid -e system_call,system_call2,... 
```
View more examples of [strace](../commands/strace.md)



## `/proc` 

ps and top read their process status information from the `/proc` directory, a pseudo-filesystem in which the kernel exposes a variety of interesting information about the system’s state.

You can even modify some parameters by writing to the appropriate /proc file. 

You’ll have to `cat` or `less` the contents to see what they actually contain.

| File    | Contents                                                     |
| ------- | ------------------------------------------------------------ |
| cgroup  | The control groups to which the process belongs              |
| cmd     | Command or program the process is executing                  |
| cmdline | Complete command line of the process (null-separated)        |
| environ | The process’s environment variables (null-separated)         |
| fd      | Subdirectory containing links for each open file descriptor  |
| root    | Symbolic link to the process’s root directory (set with chroot) |
| stat    | General process status information (best decoded with ps)    |

The individual components contained within the cmdline and environ files are separated by null characters rather than newlines. You can filter their contents through tr "\000" "\n" to make them more readable.

`man proc` has a comprehensive explanation of its contents.



   