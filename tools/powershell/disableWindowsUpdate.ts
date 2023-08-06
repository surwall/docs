export function disableWindowsUpdate() {
    return `
# Define the registry path for Windows Update policies
$registryPath = "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows\\WindowsUpdate\\AU"

# Create the registry key for the Windows Update policies (if it doesn't exist)
if (-not (Test-Path $registryPath)) {
    New-Item -Path $registryPath -Force | Out-Null
}

# Set the policy to disable automatic updates and notifications
Set-ItemProperty -Path $registryPath -Name "NoAutoUpdate" -Value 1 -Type DWord
Set-ItemProperty -Path $registryPath -Name "AUOptions" -Value 1 -Type DWord
`
}