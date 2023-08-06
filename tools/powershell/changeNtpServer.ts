export function genPowershellForChangeNtpServer(httpServerUrl: string) {
  // # restart service won't sync time
  // # Restart-Service w32time -Force
  return `
  # Define the new NTP server address
  $NewNtpServer = "${httpServerUrl}"

  # Modify the NTP server settings in the registry
  Set-ItemProperty -Path "HKLM:\\SYSTEM\\CurrentControlSet\\Services\\W32Time\\Parameters" -Name "NtpServer" -Value $NewNtpServer

  # force resync time
  W32tm /resync /force

  # Display the updated NTP server settings
  $UpdatedNtpServer = Get-ItemPropertyValue -Path "HKLM:\\SYSTEM\\CurrentControlSet\\Services\\W32Time\\Parameters" -Name "NtpServer"

  Write-Host "New NTP server set to: $UpdatedNtpServer"
  `
}

