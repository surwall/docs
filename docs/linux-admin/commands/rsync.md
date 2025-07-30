Rsync is a sync tool. It allows back up directories into other directories. It could be:
1. local to local
2. remote to local
3. local to remote
## Syntax
```bash
rsync [OPTION...] SRC... [DEST]
# pull
rsync [OPTION...] [USER@]HOST:SRC... [DEST]
# push
rsync [OPTION...] SRC... [USER@]HOST:DEST
```
Let's really focus on the local sync for a while.
## Directory Sync
We can sync a directory into another directory.
```bash
rsync -av /src/foo dest # put the src folder into the dest
```
In this case, we put directory `src/foo` and all its content into `/dest`, it will end up like `/dest/foo`.
If we wanna put the content of that directory into `/dest`, so it's like `foo` and `dest` are the sync directories. We can add a trailing slash to the source folder, in this case `src/foo`
```bash
rsync -av /src/foo/ dest # sync two folder
```
>[!note]
>Note that we don't need to create `dest` directory, `rsync` will create for us if not exist.

## Files Sync
You can specify sync multiple files into a folder or a single file to another place.
```bash
# sync a file
rsync -av src/foo.c save/bar.c

# caveat: sync a file
rsync -av src/*.c save/dir
```
Let's focus on the second command, if `src` folder only contains one file, for example, `src/*` expands to `src/foo.c`, and `save/dir` happens to not exist. In this case, it will apply **single-item copy rule**, it will not create a directory but a file named `save/dir`.
To prevent such an accident,
1. either make sure the destination dir exists
2. or specify the destination path with a trailing slash, `rsync -av src/*.c save/dir/`
## Mixed Sync
You can sync directories or its content and files both into a folder.
```
rsync some-folder/ somefiles dir # multiple files sync
rsync folder1 folder2/ dir
```
Note that in this case, `folder2/` means the content, `folder1` means the whole folder. As long as source contains one folder even empty or multiple files, **single item copy rule** won't apply.
## Remote Sync
