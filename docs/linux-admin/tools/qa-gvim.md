## Set gvim window width and height

set columns=100 lines=32

100 characters width and 32 lines height

## Check gvim or vim

## Is GUI vim or not

if has("gui_running")  
  " GUI is running or is about to start.  
  " Maximize gvim window (for an alternative on Windows, see simalt below).  
  set lines=999 columns=999  
else  
  " This is console Vim.  
  if exists("+lines")  
    set lines=50  
  endif  
  if exists("+columns")  
    set columns=100  
  endif  
endif

From [https://vim.fandom.com/wiki/Maximize_or_set_initial_window_size](https://vim.fandom.com/wiki/Maximize_or_set_initial_window_size)

## Set gvim window initial postion

1. get current position using `winpos`
2. Set position using `winpos 420 220`

