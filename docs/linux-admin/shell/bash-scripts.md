---
sidebar_position: 2
---
## Bash as an Interpreter

Bash can execute instructions from a string.

```bash
bash -c 'echo $HOME' # you might call it from a different shell, like sh
```

When you writing a bash script, you don't have to end it with `.sh` extension, that way, you have to use `bash foo.sh` to execute it. Instead, we can use a feature called [Shebang](https://en.wikipedia.org/wiki/Shebang_(Unix)) which declare your interpreter at the first line of your script. This is not limited to bash but also for python or ruby.

```bash
#!interpreter [optional-arg]
#!/bin/bash
```

## Branching with if

Let's say that we wanna test a variable is equal to something, if true, do something, else do something. This can be expressed like this:

```bash
x=5

if [ ”$x" -eq 5 ]; then
	echo "x equals 5"
else
	echo "x does not equal 5."
fi
```

If statements has the following syntax:

```bash
if commands; then
	commands
[elif commads; then
	commands...]
[else
	commands]
fi
```

If your statements only contain `if and else`, you can write something like this:
```bash
if commands; then
	:
else
	:
fi
```
In this case, you use a special command `:`, which means do nothing, it's the equivalent of `pass` in Python.


Sometimes we can shorten above example into one line:

```bash
if [ "$x" -eq 5 ]; then echo "equals 5"; else echo "does not equal 5."; fi
```

You might wonder what those brackets mean, let's put it aside. After the `if` keyword, you provide a command, every command (including shell functions) issue a integer between 0 to 255 to the system. By convention, 0 indicates success and any other value indicates failure. We can examine the exit status of last executed command by `$?`. 

The shell provides two builtin commands, `true` and `false`, that do nothing except return a 0 or 1 exit status. 

```bash 
true
echo $? #0
false
echo $? #1
```

**Now we know that this if statement will evaluate the command behind if, execute the following flow based on its exit status code.** 

By far, the command used most frequently with `if` is test. The `test` command performs a variety of checks and comparisons. It has two equivalent forms. 

1. `test expression`
2. `[ expression ]`

> [!NOTE]
>
> Note that `[` is actually a command requiring the `]` character as its final argument.

Recall the previous example, `if [ "$x" -eq 5 ]`, this test command will return 0 if the expression is true and return 1 when false. 

The `test` or `[` command support a wide range of useful expressions and tests.

### File Expressions

| Expression        | Is True If:                                                  |
| ----------------- | ------------------------------------------------------------ |
| `file1 -ef file2` | file1 and file2 have the same inode numbers( the same file by hard linking) |
| `file1 -nt file2` | file1 is newer than file2                                    |
| `file1 -ot file2` | file1 is older than file2                                    |
| `-e file`         | file exists                                                  |
| `-f file`         | file exists and is a regular file                            |
| `-d file`         | file exists and is a directory                               |
| `-w file`         | file exists and is writable (has write permission for the effective user) |
| `-x file`         | file exists and is executable (for the effective user)       |
| `-r file`         | file exists and is readable (for the effective user)         |

The typical use case is to check a file exist or not:

```bash
FILE=~/.bashrc

if [ -e "$FILE" ]; then
	return # exit code defaults to 0
else
	return 1
fi
```

> [!Caution]
>
> The parameter should always be quoted, like `"$FILE"` in this example.  It's like a defense against the parameter being empty or containing only whitespace, in such cases, it would cause an error.

### String Expressions

