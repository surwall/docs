---
sidebar_position: 5
---

# powershell reminder

## windows specific 
```powershell
Get-Help default -ShowWindow
```

## help
The available help content may be listed using either of the following two commands:
```powershell
Get-Help -Category All
```

Get-Command may be used to quickly view the syntax for a command, for example, by running the following code: 
```powershell
Get-Command Get-Variable -Syntax
```

The list of help files may be viewed by running Get-Help with the category as HelpFile, as demonstrated in the following code:
```powershell
Get-Help -Category HelpFile
```

## save for offline use
for example, the help content for the DnsClient module can be saved to C:\PSHelp (the directory must already exist):
```powershell
Save-Help -DestinationPath C:\PSHelp -Module DnsClient
```
Alternatively, the help content for all modules may be saved as follows:
```powershell
Save-Help -DestinationPath C:\PSHelp
```

Update-Help        
The Update-Help command can perform two tasks:

1. update **help** files from the internet
2. Import previously saved **help** files

Importing help from a set of saved files uses the SourcePath parameter:
```powershell
Update-Help -SourcePath C:\temp
```

## Command naming and discovery
Commands in PowerShell are formed around verb and noun pairs in the form verb-noun.

### Verbs
The list of verbs that are available in PowerShell can be accessed as follows:
```powershell
Get-Verb
```

### Nouns
A noun provides a very short description of the object the command is expecting to act on. 

### Aliases
The list of aliases may be viewed by using **Get-Alias**, as shown in the following example:
```powershell
Get-Alias dir
Get-Alias -Definition Get-ChildItem
```
% for ForEach-Object
? for Where-Object

New aliases are created with the New-Alias command; for example, we might choose to create an alias named grep for Select-String:
```powershell
New-Alias grep -Value Select-String
```
<u>Each alias exists until the PowerShell session is closed.</u>


## Parameters
### Optional parameters
### Optional positional parameters
### Mandatory parameters
### Mandatory positional parameters
### Switch parameters
As with the other types of parameters, optional use is denoted by square brackets. Switch parameters, by default, are false (not set). If a switch parameter is true (set) by default, it is possible to set the value to false using the notation, as shown in the following code:
```powershell
Get-ChildItem -Recurse:$false
```

### Common parameters
These common parameters are documented inside PowerShell:
```powershell
Get-Help about_CommonParameters
```

### Parameter values
Value types of arguments (the type of value expected by a parameter) are enclosed in angular brackets

Get-Process accepts multiple values for the Name parameter:
```powershell
Get-Process -Name powershell, explorer, smss 
```

### Parameter sets
```powershell
SYNTAX
    Stop-Process [-Id] <Int32[]> [-Confirm] [-Force] [-PassThru] [-WhatIf] [<CommonParameters>]

    Stop-Process [-InputObject] <Process[]> [-Confirm] [-Force] [-PassThru] [-WhatIf] [<CommonParameters>]

    Stop-Process [-Confirm] [-Force] -Name <String[]> [-PassThru] [-WhatIf] [<CommonParameters>] 
```

Get-Command can be used to explore parameters:(Get-Command Stop-Process).Parameters.InputObject.Attributes

### Confirm, WhatIf, and Force
The Confirm, WhatIf, and Force parameters are used with commands that make changes (to files, variables, data, and so on). These parameters are often used with commands that use the verbs Set or Remove, but the parameters are not limited to specific verbs.

Confirm and WhatIf have associated preference variables. Preference variables have an about file, which may be viewed using the following command:
```powershell
Get-Help about_Preference_Variables 
```

#### Confirm parameter
The Confirm parameter causes a command to prompt before an action is taken; for example, the Confirm parameter forces Remove-Item to prompt when a file is to be removed.  

Setting the Confirm parameter to false for Clear-RecycleBin will bypass the prompt and immediately empty the recycle bin:
```powershell
Clear-RecycleBin -Confirm:$false 
```

#### ConfirmPreference
If the Confirm parameter is not set, whether or not a prompt is shown is determined by PowerShell. The value of the ConfirmPreference variable is compared with the stated impact of a command.

By default, commands have a medium impact.
ConfirmPreference has four possible values:

