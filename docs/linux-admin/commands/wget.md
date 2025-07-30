# Wget

Wget is a download utility available almost in every Linux distros. 

## Download a file

### Basic

To download the file "file.txt" and save it to file "myfile.txt", use the command:  

```bash
wget -O myfile.txt https://example.com/file.txt
```

### retry multiple times 

To specify that wget should try to download a file 5 times before giving up and to specify that wget should wait 10 seconds between retries.

```bash
wget -t 5 https://example.com/file.txt
wget -w 10 https://example.com/file.txt
```

### With additional Info

```bash
wget -d http://www.baidu.com
wget --debug http://www.baidu.com
```

## Mirror a Site

```bash
wget -mpEk "url"
```

* **-m:** Mirror mode
* **-p:** Download all necessary files for HTML pages
* **-E:** Convert HTML pages to other formats
* **-k:** Specify the format to which HTML pages should be converted