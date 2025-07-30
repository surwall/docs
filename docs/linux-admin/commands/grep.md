## Intro

grep, sed, and awk are powerful text manipulation tools.

## Grep

grep can filter lines based on patterns (basic regex) from a bunch of lines (either from standard input or a list of files), and output lines into standard output or redirect them.

### syntax

```bash
grep [OPTION...] PATTERNS [FILE...]
```

Normally options are:

1. `-E`, Interpret PATTERNS as extended regular expressions
2. `-v`, invert the result, to select non-matching lines
3. `-x`, Select  only  those  matches  that  exactly  match  the whole line.
4. `-i`, ignore case
5. `--color`, highlight the matched string
6. `-n`, show line number

### Examples

```bash
# list all python files in pwd, notices single quotes
ls | grep -i '\.py$' 
# show all files without pdf files (invert match)
ls /usr/bin | grep -v '\.pdf$' 
# search key line from a file
grep keyword a.txt
# search from multiple files
grep keyword a.txt b.txt

# show file name and line number by adding a fake file
grep -n keyword /dev/null a.txt
```

> [!warning]
>
> Note that we wrap our patterns with single quotes to prevent shell interpret special characters. To escape the Regex operator itself, use `\` backslash.

> [!tip]
>
> Return code of grep is useful
>
> ```bash
> grep fred filename > /dev/null && rm filename
> ```

### grep family

* **grep** - use regular expressions for pattern matching
* **fgrep** - file grep, does not use regular expression (faster than grep)
* **egrep** - extended regular expressions for pattern matching



[sed](sed.md)

​																																																																																							

