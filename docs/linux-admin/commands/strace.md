## View Python File System Call
Create a file called `write_hello.py`
```python
import os

def write_to_file(filename, content):
    with open(filename, "w") as f:
        f.write(content)

if __name__ == "__main__":
    write_to_file("hello.txt", "hello world")
```
chmod +x write_hello.py
```bash
strace ./write_hello.py
```
You can see that it has `write(3, "hello world", 11)`. To only show system calls `write` use:
```bash
strace ./write_hello.py -e write
```