| Value  | Effect                                                    |
| ------ | --------------------------------------------------------- |
| High   | Prompts when command impact is `High` (default)           |
| Medium | Prompts when command impact is `Medium` or `High`         |
| Low    | Prompts when command impact is `Low`, `Medium`, or `High` |
| None   | Never prompts                                             |

#### WhatIf parameter
The WhatIf parameter replaces the confirmation prompt with a simple statement that should state what would have been done, using Remove-Item as an example again:
If both Confirm and WhatIf are used with a command, WhatIf takes precedence.

#### WhatIfPreference
The WhatIfPreference variable holds a Boolean value (true or false) and has a default value of false
If the preference variable is set to true, all commands that support WhatIf will act as if the parameter is explicitly set. A new value may be set for the variable, as shown in the following code:
```powershell
$WhatIfPreference = $true 
```

#### Force parameter
1. With the Force parameter, New-Item will overwrite any existing file with the same path. 
2. When used with Remove-Item, the Force parameter allows the removal of files with Hidden or System attributes.
3. Adding the Force parameter allows the operation to continue without the error message


## Providers
A provider in PowerShell is an interface that allows file system like access to a datastore. There are a number of built-in providers in PowerShell.
```powershell
Get-PSProvider
```

The actual drives that these providers use to expose their datastore can be determined with the Get-PSDrive cmdlet. The Get-PSDrive cmdlet not only displays drives exposed by providers, but it also displays Windows logical drives including drives mapped to network shares.
```powershell
Get-PSDrive # The output from Get-PSProvider shows that each provider has one or more drives associated with it.
```

PSDrives can be accessed just like a traditional file system.
```powershell
Get-ChildItem -Path Cert:\LocalMachine\CA
```

A similar approach may be taken to access the registry. By default, drives are available for the current user HKCU and local machine HKLM hives. Accessing HKEY_USERS is possible by adding a new drive with the following command:
```powershell
New-PSDrive HKU -PSProvider Registry -Root HKEY_USERS 
```
After running the preceding command, a new drive may be used:
```powershell
Get-ChildItem HKU:
```

## Introduction to splatting
Splatting is a way of defining the parameters of a command before calling the command.
Splatting is a method of passing a collection of parameter values to a command as a unit. PowerShell associates each value in the collection with a command parameter. Splatted parameter values are stored in named splatting variables, which look like standard variables, but begin with an At symbol (@) instead of a dollar sign ($). The At symbol tells PowerShell that you are passing a collection of values, instead of a single value.

To provide parameter values for positional parameters, in which parameter names are not required, use the array syntax. To provide parameter name and value pairs, use the hash table syntax. The splatted value can appear anywhere in the parameter list.

The @ sign is like the ... in js or * in python, spread out all the parameters in the hashtable(dictionary).

```powershell
$getProcess = @{
    Name = 'explorer'
}
Get-Process @getProcess
```
### Splatting to avoid escaped end-of-line
It is possible to spread the command out, in an attempt to make it easier to read, by escaping the end-of-line character, for example:
```powershell
$taskAction = New-ScheduledTaskAction -Execute pwsh.exe `
                                      -Argument 'Write-Host "hello world"'
$taskTrigger = New-ScheduledTaskTrigger -Daily `
                                        -At '00:00:00'
Register-ScheduledTask -TaskName 'TaskName' `
                       -Action $taskAction `
                       -Trigger $taskTrigger `
                       -RunLevel 'Limited' `
                       -Description 'This line is too long to read'
```

Splatting provides a neater, generally easier to read and more robust alternative. The following example shows one possible way to tackle these commands when using splatting:
```powershell
$newTaskAction = @{
    Execute = 'pwsh.exe'
    Argument = 'Write-Host "hello world"'
}
$newTaskTrigger = @{
    Daily = $true               # Note: Switch parameters may be treated as if they are Boolean when splatting. like `Confirm = $true`
    At    = '00:00:00'
}
$registerTask = @{
    TaskName    = 'TaskName'
    Action      = New-ScheduledTaskAction @newTaskAction
    Trigger     = New-ScheduledTaskTrigger @newTaskTrigger
    RunLevel    = 'Limited'
    Description = 'Splatting is easy to read'
}
Register-ScheduledTask @registerTask
```

