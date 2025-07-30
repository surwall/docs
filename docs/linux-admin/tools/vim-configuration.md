## Vimrc

This file is the config file for vim.

```vim
call plug#begin()

" List your plugins here
Plug 'tpope/vim-sensible'
Plug 'preservim/nerdtree'
Plug 'ryanoasis/vim-devicons'
Plug 'vim-airline/vim-airline'
Plug 'jceb/vim-orgmode'

call plug#end()

set guifont=JetBrainsMono\ NFM:h13
set encoding=utf8 softtabstop=4 shiftwidth=4 expandtab
syntax on
set autoindent smartindent incsearch number wildmenu ignorecase smartcase wrap set laststatus=2
set backspace=indent,eol,start
colorscheme delek

" custom shortcut
noremap <F6> :NERDTreeToggle<CR>
set pastetoggle=<F2>

filetype on
autocmd FileType ruby setlocal ts=2 sts=2 sw=2 et " expand tab
autocmd FileType javascript setlocal ts=4 sts=4 sw=4 noet " no expand tab
autocmd FileType make setlocal ts=4 sts=4 sw=4 noet
```

## Clipboard
Just use tmux and neovim, tmux support osc52, when tmux is set, nvim will copy to tmux.

## Reload Config
Vim config is at `~/.vimrc`. We can reload the config after modifying it by `:source ~/.vimrc`.
Or if you are currently editing the `.vimrc` use `:so %`.

