## Intro
A tool for creating scripts more easily. 
## Tutorial
### Display a List of Option
```bash
result=$(gum choose opt1 opt2 opt3)
if [[ $result == "opt1" ]]; then
	:
else
	:
fi
```
The result is the string of the option.
### Get One line Input
```bash

```

### Output Information
```bash
gum log --structured --level debug "Creating file..." name file.txt

gum log --structured --level info "success set the proxy"

# log.DebugLevel
# log.InfoLevel
# log.WarnLevel
# log.ErrorLevel
# log.FatalLevel
```
## See More
[Official Repo](https://github.com/charmbracelet/gum)