### splatting and positional parameters
It is possible to splat positional parameters
```powershell
Rename-Item oldname.txt newname.txt
$renameItem = 'oldname.txt', 'newname.txt'
Rename-Item @renameItem
```

## Modules

A module may be binary, script, dynamic, or manifest:
1. Binary modules: These are written in a language such as C# or VB.NET, and then compiled into a dynamic-link library (DLL).
2. Script modules: These are a collection of functions written in the PowerShell language. The commands typically reside in a script module file (PSM1)
3. Dynamic modules: These are created using the New-Module command and exists in memory only.
4. Manifest modules: These combines different items to make a single consistent module.

### The Get-Module command
The Microsoft Windows comes with a wdie variety of modules installed.
By default, Get-Module shows modules that have been imported (either automatically or using Import-Module);

The ListAvailable parameter shows the list of modules that have been loaded, as well as those PowerShell discovers:
```powershell
Get-Module -ListAvailable
```

$env:PSMODULEPATH determines where both Windows PowerShell and PowerShell Core find modules when running Get-Module and Import-Module. The source of this variable is different for each version, and is explored here.

### The Import-Module command
Modules in PowerShell may be explicitly imported using the Import-Module command. Modules may be imported using a name or with a full path, as shown in the following example:
```powershell
Import-Module -Name PSWorkflow 
Import-Module -Name C:\Windows\System32\WindowsPowerShell\v1.0\Modules\PSWorkflow\PSWorkflow.psd1 
```

Once a module has been imported, the commands within the module may be listed using Get-Command as follows:
```powershell
Get-Command -Module PSWorkflow
```

### The Remove-Module command
Remove-Module does not remove or delete the files that make up a module from a computer.

### The Find-Module command
The Find-Module command allows you to search the PowerShell Gallery or any other registered repository for modules.
```powershell
Find-Module Carbon 
Find-Module -Name Carbon 
Find-Module -Name Azure* 
```
Supplying a value for the Filter parameter is equivalent to using the search field in the PowerShell Gallery that expands the search to include tags:
```powershell
Find-Module -Filter IIS
```

### The Install-Module command
The Install-Module command installs or updates modules from the PowerShell Gallery or any other configured repository.
For example, the posh-gitmodule may be installed using either of the following two commands:
```powershell
Find-Module posh-git | Install-Module 
Install-Module posh-git 
```

Modules may be installed under a user-specific path ($home\Documents\WindowsPowerShell\Modules) using the Scope parameter:
```powershell
Install-Module carbon -Scope CurrentUser
```

### The Update-Module command
it will attempt to update the module to the latest, or specified, version.

### The Save-Module command
The Save-Module command downloads the module from the PowerShell Gallery to a given path without installing it. 
```powershell
Save-Module -Name Carbon -Path C:\Modules
```

## Pipeline
The pipeline is used to send output from one command (standard out or Stdout) into another command (standard in or Stdin).
### Standard Output
The term standard output is used because there are different kinds of output. Each of these different forms of output is referred to as a stream.
When assigning the output of a command to a variable, the values are taken from the standard output (the output stream) of a command. For example, the following command assigns the data from the standard output to a variable:
```powershell
$stdout = Get-CimInstance -ClassName Win32_ComputerSystem 
```

### Non-standard output
In PowerShell there are other output streams; these include error (Write-Error), information (Write-Information, introduced in PowerShell 5), warning (Write-Warning), and verbose (Write-Verbose). Each of these has a stream of its own.
In PowerShell 5 and later, the Write-Host command sends output to the information stream.

### The object pipeline
powershell send objects from one command to another
The pipe (|) symbol is used to send the standard output between commands.
the output of Get-Process is sent to the Where-Object command, which applies a filter.
```powershell
Get-Process | Where-Object WorkingSet -gt 50MB 
```

## Members
### The Get-Member command
The Get-Member command is used to view the different members of an object. For example, it can be used to list all of the members of a process object (returned by Get-Process):
```powershell
Get-Process -Id $PID | Get-Member 
Get-Process -Id $PID | Get-Member -MemberType Property
```

### Accessing properties
```powershell
$process = Get-Process -Id $PID 
$process.Name 
(Get-Process -Id $PID).Name
```