| Expression                                                                                                               | Is True If...                             |
| ------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------- |
| string                                                                                                                   | string is not null                        |
| -n string                                                                                                                | the length of string is greater than zero |
| -z string                                                                                                                | the length of string is zero              |
| `$string" != "$string2`                                                                                                  | string1 and string2 are not equal         |
| `$s1" == "$s2`                                                                                                           | s1 and s2 are equal                       |
| [see more](https://stackoverflow.com/questions/4277665/how-do-i-compare-two-string-variables-in-an-if-statement-in-bash) |                                           |

### Integer Expressions

| Expression               | Is True if...                  |
| ------------------------ | ------------------------------ |
| `integer1 -eq interger2` | integer1 is equal to interger2 |
| `integer1 -ne interger2` | not equal                      |
| `integer1 -le interger2` | `<=`                             |
| `integer1 -lt interger2` | `<`                              |
| `integer1 -ge interger2` | `>=`                             |
| `integer1 -gt interger2` | `>`                              |

Here's a typical use case:

```bash
INT=-5

if [ $((INT % 2)) --eq 0 ]; then
	echo "is even"
else
	echo "is odd"
fi
```

### Combining Expressions

We're not limited to a single expression. We can combine multiple expressions to create more complex evaluations by using logical operators. `test` and `[[]]` using different operators to represent these operatons:

| Operation | test | `[[]]` and `(())` |
| --------- | ---- | ----------------- |
| AND       | -a   | &&                |
| OR        | -o   | \|\|              |
| NOT       | !    | !                 |

Here's an example of an AND operatoin.

```bash
if [[ -f ~/.bashrc && -r ~/.bashrc ]]; then
    echo "It's .bashrc and it is readable"
else
    echo "Either ~/.bashrc doesn't exist or it's not readable"
fi
```

```bash
if [ -f ~/.bashrc -a -r ~/.bashrc ]; then
    echo "It's .bashrc and it is readable"
else
    echo "Either ~/.bashrc doesn't exist or it's not readable"
fi
```

> [!Caution]
>
> It is possible to use `&&` in "[" or "test" by `if [ -f ~/.bashrc ] && [ -r ~/.bashrc ]`, albeit harder. In general, we prefer to use `[[` for modern scripts.

#### The Difference between `[]` and `[[]]`

`[` is just like `test` is a command, so if expressions contain special character like `()`, you have to escape it. On the other hand, ``[[`` is a shell keyword, many restrictions don't exist. Here's a list of examples:

```bash
[[ 3 -eq 3 && 4 -eq 4 ]] && echo “Numbers are equal”
[ 3 -eq 3 -a 4 -eq 4 ] && echo “Numbers are equal”

# allow grouping
[[ 3 -eq 3 && (2 -eq 2 && 1 -eq 1) ]] && echo “Parentheses can be used”
# must escape special characters
[ 3 -eq 3 -a \( 2 -eq 2 -a 1 -eq 1 \) ] && echo “Parentheses can be used”

# negation
[[ ! ("$INT" -ge 50 && "$INT" -le 100) ]] && echo '50 < $INT < 100'
# must escape special characters
[ ! \( "$INT" -ge 50 -a "$INT" -le 100 \) ] && echo '50 < $INT < 100'
```

> [!CAUTION]
>
> When you use negation operator `!`, you wanna include parentheses around the expression for grouping, otherwise the negation would only apply to the first expression.

### `(( ))` - Designed for Integers

Recall that `$((expression))` will do arithmetic expansion, in addition to that, `(( expression ))` is just like `[[ ]]` compound command, albeit designed for integers. This `(( ))` is used to perform arithmetic truth tests. An arithmetic truth test results in true if the result of the arithmetic evaluation is non-zero, which is different from `[[ ]]` or `[ ]`. 

```bash
if ((1)); then echo "It is true"; fi # true
if ((0)); then echo "never echo"; fi # false, it will never echo
```

This expression may perform assignment like this

```bash
if (( foo = 5 )); then echo "It is true"; fi 
```

The expression inside `(())` does two things: it assigns the value of 5 to foo, and it evaluates to true because foo was assigned a non-zero value.

In addition to this simple assignment, it supports many useful assignments as shown in the following table:

| Notation           | Description                                                  |
| ------------------ | ------------------------------------------------------------ |
| parameter += value | addition. It also can do `-=`, `*=`, `/=`, and `%=` just like in other languages |
| parameter++        | variable post-increment                                      |
| --parameter        | variable pre-decrent                                         |

```bash
foo=1
echo $((++foo)) 
```

> [!TIP]
>
> This increment or decrement feature is really useful in for or while loop.

### Control Operators: Another Way to Branch

Like some techniques in other languages, we don't have to use `if` statement. That's an overkill. We use `&&` and `||` to combine two commands. For example,

```bash
mkdir temp && cd temp
[[ -d temp ]] || mkdir temp
[[ -d temp ]] || exit 1
```

> [!NOTE]
>
> [Short-circuit evaluation](https://en.wikipedia.org/wiki/Short-circuit_evaluation#Support_in_common_programming_and_scripting_languages) also exist in Bash just like that found in many programming languages.

## Functions and Arguments

Shell functions are mini scripts. Shell functions have two syntactic forms.

```bash
function name {
	commands
	return
}

name () {
	commads
	return [0-255]
}

## examples
function Tell_All { 
    echo "You called $FUNCNAME" 
    echo "The $# args supplied are:" 
    for arg in "$@"; do 
        echo "$arg" 
    done
}

Tell_All 47 tree /tmp # pass two arguments
```

> [!TIP]
>
> `return` keyword can return a status code just like other executables. We can get current function name by variable `$FUNCNAME`. Technically, `$FUNCNAME` is the function stack, so it would be better to use `${FUNCNAME[0]}`

### Local Variables

If you don't wanna pollute your global environment, you can use `local` keyword like this

```bash
a=3 # global variable
function test {
	local loc_var=23
	local a
	a=5 # shadow global a
}
```

### Arguments

Just like other languages, functions in bash can accept arguments through variable `$1`, `$2`, `$3` and so on to `$9`.

> [!CAUTION]
>
> If you wanna reference tenth positional argument, you have to use the special syntax `${10}`.

Recall that functions are just like mini scripts. When we are writing bash scripts, we can refer to arguments passed to the scripts by `$1`, `$2`, `$3` and so on. 

> [!NOTE]
>
> Note that `$0` will refer to the filename of the bash script (it might be a full path depending on how you call it) even in functions . However, use `$0` in the command line will return the current shell name. You can also use `$SHELL` to get pathname to the shell.

### Wrapper Functions

When you wanna create wrapper functions aimed at augmenting existing functionality with additional features while preserving compatibility with the original function's arguments. However, the inner function may requires an unpredictable number of arguments, you can use the special variable `$@` or `$*`, which expands into the list of positional parameters, to pass all remaining arguments to the inner function. Here's an simple example:\

```bash
#!/bin/bash

# Define the original function
original_function() {
    echo "Inner command: received arguments: $@"
    # Process the arguments as needed
}

# Define the wrapper function
wrapper_function() {
    local additional_arg="$1"  # Additional argument
    shift  # Shift to access remaining arguments
    # Process additional argument if needed
    echo "Wrapper function: additional_arg=$additional_arg"
    # Call the inner command with additional and remaining arguments
    original_function "$additional_arg" "$@"
}

# Call the wrapper function with multiple arguments
wrapper_function "extra" "arg1" "arg2" "arg3"
```

> [!CAUTION]
>
> `$*` and `$@` would be no different if not adding quotes. However, arguments may contain space, that would be interpreted as multiple arguments. Even with quotes, `"$*"` would compact all arguments into one long string, that would less useful. So `"$@"` is by far the most useful. 

## Array and for Loop

Array variables are just like other bash variables, and are created automatically when they are accessed. 

```bash
a[1]=foo # access index 1 element will create an array named a automatically
echo ${a[1]} # access array element at index 1

declare -a b # create the array b
```

Single values can be assigned using the following syntax:

```bash
name[subscript]=value
```

Multiple values may be assigned using the following syntax:

```bash
name=(value1 value2 ...)
```

### For Loop

There are two styles of looping structure, one is Python-like for loop, another is C-style for loop. 

* C-style for loop

  ```bash
  for ((i=0; i<10; i++)); do
  	printf '%d\n' "$i"
  done
  ```

  For an empty (non-stopping) for loop that is common in other languages like this:
  ```bash
  for ((;;)); do
  	printf 'forever'
  done
  ```

* Python-like for loop

  ```bash
  for i in item1 item2 item3...; do
  	echo $i
  done
  ```
  
  That i can be any name, it will be assigned the value of each item in order.
  
  Examples of this kind are: 
  
  ```bash
  for arg in $(cat /some/file)
  for arg in $(< /some/file) # faster than previous one
  for pic in $(find . -name '*.jpg')
  for val in $(find . -type d | LC_ALL=C sort)
  ```
  
  > [!TIP]
  >
  > We can use this Python-like for loop without providing a list, in that case, it will iterate over the parameters passed to the scripts or to the function (not including `$0`). 
  > ```bash
  > function ListArgs {
  > 	for args; do
  > 		echo "$args"
  > 	done
  > }
  > ```

After we talking about for loop, we can use it in our functions to iterate our argument lists. For example, you might define a function or a script that require unlimited parameters. In that case, you can use `$#` to check your parameter number.
