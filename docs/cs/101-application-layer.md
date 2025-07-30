# Application Layer

## Overview

At the core of network application development is writing programs that run on different end systems and communicate with each other over the network. Thus, different end systems should communicate with each other through a common protocol. An application layer is only one piece of a network application. For example. for a typical video streaming service, it not only has the application-level DASH protocol but also the other logics in the client and server applications.



## The Web and HTTP

The HTTP is at the heart of the Web. It is defined in [RFC 1945], [RFC 7230] and [RFC 7540]. The HTTP is implemented in two programs: a client program and a server program. They talk to each other by exchanging HTTP messages. The format of it is listed below: 

### HTTP Message Format

![](https://developer.mozilla.org/en-US/docs/Web/HTTP/Messages/httpmsgstructure2.png)

The first line and the empty line are mandatory, and the header lines and entity body are optional. Each line is separated by additional carriage return and line feed. (`\r\n`), that also includes the empty line. 

### HTTP Authentication

HTTP defines a simple framework for access authentication schemes. The assumption is that a certain group of pages -- usually referred to as a protected realm or just a realm -- should only be accessible to certain people who are able to provide credentials if challenged by the server. 

If an HTTP client, e.g. a web browser, request a page that is part of a protected realm, the server responds with a 401 Unauthorized status code and includes a WWW-Authenticate header field in his response. The value in that header line should provides one authentication challenge. 

We will describe the most common authentication scheme, Basic Access Authentication. The server's 401 response contains an authentication challenge consisting of the token "Basic" and a name-value pair specifying the name of protected realm. Example: `WWW-Authenticate: Basic realm="wireshark-students only"\r\n`

Upon receipt of the server's 401 response, your web browser prompts you for the username and password. The Authentication header of your browser's follow-up request again contains the token "Basic" and the base64-encoded concatenation of the username, a colon, and the password. 

`Authorization: Basic d2lyZXNoYXJrLXN0dWRlbnRzOm5ldHdvcms=\r\n`  

(The base64 is decoded as `wireshark-students:network`)

The server base64-decodes the credentials and compares them against his username-password database. If it finds a match, you are in.

### HTTP2 (TODO)



## Electronic Mail

Electronic mail has been around since the dawn of the Internet. The Internet Mail System actually consists of three components: **user agents**, **mail servers**, and the **Simple Mail Transfer Protocol(SMTP)**. 

![](assets/smtp_works.svg)

If Alice decides to send a email to Bob. She would open up her mail client, compose her email. After that, she clicks "send" button. The mail will be transferred to Alice's mail server first, then that server will connect to bob's server using SMTP to transfer that email. As Bob's mail server receive all the email, it will categorize it and put each email in their separate mailbox. When Bob's mail client periodically requests his mail server so as to check new coming mails, the server will then send the Alice's mail to Bob. If Alice's server cannot deliver mail to Bob's server, Alice's server holds the message in the message queue and attempts to transfer the message later. 



## DNS

DNS in short is a translation service that translate hostnames into IP addresses. However, it is not practical to put all the records in one database. In that sense, the DNS use a large number of servers to store those records. No single DNS has all the mappings for all the hosts in the Internet. The DNS servers is origanized as such:   

```mermaid
flowchart TD
root[Root DNS servers] --> com[com DNS servers]
root --> edu[edu DNS servers]
root --> org[org DNS servers]
com --> facebook
com --> amazon
org --> pbs.org
edu --> nyu.edu
edu --> umass.edu
```

Every organization with publicly accessible hosts on the Internet must provide publicly accessible DNS records that map the names of those hosts to IP addresses.  An organization's  authoritative DNS server houses those records. An organization can choose to implement its own authorization DNS server to hold these records; alternatively, it can pay to have these records stored in an authoritative DNS server of some service provider. Large companies implement and maintain their own primary and secondary (backup) authoritative DNS server.

There's a special type of DNS server called the local DNS server. It does not strictly belong to the hierarchy of servers. As your host connects to an ISP, the ISP provides the IP addresses of its local DNS servers through DHCP. When a host makes a DNS query, the query is sent to the local DNS server, which acts as a proxy, forwarding the query into the DNS hierarchy, the process of a typical DNS query is displayed below:  

```mermaid
flowchart LR
Host[Requesting Host] -- 1 --> L[Local DNS Server]
L -- 2 --> Root --3 --> L
L --4 --> TLD --5 --> L 
L --6 --> Auth --7 --> L
L --8 --> Host
```

From the client's perspective, it doesn't really know how many queries the local DNS server make. The local DNS server may follow the hierarchy, starting from the root servers. For most cases, it can cache the records, it can directly go ask the TLD servers, which reduces the overall response time. The query that host sends can be viewed as a recursive query because it implies multiple queries. As for the local DNS server, it makes several iterative queries. One thing to note here is that the local DNS server will make more than three queries. For example,  suppose that the University of Massachusetts has a DNS server for the university, called `dns.umass.edu`. Each department has its own DNS server that is authoritative for all hosts in the department, e.g. `math.umass.edu`, `cs.umass.edu`. In that sense, the typical authoritative DNS server `dns.umass.edu` will not return the IP of a host instead the real authoritative DNS server's IP, e.g. `dns.math.umass.edu`. 

### DNS Records and Messages

The DNS servers that together implement the DNS distributed database store **resource records(RR)**. Each DNS reply message carries one or **more** resource records. A resource record is a four-tuple that contains the following fields:  

`(Name, Value, Type, TTL)`  

* If `Type=A`, the `Name` is a hostname and `Value` is the IP address for the hostname.
* If `Type=NS`, the `Name` is a domain (such as `foo.com` ) and `Value` is the hostname of an authoritative DNS server that knows how to obtain the IP addresses for hosts in the domain. This type of record is used to query further in the query chain.
* If `Type=CNAME`, the `Value` is a canonical hostname for the alias hostname `Name`. The canonical name is often hard to remember, we users remember the alias hostnames. For large companies, they exploit *CNAME* extensively.
* If `Type=MX`, the `Value` is the canonical name of a mail server that has an alias hostname `NAME`. As an example, `(foo.com, email.foo.com, MX)`.



### Experiments

#### A Typical Case

Let's do some experiments. We use `nslookup` to find send DNS query. The syntax is:  

```bash 
nslookup [-option1] [-option2] host-to-find [dns-server]
```

If the `dns-server` is not provided, the query is sent to the default local DNS server.  The default queried type is `A`, we can specify the type `nslookup -type=NS`.   

We query the `www.mit.edu`  

```bash
┌──(marcus㉿kali)-[~]
└─$ nslookup www.mit.edu                
Server:         192.168.159.2
Address:        192.168.159.2#53

Non-authoritative answer:
www.mit.edu     canonical name = www.mit.edu.edgekey.net.
www.mit.edu.edgekey.net canonical name = e9566.dscb.akamaiedge.net.
Name:   e9566.dscb.akamaiedge.net
Address: 23.77.30.244
Name:   e9566.dscb.akamaiedge.net
Address: 2402:4f00:4002:19d::255e
Name:   e9566.dscb.akamaiedge.net
Address: 2402:4f00:4002:19e::255e
```

You might wonder what is Non-authoritative answer, it basically means the authoritative answer is not involved in this recursive query, the record is retrieved from cache. Also notes that it has multiple answers. Because for `www.mit.edu`, it would be no use to know its CNAME `www.mit.edu.edgekey.net`, we need to know the ultimate IP.

#### Find the authoritative DNS server

If we wanna get the authoritative DNS server for `www.aiit.or.kr`, we can issue the following command:  

```bash
┌──(marcus㉿kali)-[~]
└─$ nslookup -type=NS www.aiit.or.kr
Server:         192.168.159.2
Address:        192.168.159.2#53

Non-authoritative answer:
*** Can't find www.aiit.or.kr: No answer

Authoritative answers can be found from:
aiit.or.kr
        origin = ns9.dnszi.com
        mail addr = root.dnszi.com
        serial = 2020032223
        refresh = 43200
        retry = 3600
        expire = 1209600
        minimum = 3600

                                                                                           
┌──(marcus㉿kali)-[~]
└─$ nslookup aiit.or.kr ns9.dnszi.com
Server:         ns9.dnszi.com
Address:        121.78.251.23#53

Name:   aiit.or.kr
Address: 58.229.6.225
```

We can see that we first retrieve the authoritative DNS server, then we directly ask that DNS server for the IP of that host.



### MISC

In Windows, we can check the DNS server addresses by `ipconfig /all`.  

To see the cached records by `ipconfig /displaydns`. Each entry shows the remaining Time to Live(TTL) in seconds. To clear the cache, enter `ipconfig /flushdns`.  In *Git Bash*, you should use `ipconfig //all` double slash to escape because of the POSIX path conversion.