Properties of an object are objects themselves. For example, the StartTime property of a process is a DateTime object. We may access the DayOfWeek property by using the following code:
```powershell
$process = Get-Process -Id $PID 
$process.StartTime.DayOfWeek 
(Get-Process -Id $PID).StartTime.DayOfWeek 

$object = [PSCustomObject]@{ 'Some Name' = 'Value' } 
$object."Some Name" 
$object.'Some Name' 
$object.{Some Name}

$propertyName = 'Some Name'
$object.$propertyName
```

### Using Methods
If a method expects to have arguments (or parameters), the notation becomes the following:
`<Object>.Method(Argument1, Argument2) `

When the method is called without parentheses, PowerShell will show the overload definitions. The overload definitions are a list of the different sets of arguments that can be used with a method.
```powershell
'thisString'.Substring
```

An example of a method that changes a state might be a TCP socket. TCP connections must be opened before data can be sent over a network:
```powershell
$tcpClient = New-Object System.Net.Sockets.TcpClient
$tcpClient.Connect("127.0.0.1", 135)
$tcpClient.Connected # return True
$tcpClient.Close()

# get-date can be used to create a DateTime object
(Get-Date).ToString('u') # 2016-12-08 21:18:49Z
Get-Date -Format u
(Get-Date).Date.AddDays(-1).ToString('u')
```
### Access Modifiers
Depending on the type of object, properties may be read-only or read/write. These may be identified using Get-Member and by inspecting the access modifiers.
```powershell
$File = New-Item NewFile.txt -Force
$File | Get-Member -MemberType Property

$File.Name = 'NewName'
$File.CreationTime = Get-Date -Day 1 -Month 2 -Year 1692
Get-Item NewFile.txt | Select-Object -ExpandProperty CreationTime
```

### The Add-Member command
```powershell
$empty = New-Object Object
$empty | Add-Member -Name New -Value 'Hello world' -MemberType NoteProperty
$empty
```
To add calculated properties, which are evaluated when viewed, use the following code:
```powershell
$empty=New-Object Object
$empty|Add-Member -Name New -Value 'Hello world'-MemberType NoteProperty
$empty|Add-Member -Name Calculated -Value { $this.New.Length } -MemberType ScriptProperty # better than using a function
$empty

# Methods may be added as well, for example, 
$empty=New-Object Object
$empty | Add-Member -Name New -Value 'Hello world'-MemberType NoteProperty
$params=@{
    Name='Replace'
    MemberType='ScriptMethod'
    Value= { $this.New-replace'world','everyone' }
}
$empty | Add-Member @params
$empty.Replace()
```

## Enumerating and filtering
```powershell
$drives = Get-PSDrive
$drives
```

### The ForEach-Object command
ForEach-Object is most often used as a loop (of sorts). For example, the following command works on each of the results from Get-Process in turn:
```powershell
Get-Process | ForEach-Object { 
    Write-Host $_.Name -ForegroundColor Green 
}
```
In the preceding example, a special variable, $_, is used to access each of the objects from the input pipeline. 
ForEach-Object may also be used to get a single property, or execute a single method on each of the objects.
```powershell
Get-Process | ForEach-Object Path
(Get-Date '01/01/2019'), (Get-Date '01/01/2020') | ForEach-Object ToString('yyyyMMdd')
```

### Where-Object command
Filtering the output from commands may be performed using Where-Object.
```powershell
Get-Process | Where-Object StartTime -gt (Get-Date 17:00:00)
Get-Process | Where-Object -Property StartTime -Value (Get-Date 17:00:00) -gt 
```

Where-Object will also accept filters using the FilterScript parameter. FilterScript is often used to describe more complex filters, filters where more than one term is used:
```powershell
Get-Service | Where-Object { $_.StartType -eq 'Manual' -and $_.Status -eq 'Running' }
```
When a filter like this is used, the conditions are evaluated in the order they are written. This can be used to avoid conditions that may otherwise cause errors. 


