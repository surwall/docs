# Python
## Module System
Each file is indeed a module. The name of file without ".py" is the module name, the `__file__` automatic variable is also the current module name.

Say if have a file named `myMath.py` like this:
```python
def add(a, b):
    return a + b
```

in an another file you can import it by two ways:
```python
# first way
import myMath 
# second way
from myMath import add
# rename
import myMath as yourMath
```
The first way is that import all the functions condensed into a single module name, so if you wanna use that function, you could write `myMath.add`, this significantly decrease the collision possibility. The second way is more straight, you just add `add` into current namespace. So every file or module has its own namespace, you import modules by taking them as a variable in current namespace.   

When you import a module, every line inside that file is executed, so if you wanna use it both as a module and script, you can put all you script code in a scope like this:  
```python
if __name__ == "__main__":
    import sys
    fib(int(sys.argv[1]))
```

This way, when this main is executed directly(not import as a module), the value of `__name__` is `__main__`, not the module name, and when you import sys inside a scope, that will not pollute the global namespace inside that file.


### Packages
A module can only contain small amount of code, you may have a set of modules to tackle the same issue, you can structure then into a package. So A package is a folder that contains `__init__.py` file and other module files. This `__init__.py` will let Python treat this directory containing the file as a package. 
The possible file structure for a package might look like this:  
```txt
my_package/
├── __init__.py
├── main_module.py
└── subfolder/
    ├── __init__.py
    └── nested_module.py
```

To import that file, you can write `import my_package.subfolder.nested_module`, the subfolder doesn't need to have a `__init__.py` file, however, it's best practice to have a `__init__.py` inside every subfolder. That way, it allows you to **control what gets exposed** when the sub-package or package is imported.

The files inside that package can use relative imports, like this:  
```python
from . import echo
from .. import formats
from ..filters import equalizer
```
Note that the main module of a Python app must always use absolute imports.

### Search Path

>   When a module named spam is imported, the interpreter first searches for a built-in module with that name. These module names are listed in sys.builtin_module_names. If not found, it then searches for a file named spam.py in a list of directories given by the variable sys.path. sys.path is initialized from these locations:

### Dependency Management

In Python, you can use `pip` to download third-party packages. By default, you install as global packages. For collaborating projects, you should install all packages inside that project as dependencies like `package.json` in Nodejs projects. The way to do this is `virtual environment`, by that means, inside that environment, all you installed packages are located inside your projects without collision. For instance, you may require multiple versions of the same package, in that way, this can be handled without a hitch. 

### Creating virtual environments

Creation of virtual environments is done by executing the command `venv`:  

```bash
python -m venv ./.venv # If an existing directory is specified, it will be re-used.
```

Running this command will create a directory called `.venv`, this directory works like `node_modules` in NodeJS projects. To use it, you have to activate it first by `.env/Scripts/activate.ps1` on Windows or `source .env/Scripts/activate`.  By that, it will change your current environment variables, pointing `python` and `pip` to `Scripts/python.exe`, `Scripts/pip.exe`, which just sim links to which python interpreter you run to create this virtual environment. 

After you install all your required packages, you export your dependencies by:  

```bash
pip freeze > .\requirements.txt
```

This command export all packages installed locally and redirect it into this `requirements.txt` text file. When you upload your project on Github, others can download it and use this command to install all the required packages:  

```bash
pip install -r .\requirements.txt
```

**Note that where your virtual environment folder locate at doesn't matter as long as you create a virtual environment**



## Python Web Development

Python has two web interfaces that are calling conventions, aimed at standardizing the common operations like getting status code, get  headers. Every framework should implement or use components that implement one of these interfaces. The Big two frameworks are [Flask](https://flask.palletsprojects.com/) and [Django](https://www.djangoproject.com/). They are both wsgi-compatible.  

[ASGI](https://asgi.readthedocs.io/en/latest/) is the spiritual successor of WSGI. It provides one for both async and sync apps, with a WSGI backwards-compatibility. 



