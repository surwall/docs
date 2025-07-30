## WIFI

If NetworkManager is installed, we can use it to connect wifi. 
>[!tip]
>We can use `nmcli` to configure it, as an alternative, use `nmtui`

1. make sure wireless card is installed
   ```bash
   nmcli dev
   ```

2. start the WIFI device

   ```bash
   sudo nmcli radio wifi on
   sudo nmcli radio wifi off # close the wifi
   ```

3. Scan Surrounding WiFi Hotspots

   ```bash
   sudo nmcli dev wifi
   ```

4. Connect to WiFi Hotspot

   ```bash
   nmcli dev wifi connect "SSID" password "PASSWORD"
   nmcli dev wifi connect "SSID" # connect a previous wifi
   ```

