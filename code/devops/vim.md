# Vim

## save a file without sudo

When you login as a user and start to edit the file that requires root permission. You can't save changes. For instance, you may wanna edit a file called `/etc/apt/sources.list`. After you make some changes, you should enter:

```bash
:w !sudo tee %
```

In this case, `%` indicates the current filename, `!` indicates a command, `:w` will put the file content as standard input or buffer into this command. 

Then you will get another prompt as follows: 

```bash
W12: Warning: File "/etc/apache2/conf.d/mediawiki.conf" has changed and the buffer was changed in Vim as well
See ":help W12" for more info.
[O]K, (L)oad File: 
```

Make sure you type `L` to load file in the buffer and then hit `Enter`.

[Trick](https://www.cyberciti.biz/faq/vim-vi-text-editor-save-file-without-root-permission/)



## Toggle Comment Multiple Lines[TODO]

[Trick](https://www.maketecheasier.com/comment-multiple-lines-vim/#:~:text=Start%20by%20navigating%20to%20the,key%20to%20remove%20the%20comments.)