## Plugin System
Since the advent of Vim8.0, it supports plugin natively. 
In essence, it introduces a package system. A Vim package is a directory that contains one or more plugins.
A package should have two folder, `start` and `opt`.
* plugins in `start` folder will load automatically
* plugins in `opt` folder can be loaded on demand with `packadd! plugin-folder-name`
All packages should stored in `~/.vim/pack`(Unix) or `~/vimrfiles/pack` (Windows).
Since we can store all our plugins in one package. We can create a structure like this:
```bash
./pack
└── dist
    ├── opt
    │   ├── onedark.vim
    │   └── vim-gitgutter
    └── start
```
We create a package named `dist` and put optional plugins in `opt` folder. In general, the plugins should locate at:
* auto-load plugins at `~/.vim/pack/{package-name}/start/{name}`
* on-demand plugins at `~/.vim/pack/{package-name}/opt/{name}`
## Vim-Plug
Clearly, we don't wanna manually clone plugin repos into those folders. That would be tedious.
We will use a third party plugin manager called [Vim-Plug](https://github.com/junegunn/vim-plug),
To install it, [Download plug.vim](https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim) and put it in the "autoload" directory in `.vim`(Unix) or `vimfile`(Windows).
Append the following line into `.vimrc`
```bash
call plug#begin()

" List your plugins here
Plug 'tpope/vim-sensible'

call plug#end()
```
Generally, you should place these lines at the beginning since you need to load the plugin first.
It provides several commands to manage plugins:
- `:PlugInstall` to install the plugins
- `:PlugUpdate` to install or update the plugins
- `:PlugDiff` to review the changes from the last update
- `:PlugClean` to remove plugins no longer in the list

>[!tip]
>After modifying plugin lists in `.vimrc`, make sure reload the file `:source ~/.vimrc`, and then use `PluginInstall` to install plugins.

## .vimrc Explain

### Font and Encoding

The format is `set guifont=font_name:size[:antialias]`. Note that if the font contains space, escape it with `\`. 
For example, for font `JetBrains Mono NL Regular` with font size 13 and enable antialias:
```bash
set encoding=utf8
set guifont=JetBrains\ Mono\ \NL\ Regular:h13
```

### Tab Size

#### space based files

By default, the tab size is 8. We wanna set it to be 4, and make tab as 4 spaces. And for specific file type like `.js` we wanna tab size be 2.

```bash
set softabstop=4 shiftwidth=4  expandtab
```

Note that `tabstop` controls how `tab` character should be rendered. By default, it render `tab` with 8 spaces. As for `softabstop`, default is `0`, it is only used at insert mode. It uses a mix of spaces and `Tab`.

The `expandtab` will convert every tab you input with spaces.

The `shiftwidth` is used at normal mode when hit `>>` to shift code with 4 spaces.

> [!tip]
>
> Note that by default, `softabstop` feature is set to 0, this feature is closed. So there is no mix of space and tab. One tab is rendered as 8 spaces.

In our case, we don't wanna our files contain any tab. So we use `softtabstop=4 expandtab` combination to set tab into 4 spaces. You may get rid of all tabs with command `:%retab!`

#### tab based files

As for files like `makefile`, you need tabs not space to indent. Use the following combination

```bash
set softtabstop=4 shiftwidth=4 noexpandtab
```

This combination will use a mix of tab and spaces, aka, smart tabs. If you enter one `tab`, it just four spaces. If you enter two continuous `tab`, it becomes a real `tab`. 

```bash
set tabstop=8 shiftwidth=8 softtabstop=0 noexpandtab
```

In this case, every tab you use is a really tab. By default, `softabstop` is 0, so you may not need it. Note that you must set `tabstop` and `shiftwidth` the same width.

You can check more with `:help tabstop`.



### Editor behavior

```vim
syntax on " 'syntax off' to disable it
set backspace=indent,eol,start " let backspace works
set number " showing lines with number, 'set nonumber' to disable it
set autoindent smartident " smartindent for c like languages
set incsearch " set incremental search, will show all matched terms
set ignorecase smartcase " use case insensitive search, except when using capital cases
set wrap " wrap the lines
```

To turn off highlighting until the next search, you can use `:noh`. You can make a shortcut out of it if you feel tedious to do so. You can use `set hlsearch` to show matched one at time.

> [!tip]
>
> When autoindent enabled, paste code from clipboard seems weired. You can use `set paste` to disable indent, after pasting, use `set nopaste` to recover indent. Or just make a keymap by
>
> `set pastetoggle=<F2>`

### additional settings

```vim
colorscheme delek
set wildmenu " show long menu when use commands
set laststatus=2 " always show filename even have one window
```



## custom commands

Format: `command [name] :[command ...]`

```bash
command Reload :source ~/.vimrc
```

Custom commands should start with a capital letter.

## history

- [x] todo ✅ 2024-11-02

## conditional options

Since `.vimrc` is just a vim script. We can use flow control to set options.

```bash
if has('win32')
	set shell=pwsh
	set shellcmdflag=-NoProfile\ -command
	set shellquote=\" shellxquote= " quote the commands with "
endif
```

In this case, `has()` is a function, it accepts `win32` as its parameter. 

> [!warning]
>
> Note that this script has conflicts with [vim-configuration](#vim-plug), it is mainly used for demonstration.

## Key Maps

```bash
noremap <mode><key> <command>
noremap <leader>q :q<CR> " works in all mode preventing calling itself recursively

nnoremap <F6> :NERDTreeToggle<CR> " only works in normal mode
inoremap <F6> :NERDTreeToggle<CR> " works in insert mode
```



## Apply Customizations to Certain Types of Files

```bash
filetype on
autocmd FileType ruby setlocal ts=2 sts=2 sw=2 et " expand tab
autocmd FileType javascript setlocal ts=4 sts=4 sw=4 noet " no expand tab
autocmd FileType make setlocal ts=4 sts=4 sw=4 noet
```

The autocmd declaration tells Vim to listen for an event and to execute the specified commands whenever that event fires. For more info `:help autocmd`

You can view filetype list at `$VIMRUNTIME/filetype.vim`

We can put those `autocmd` in `.vimrc`, we can place them in a file called `ftplugin`. So for instance, for JavaScript, we can create a `javascript.vim` which contains:

```bash
setlocal ts=4 sts=4 sw=4 noet
```

> [!note]
>
> For the ftplugin mechanism to work, we must ensure that both file-type detection
> and plugins are enabled. With `filetype on` and `filetype plugin on`.



## Plugin System And AutoStart

In Vim 8 and beyond, a groundbreaking evolution took place with the introduction of its native package management system, signifying the gradual eclipse of third-party plugin management tools.

Vim treats plugins located in each of these directories:

1. `~/.vim/pack/{package-name}/start` plugins placed in this directory are automatically loaded when vim starts up. They are considered "start-up plugins" and are active by default.
2. `~/.vim/pack/{package-name}/opt`: plugins placed in the `opt` directory are not loaded automatically. Nevertheless, you can manually load them using `packadd! {plugin-repo-name}` 

In the old times(without plugin management tools), people tend to use a trick -- `~/.vim/autoload` directory can place autoload scripts, which are VimScript files that are automatically loaded by Vim when specific functions or commands defined in those scripts are called for the first time.

Note here, for windows, config file is stored at `~/vimfiles` not `~/.vim`.