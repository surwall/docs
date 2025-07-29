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
