# Mirror

In China, because of the GREAT WALL, any Internet connection to abroad servers will be extremely slow. In order to overcome this, we could use proxy server. However, proxy server's bandwidth costs, so we have set up a mirror repository for various things to reduce bandwidth and improve connectivity, like ubuntu apt source, npm mirror site, etc.

The following are just a list of all mirrors in China:

1. [大学镜像集合](https://mirrors.cernet.edu.cn/list)
1. [清华大学开源软件镜像站](https://mirrors.tuna.tsinghua.edu.cn/help/ubuntu/) 
2. [腾讯软件源](https://mirrors.tencent.com/)
3. [阿里巴巴开源镜像站](https://developer.aliyun.com/mirror/) (rate limit of 2MB)
4. [华为开源镜像站](https://mirrors.huaweicloud.com/home)



## Python
In Python, pip is the deafult package manager. The config file for it is store at `%appdata%/pip/pip.ini`on Windows or `$HOME/.config/pip/pip.conf` on Linux.

This command will set pip to download packages from mirrors:  

```bash
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
```



## NODEJS



## JAVA



## RUBY
In Ruby, RubyGem is the default package manager. Each library is distributed as a "gem". Inside each "gem", the structure is almost the same. It looks like this:  
```txt
├── awesome_gem.gemspec
├── bin
│   ├── console
│   └── setup
├── Gemfile
├── lib
│   ├── awesome_gem
│   │   └── version.rb
│   └── awesome_gem.rb
├── Rakefile
├── README.md
└── test
    ├── awesome_gem_test.rb
    └── test_helper.rb
```
That `Gemfile`is required for every gem. That `Gemfile` can list all the used packages, but this is only useful for packages themselves, but not for projects, which clearly aren't packages. This is where `bundle` comes into play, which is another tool packed with ruby, which aims to resolve this issue. It kind like `npm` in NodeJS projects, when run `bundle init`, it will create a dep list file called `Gemfile`. You would use `bundle install` to install new gems, it will append that gem name as a dep into that file, and it also generates a `Gemfile.lock` which almost same with `npm.lock`. 

1. add a gem
```bash
bundle add rails
```
2. remove a gem

```bash
bundle remove rails
```

3. sync with Gemfile

```bash
bundle install
```

As a side note, provided that Ruby has so many versions, you typically install ruby via [RVM](https://rvm.io/). After you install rvm, you should change the default site to download ruby.  
```bash
echo "ruby_url=https://cache.ruby-china.com/pub/ruby" > $rvm_path/user/db
```
* Check which ruby version you wanna install by:  

```bash
rvm list known
```

* Install a version

```bash
rvm install 3.2.2
```

* Switch a version

```bash
rvm use 3.1.0 # temporarily
rvm use 2.2.0 --default
```

* show all installed ruby 

```bash
rvm list
```

* remove a version

```bash
rvm remove 1.8.7
```

As a side note here, when you pull your projects from GitHub, you may run `bundle install` to install all the declared gems, but by default it will do a round trip to `rubygems.org` to look for newer versions. If you want to just use the local versions just run `bundle install --local`, that would be much faster.  Anyway, if you really feel that is slow, there's an ultimate guide to speed that up by directly add deps into your GemFile, like this:   

```ruby
gem 'nokogiri'
gem 'rails', '7.0.7'
gem 'rack',  '>=1.0'
gem 'thin',  '~>1.1'
```

And then, run `bundle install --local` that will be instantly fast.

### change gem source and bundle source

1. change gems source

```bash
gem sources --add http://mirrors.bfsu.edu.cn/rubygems/ --remove https://rubygems.org/
gem sources -l
```

2. change bundler default source

```bash
# this is set for projects
bundle config mirror.https://rubygems.org http://mirrors.bfsu.edu.cn/rubygems
# change for ~/.bundle/config
bundle config mirror.https://rubygems.org http://mirrors.bfsu.edu.cn/rubygems --global
```

