wait for a device and set mode to mtp automatically
```bash
adb wait-for-usb-device
adb shell svc usb setFunction mtp true
```

disable system apps
```bash
# list all apps
adb shell pm list packages
# disable
adb shell pm disable-user com.xxx.xxx
# enable again
adb shell pm enable com.xxx.xxx

# uninstall 
adb shell pm uninstall -k -user 0 com.xxx.xxx
```
