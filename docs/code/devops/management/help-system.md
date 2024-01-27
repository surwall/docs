---
sidebar_position: 1
---

# Help System

One can't really remember all commands, even so, one can forget the nitty-gritty of it.  Thus, in modern societies, one can't truly rely on their own, we're destined to ask for help. 



## Linux

The most notorious help system is the man page manual. Man pages are divided into sections, such as Section 1 for user commands, Section 2 for system calls, and so on. To view a man page, you can use the `man` command followed by the name of the command or topic. For example, to see the man page for the `ls` command, you would run `man ls`.

### Man Page Manual

You many encounter situations that a command have different meaning. In that case, man have different sections for that. For instance, `printf` is available both as a user command(Section 1) and as a C library function(Section 3). To access different sections you use the following format:

```bash
man [section_number] command_or_topic
```

```bash
man 1 printf
man 3 printf
```

Normally, at the end of each man page, there's a section called "SEE ALSO". This provides references to related man pages. We can check that to ensure we are not reading the wrong section.

- Section 1: User commands (e.g., ls, cp, grep)
- Section 2: System calls (e.g., open, read, write)
- Section 3: Library functions (e.g., printf, malloc, fopen)
- Section 4: Special files (e.g., device files, configuration files)
- Section 5: File formats and conventions (e.g., passwd, fstab, hosts)
- Section 6: Games and demos
- Section 7: Miscellaneous (e.g., macro packages, standards)
- Section 8: System administration commands (e.g., mount, fdisk, reboot)



### Command Specific Help 

You can type `--help` for almost all commands. Some commands have specific help that provides additional details about their usage, such as `-h`.

### forget a specific command
You can use the `apropos` command to search for commands or topics related to a specific keyword.
It's particularly useful when you remember a general concept or keyword but can't recall the exact command name. This command will search through the manual pages' short descriptions and displays a list of relevant commands or topics.
```bash
apropos partition
```
This will list various commands which contains 'partition' in its description, such as 'fdisk', 'parted', 'gparted', and others. 


## Windows

In Windows, we have two environments: Command-Line and GUI. 

### Command-Line Help (Help Command)
For CMD, use see a specific command by 
```bash
help dir
```
For PowerShell, we use
```powershell
Get-Help Get-ChildItem
Get-Help Get-ChildItem -online # see online documentation
```

Many standard Windows commands and utilities provide built-in help that you can access through the Command Prompt (CMD) using the `/?` or `-?` option. For example:

```bash
command_name /?
:: or
command_name -?
```

 In older versions of Windows and some older Windows programs, the convention for specifying command-line options was to use a single forward slash `/` followed by the option letter or word. This is different from the Linux-style convention, which uses a single hyphen `-` followed by the option letter or a double hyphen `--` followed by the option word.

For example, in older Windows programs, you might see command-line options specified like this:  	

```bash
program_name /option
```

On the other hand, in Linux and many modern Windows programs, the convention is to use hyphen-style options.

### Context-Sensitive Help

For some applications and tools, pressing the F1 key while focused on a specific feature or window will open context-sensitive help specific to that area. 

