## Bulk rename file names using regex
```c
^(.*)
2009-01-\1

\.\.\/\.\.\/(\d{4})\/(\d{2})\/(.+\.html)
\1-\2-\3
```

Note that we use `\1` to reference the matched group. This example add the prefix `2009-01-` to the original name.