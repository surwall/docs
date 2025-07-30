## A Simple Daemon for Server
```ini
[Unit]
Description=Some simple Service

[Service]
Type=Simple
ExecStart=/usr/bin/xxx -args
Restart=Always

[Install]
WantedBy=multi-user.target
```
In this example, the `Restart=always` directive ensures that the service will be automatically restarted if it terminates for any reason.

## A Simple Daemon for Desktop
Change `WantedBy` to `After=network.target`

## A http daemon
```ini
[Unit]
Description=Some simple Service
After=network.target

[Service]
Type=Simple
ExecStart=/usr/bin/xxx -args
Restart=Always

[Install]
WantedBy=multi-user.target
```
