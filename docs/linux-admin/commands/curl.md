# Curl

Curl is a tool to transfer data to and from a server, supporting HTTP, FTP, IMAP and more.  

## Web browsing

* Fetch only HTTP headers

  ```bash
  curl --head http://www.baidu.com
  curl -I http://www.baidu.com
  ```

* Fetch with headers

  ```bash
  curl --include http://www.baidu.com
  curl -i http://www.baidu.com
  ```

* Fetch with all headers (including request headers)

  ```bash
  curl --include --verbose http://www.baidu.com
  curl -iv http://www.baidu.com
  ```

* Redirect query if the response is 3xx

  ```bash
  curl -L baike.com
  ```

## Downloading files

* Download a file without changing its name

  ```bash
  curl --remote-name http://mirrors.tuna.tsinghua.edu.cn/debian/README
  ```

* Rename the file

  ```bash
  curl http://mirrors.tuna.tsinghua.edu.cn/debian/README -o foo.md
  ```

* Download a sequence of files

  ```bash
  curl "http://{foo.bar}.com/file_[1-4]./webp" --output "file_#1.html"
  ```

* change the user agent

  ```bash
  curl -A "user-agent-name-here" [URL]
  ```

## API interaction

* Send data (URL-Encoded form)

  By default, when you send data, it will use **POST** method and use the content-type `application/x-www-form-urlencoded`. If that header is not what you want, you can POST JSON to a server. When reading from a file, `-d` will strip out carriage return and newlines. Use `--data-binary` if you wanna avoid that behavior. 

  ```bash
  curl --data name=admin -d shoesize=12 http://example.com
  curl -d "name=admin&shoesize=12" http://example.com
  curl -d @filename http://example.com
  curl --data-binary @filename http://example.
  ```

* Send form data (uses the @ syntax)

  Note that the file normally is assigned with key "file" in the Formdata. 

  ```bash
  curl --form "username=seth" --form "password=123456" \
  "https://example.com/api/v4/endpoint"
  curl --form "profile=@me.jpg" "https://example.com/api/v4/endpoint"
  curl -F file=@"C:\Program Files\Cisco Packet Tracer 8.0\bin\minizip.exe" \
  localhost:3000/api/upload
  ```

* Specify HTTP method

  ```bash
  curl --request POST --data "Foo: bar" "https://example.com/api/endpoint"
  curl -X POST -d "Foo: bar" "https://example.com/api/endpoint"
  ```

* Send HTTP header data

  ```bash
  curl --header "Authorization: Bearer F66eD5ffXHp2Y" \
  "https://example.com/api/v4/endpoint"
  ```

* Switch "POST" to "GET"

  It would be suitable to take all data you specified with the `-d` and appends that data on the right end of the URL separated with a "?" and then makes curl send a GET instead.  

  ```bash
  curl -Gd name=xcy http://localhost:3000/api/get
  curl -d name=xcy --get http://localhost:3000/api/get
  curl -d name=xcy -d age=32 --get http://localhost:3000/api/get
  ```

## Use Cookie

* Save cookies

  ```bash
  curl -c cookies.txt http://example.com
  ```

* Read cookie from a file

  ```bash
  curl -b cookies.txt http://example.com
  ```