vmstat
## System Info

### Uptime

The uptime tells you how long the system has been running.

```bash
uptime
16:07:46 up 3 days,  2:11,  2 users,  load average: 2.17, 2.11, 2.13
```

The information is, from beginning to end:

1. the current time
2. system uptime with hours and minutes (3days, 2hours, 11 mins)
3. number of users logged in
4. system load average for 1 minute
5. system load average for 5 minutes
6. system load average for 15 minutes

The load average is the average number of processes ready to run in that time interval.	

### W Command

The w command displays the current process running in each shell for all logged-in users:

### Top Command

The top command monitors the most active processes, updating at regular intervals(every 3 seconds)

1. display all key stroke (command) `i` or `k`
2. show help `h`
3. kill processes `k`
4. locate processes with a string `L`, search again `&`
5. cancel stroke `Esc`
6. ‘M’ to sort by memory usage
7. ‘P’ to sort by CPU usage
8. ‘N’ to sort by process ID
9. ‘T’ to sort by the running time
10. `q` to quit
11. Listing processes from a user `u` and enter the username

### Task Area

1. "USER" This is the “effective” username

2. "VIRT" total amount of memory consumed by a process

3. “RES” is the memory consumed by the process in RAM

4. “%MEM” expresses this value as a percentage of the total RAM available

5. “SHR” is the amount of memory shared with other processes.

6. **TIME+** the total CPU time used by the process since it started in seconds

#### Filter Process

you can use top’s filtering to focus on a few processes. To activate this mode, press ‘o’/’O’.

You can type a filter expression here.

- `COMMAND=getty`: Filter processes which contain “getty” in the COMMAND attribute.
- `!COMMAND=getty`: Filter processes which do not have “getty” in the COMMAND attribute.
- `%CPU>3.0`: Filter processes which have a CPU utilization of more than 3%.

## Cpu Usage

The CPU usage section shows the percentage of CPU time spent on various tasks. 

1. The `us` value is the time the CPU spends executing processes in userspace. 
2. the `sy` value is the time spent on running kernelspace processes.

You can use `t` to change toggle cpu usage style.

## Memory Usage

The lines marked “Mem” and “Swap” show information about RAM and swap space respectively.

The “avail mem” value is the amount of memory that can be allocated to processes without causing more swapping.

## Free Command

The free command displays total memory use in KB:

```bash
free -h # display in human readable format
```

You best estimate of free RAM is in the `available` column

## Other Useful Commands

   1. get user info

      ```bash
      id  # show uid, gid, groups
      id -u # print effective user id
      id -g # print effective group id
      -G # print all groups Ids the user belongs
      ```

   2. list all logged-in users

      ```bash
      who
      ```

   3. print the current terminal device

      ```bash
      tty
      ```

   4. show a history of logins in reverse chronological order

      ```bash
      last
      ```

   5. View all recorded reboots (boot record)

      ```bash
      last reboot
      ```

   6. prints the name of the current, effective user

      ```bash
      whoami
      sudo whoami # EID is root
      sudo -u tom whoami # EID is tom
      ```

   7. shutdown

      ```bash
      shutdown [options] time [message]
      
      sudo shutdown -h +10 "scheduled maintenance"
      sudo shutdown 0  # shutdown now
      sudo shutdown now # 
      ```

## IO Monitoring
iotop
lsof
		