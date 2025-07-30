---
sidebar_position: 2
---

## Accepting params

Params are stored in `$args`.

```powershell
script.ps1 foo bar
$args[0] # foo
$args[1] # bar
```

## validate 

```powershell
# Validate input arguments
if ($args.Count -eq 0) {
    Write-Error "Usage: .\ConvertVideo.ps1 <VideoFilePath>"
    exit 1
}

$inputVideoPath = $args[0]

# Check if the input file exists
if (-not (Test-Path $inputVideoPath)) {
    Write-Error "The specified video file does not exist: $inputVideoPath"
    exit 1
}
```

## Test path

```powershell
if(-not (Test-Path -LiteralPath $args[0])) {
    Write-Error "path doesn't exist"
    exit
}

$path = Get-Item -LiteralPath $args[0]
```

### foreach
In Javascript, we have something like `map()`, `.foreach()`. To do that here, we can use pipelines.
```pwsh
Get-ChildItem -recursive | Foreach-object { rename-item -path $_.fullname -newname ($_.name.tolower())}
```

The left side command of the pipeline passes a list of objects, and the right side command process each object with the block script.  
Note that we can use `%` as a shortcut to foreach-object, so the code is
```pwsh
ls | % { Rename-Item $_ ($_.Name.ToLower()) }
```