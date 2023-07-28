# Self Host Services

## Vs Code Server
Self host a vs code server on linux.
Download this [file](https://update.code.visualstudio.com/latest/server-linux-x64-web/stable)
Unzip it and place it under `/usr/local`.
Create a systemd service for it.
1. Create the systemd Service Unit File
```bash
sudo nano /etc/systemd/system/code-server.service
```
2. Add the Service Configuration:

```bash
[Unit]
Description=VS Code Server

[Service]
# User=your_username  # Replace "your_username" with your actual username, without it will use root
ExecStart=/usr/local/vscode-server-linux-x64-web/bin/code-server --port 9999 --without-connection-token --accept-server-license-terms
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
```

3. Reload systemd and Enable the Service:

```bash
sudo systemctl daemon-reload
sudo systemctl enable code-server
sudo systemctl start code-server
```

