# Softwares

## Installation

### Linking

For programs used in the terminal, we could add its parent directory in the path. But doing so is really tedious. To that end, we normally specify a bin directory to add it into the path, and use soft links to link the target executables. 

1. Windows

```powershell
New-Item -ItemType SymbolicLink -Path C:\bin\typora -Target \
"C:\Program Files\Typora\Typora.exe"
```

2. Linux[TODO]



## Configuration



## Removal

