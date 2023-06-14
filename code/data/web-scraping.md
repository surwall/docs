# The essence of web scraping

  Nowadays, with the prospecting of the internet, we have tons of data. Most of time, we just need tiny of it. All we have to do is to sperate the wheat from the chaff which is tedious and cumbersome. Since the invention of computers, why wouldn't we just use it to automate these chores?

  All in all, the minimum procedure are list below:

* Get the data source: it may be a webpage or an API or any text file.
* Interpret the structure of the data source, locate the data you want to extract
* Write some programming code to do the actual scraping
* Store the data into somewhere, maybe a database, or just in your drive
* Visualize your data into some charts or something alike

The first three are the most important parts. The first step may have some hurdles, say, some websites have some protections on anti-scraping. I will get to that later.



## Get the data source

Web scraping isn't just about python. Although is most used programming language for web scraping. Terseness and rich libraries may account for the choice of python for web scraping. In recent years, JavaScript(particularly node.js) also become popular for its asynchronous ability. We'll mostly use Python to do the scraping, but JavaScript is also included.

There are several types of requesting libraries from which you can choose:

* Requests ( a simple request client)
* urllib(built-in)
* [aiohttp](https://docs.aiohttp.org/en/stable/) : (asynchronous http client)



### 

### Javascript based webpages

We can only get the pre-rendered html source file, we can't get the data after ajax. We may choose to get the data directly from api or use other libraries like selenium, splash to emulate the execution of Javascript.



### Sessions and Cookies

webpage may use cookies to retain the session, so your scraper also need to carry that cookie header in your http header.



### Proxy

Some websites may put on some restrictions to prevent same Ip address to retrieve large amount of data in a short time. You have to change another Ip to bypass it. Normally we buy some Ip services that can provide us so many Ip that we use Proxy to let that Ip to access the pages for us.



## Interpret the data

Depends on what structure your data look like, there are several libraries you choose from:

* XPath for xml and html
* Beautiful Soup for html
* Pyquery for html



## Store the data

we can store the data as a single file: TXT, JSON, CSV etc. Besides, we can store them into databases, namely MySQL, Redis, MongoDB.

 

## handle the dynamic rendered pages





## the recognition of CAPTCHA



## the usage of Proxy



## scraping on apps



## pyspider usage



## Scrapy usage



## Distributed spider



## Deployment







