## Slow loading of a new book
Open Koreader app folder in the android phone. Find `settings.reader.lua`
Append the following line at the last
```lua
{
	... -- previous settings
	["cre_compress_cached_data"] = false
}
```
This will disable compressed cache, causing a faster loading speed.

## default gestures

| name                   | meaning                |
| ---------------------- | ---------------------- |
| top-left corner touch  | toggle horizontal view |
| top-right corner touch | toggle bookmark        |
|                        |                        |

## See more
[Official User Guide](https://koreader.rocks/user_guide/#uitips)