## Selecting and sorting
### The Select-Object command
Select-Object allows a subset of data to be returned when executing a command. This may be a more restrictive number of elements, or a smaller number of properties.
```powershell
Get-Process | Select-Object -Property Name, Id
Get-Process | Select-Object -Property * -Exclude *Memory*
Get-ChildItem C:\ -Recurse | Select-Object -First 2
Get-ChildItem C:\ | Select-Object -Last 3
Get-ChildItem C:\ | Select-Object -Skip 4 -First 1
Get-ChildItem C:\ | Select-Object -Skip 2 -Last 1  # Skip items at the end. This example returns the third from the end:
Get-ChildItem C:\ | Select-Object -ExpandProperty FullName
Get-ChildItem $env:SYSTEMROOT\*.dll | Select-Object Name, Length -ExpandProperty VersionInfo
1, 1, 1, 3, 5, 2, 2, 4 | Select-Object -Unique

(1..3 + 1..3) | ForEach-Object { [PSCustomObject]@{ Number = $_ } }

(1..3 + 1..3) |
    ForEach-Object { [PSCustomObject]@{ Number = $_ } } |
    Select-Object -Property * -Unique

# It will build a property if given a name and a means of calculating it (an expression):
Get-Process | Select-Object -Property Name, Id, 
    @{Name='FileOwner'; Expression={ (Get-Acl $_.Path).Owner }}
```

### The Sort-Object command
The Sort-Object command allows objects to be sorted on one or more properties.
```powershell
5, 4, 3, 2, 1 | Sort-Object # by default, it will sort numbers in ascending order
'ccc', 'BBB', 'aaa' | Sort-Object
# sort based on id
Get-Process | Sort-Object -Property Id
Get-ChildItem C:\Windows\System32 | 
    Sort-Object LastWriteTime, Name
```

## Grouping and measuring
### The Group-Object command
```powershell
6, 7, 7, 8, 8, 8 | Group-Object
6, 7, 7, 8, 8, 8 | Group-Object -NoElement


Get-ChildItem C:\Windows\Assembly -Filter *.dll -Recurse | 
    Group-Object Name

Get-ChildItem C:\Windows\Assembly -Filter *.dll -Recurse |
    Group-Object Name -NoElement |
    Where-Object Count -gt 1 |
    Sort-Object Count, Name -Descending |
    Select-Object Name, Count -First 5
```

### The Measure-Object command
When used without any parameters, Measure-Object will return a value for Count, which is the number of items passed in using the pipeline, for example:
```powershell
1, 5, 9, 79 | Measure-Object
1, 5, 9, 79 | Measure-Object -Sum
1, 5, 9, 79 | Measure-Object -Average -Maximum -Minimum -Sum
Get-Process | Measure-Object WorkingSet -Average # the value for property is filled in
Get-Content C:\Windows\WindowsUpdate.log | Measure-Object -Line -Word -Character
```

<!-- todo operator -->

## Variables
### variable declaration
```powershell
$123 # these are valid name 
$x 
$my_variable 
$variable 
$varIABle 
$Path_To_File 
${My Variable} 
${My-Variable}
```

One of the most commonly accepted practices is that variables used as parameters must use Pascal case. Variables used only within a script or a function must use camel case.

The following notation, where a file path is written as the variable name, allows variables to be stored on the filesystem:
```powershell
${C:\Windows\Temp\variable.txt} = "New value"
$itemCount = 7  # a variable doesn't need to be assigned a specific type
$dateFormat = "ddMMyyyy" 
$numbers = @(1, 9, 5, 2) 
$psProcess = Get-Process -Name PowerShell 
$i = $j = 0
```

### variable commands
```powershell
$temporaryValue = "Some-Value" # removes the value from any existing variable
Write-Host $temporaryValue -ForegroundColor Green
Clear-Variable temporaryValue

Get-Variable | Select-Object Name, Description # access to any variable that has been created in the current session
# as well as the default (automatic) variables created by PowerShell. 

New-Variable -Name today -Value (Get-Date) # create a new variable
$today = Get-Date # equivalent wit above
New-Variable -Name startTime -Value (Get-Date) -Option Constant  # create a constant

$psProcesses = Get-Process powershell  #  destroys a variable and any data it may hold.
Remove-Variable psProcesses 
# Private scope Private scope is accessible using $private:objectCount. The Set variable may be used but is not required.
Set-Variable objectCount -Option Private 
```






