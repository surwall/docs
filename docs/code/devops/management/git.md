# git

## See What's already edited?

1. Running `git diff` will show you the differences between the current working directory and the last commit. **By default, `git diff` doesn't show the differences for untracked files.**

2. To see staged edits, enter `git diff --staged` or `git diff --cached`.

## Set up Git
You need you identidy before you can make commit. 
```bash
git config --global user.name "Marcus Xu"
git config --global user.email surwall07@gmail.com
```
If you don't append that `--global`, it will only set your identidy local to your repository.


### Checking Your Settings
```bash
git config --list
```