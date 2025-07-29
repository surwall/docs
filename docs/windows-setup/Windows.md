## Scripting
[cmd](cmd.md)
[cmd](cmd.md)
[PowerShell](PowerShell.md)
[PowerShell-Scripting](PowerShell-Scripting.md)
[PowerShell Examples](PowerShell%20Examples.md)

- [x] [powershell_reminder](powershell_reminder.md) ✅ 2024-11-02

## GUI
[WinForm](WinForm.md)
[aardio](aardio.md)
[Console-encoding](Console-encoding.md)

[win32 programming](https://learn.microsoft.com/en-us/windows/win32/learnwin32/learn-to-program-for-windows)

[Windows built-in tools compiled](https://caiorss.github.io/C-Cpp-Notes/WindowsAPI-cpp.html#org4652601)

## Docs
[visual studio docs](https://learn.microsoft.com/en-us/visualstudio/windows/?view=vs-2022&preserve-view=true)
[Office](https://learn.microsoft.com/en-us/office/)
[Windows](https://learn.microsoft.com/en-us/windows/)
[Pwsh](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/add-history)
[all docs](https://learn.microsoft.com/en-us/docs/)

## Concepts
[Registry](Registry.md)
[Pre-defined Env](https://learn.microsoft.com/en-us/windows/deployment/usmt/usmt-recognized-environment-variables)

## Setup
[windows-setup](windows-setup.md)
[disk](disk.md)

## Development
[wsl](wsl.md)
[dev-on-windows-wsl2](dev-on-windows-wsl2.md)
[dev-on-windows](dev-on-windows.md)

## Linux
mysy2

## 常见问题
mtp容易卡死
1. 运行ctrl+r services.msc
2. 在“服务”窗口内，依次找到“Device Install Service”和“Device Setup Manager”两个选项

windows开启mDns
```bash
REG ADD "HKLM\Software\Policies\Microsoft\Windows NT\DNSClient" /V "EnableMulticast" /D "0" /T REG_DWORD /F
```


