---
sidebar_position: 3
---


## Script Writing

To write and execute a script. You write a script ends with `ps1` extension. You can use the following ways to run:

```powershell
./script.ps1
. ./script.ps1 # run in the current shell
& ./script.ps1
iex ./script.ps1
Invoke-Expression ./script.ps1
```

The first one is no brainer. We treat it as a command. The second is little different. It run the script in the current environment, so all the declared function and variable will remain in the current shell. This is really useful to refresh your profile like `. ~/.bashrc` in Bash. 

```powershell
. $PROFILE # user profile
. $PROFILE.AllUsersAllHosts
```

The third one is using a call operator `&`. This operator can run a command, script, or script block. The call operator, also known as the "invocation operator", lets you run commands that are stored in variables and represented by strings or script blocks. The call operator executes in a child [scope](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_scopes?view=powershell-7.4).

### Get Script Parameters
Script arguments can get from $args arrary, $arg[0] would be first parameter.
Note that first parameter doesn't include the command, to get command name or path use the following
```bash
$name = [System.IO.Path]::GetFileNameWithoutExtension($MyInvocation.MyCommand.Path)
```

## Flow Controls

### The If Statement

The structure for IF statement is the following:

```powershell
if (condition) {
	# code to run
} elseif (condition) {
} else {}
```

Note that condition should be any expression evaluate to true just like other languages. Clearly you can use compare operators to achieve that, albeit different. The operators are just like in Bash: `-eq`, `-ne`, `-gt`, `-ge`, `-lt` and `-le`. It also has a `-contains` that returns true if the second value is "in" the first value. You can use this to determine whether a value is inside an array.

```powershell
1 -eq 1
if (Test-Connection -Quiet -Count 1 www.baidu.com) {
	echo "ping successfully"
} else {
	echo "ping failed"
}
```

> [!NOTE]
>
> The second statement is valid because the expression will return a bool, so if structure operate depending on its value. 

The `-not` operator can also be used to negate the bool.

```powershell
if (-not (Test-Connection -Quiet -Count 1 www.bogusxxx.com)) {
	Write-Error -Message "The server is not responding"
}
```

### The Switch Statement

```powershell
switch (expression) {
	expressionValue {
		# do something
	}
	expressionValue2 {
		# do something
	}
	default {
		# default behavior
	}
}
```

### Loops - Three Styles

```powershell
$servers = @('SRV1', 'SRV2', 'SRV3', 'SRV4', 'SRV5')

# foreach style
foreach ($server in $servers) {
	Write-Host $server
}

# c style loop
for ($i = 0; $i -lt 10; $i++) {
	$i
}

# The forEach-Object cmdlet
ForEach-Object -INputObject $servers -Process {
	echo $_
}

# foreach method
$servers.foreach({
	echo $_.length
})
```

The final type of loop accepts a scriptblock parameter, it's just like a callback function. In that script block, `$_` will refer to the current iteration's object. The last type is considerably faster than the other two. 

### While and Do while

```powershell
$counter = 0
while ($counter -lt 0) {
	$counter
	$counter++
}


do {

} while ($true)
```

## Command Style

As you use `get-command` to list all the available commands, you observe that all that follow the same convention, verb-noun, as you write your own cmdlets or functions. It is best to follow this convention. You can use the `Get-Verb` command to see a list of recommended verbs. The noun is typically the singular name of whatever entity you're working with, for example, software, disk, or host.

## Functions

The Functions should follow the Verb-Noun Syntax just like cmdlets. 

```powershell
# witout params
function Install-Software {
	param($param1, $param2) # all params are string
}

# with parameters
function Install-Software {
	param(
		[Parameter(Mandatory)] # add restrictions on this parameter, optional
		[string] $Version, # use commans to separate parameters
		[string]$ComputerName = 'localhost' # default value
	)
	
	Write-Host 'install software'
}
```

## Cmdlet Functions

Turning a function in PowerShell into a cmdlet is very easy. In other words, turning a function into a cmdlet, make it **capable of accepting pipeline values**.
We first write a simple function.

```powershell
function Test-MrParameter {
    param (
        $ComputerName
    )
    
    Write-Output $ComputerName
}

Get-Command -Name Test-MrParameter -Syntax # test it doesn't have common parameters
```

To turn it into an advanced function:

```powershell
function Test-MrCmdletBinding {
	[CmdletBinding()] #<<-- This turns a regular function into an advanced function
    param ( # param block is required even no parameter
        $ComputerName,$param2
    )
	Write-Output $ComputerName
}

Get-Command -Name Test-MrCmdletBinding -Syntax

# Test-MrCmdletBinding [[-ComputerName] <Object>] [<CommonParameters>]
# it has common parameters
```

### Making the Function Pipeline Compatible

```powershell
# making the function pipeline compatible
function Install-Software {
	[CmdletBinding()]
	param(
		[Parameter(Mandatory)]
		[string]$Version
		[ValidateSet('1', '2')] # only allow certain value
		
		[Parameter(Mandatory, ValueFromPipeline)]
		[string]$ComputerName
	)
	process {
		Write-Host 
	}
}
```

> [!Warning]
>
> Recall that pipeline pipe object one at a time, if you are accepting a list of objects, you should put your code in the process code block. It will execute each time an object passed in. If you're only accepting a single value as input, a `process` block isn't necessary, but I still recommend specifying it for consistency.

## Error Handling

There are two types of errors: terminating errors and non-terminating errors. By default, all operations only throw non-terminating errors, which means the script will keep running. To alter the behavior, you can change the `$ErrorActionPreference` to `Stop` to turn all errors into terminating errors. or You can Specify the **ErrorAction** parameter with **Stop** as the value to turn a non-terminating error into a terminating one.

```powershell
function Test-MrErrorHandling {

    [CmdletBinding()]
    param (
        [Parameter(Mandatory,
            ValueFromPipeline,
            ValueFromPipelineByPropertyName)]
        [string[]]$ComputerName
    )
    
    PROCESS {
        foreach ($Computer in $ComputerName) {
            try {
                Test-WSMan -ComputerName $Computer -ErrorAction Stop
            }
            catch {
                Write-Warning -Message "Unable to connect to Computer: $Computer"
            }
        }
    }
}
```

We use `try catch` block to catch those errors, note that `try catch` can only catch terminating errors. If not, `catch` will not execute when throwing a non-terminating error. 

