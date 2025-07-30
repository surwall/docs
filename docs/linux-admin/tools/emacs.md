## move

`M-<` Beginning of buffer

`M->` End of buffer

C-u [digit] without specifying a digit

## stop

using C-g to discard a numeric argument or the beginning of a command that you do not wan to finish.

## disabled command

type `<SPC>` to answer, or type "n" to cancel

## windows

C-x 1 to kill all other windows and leave the current window

C-x 2 splits the screen into two windows

C-M-v to scroll the bottom window

C-x o ("o" for other) to move the cursor to the bottom window

C-v and M-v

C-x 4 C-f find a file in other window

## FRAMES

C-x 5 2	see a new frame appear on your screen

C-x 5 0 remove the selected frame

## deleting

in emacs they refer backspace as `<DEL>`

1. C-d - Delete the next character after the cursor
2. `M-<DEL>` - kill the word before the cursor
3. M-d - kill the word after the cursor
4. M-k - kill to the end of the current sentence

* type `C-<SPC>` to make a mark and move the cursor to cause an highlighted text. Type C-w to kill all the text between the two positions.

The difference between "killing" and "deleting" is that "killed" text can be reinserted, whereas "deleted" things cannot be reinserted in this way. Reinsertion of killed text is called "yanking".

* a single C-k kills the content of the line, and a second C-k kills the line itself. If you do several C-k's in a row, all of the killed text is saved together.

## UNDO

C-/ undoes the changes made by one command. C-_ works exactly the same as it.

C-X u

## EDIT

C-x C-f 	Find a file

C-x C-s	Save the file

C-x C-b	List buffers

C-x b 	quickly switch to a buffer

C-x s 	Save some buffers

## Extending the command set

C-x 	Character eXtend. 	Followed by one character

M-x 	named command eXtend. Followed by a long name.



## AUTO SAVE

M-x recover-this-file

## Misc

C-h m 	View documentation on your current major mode

## Search and replace

C-s for forward search

C-r for reverse search

C-s again, to search for the next occurrence of "cursor"

type `<DEL>` four times and see it.

## Recursive editing levels

get out of the recursive editing level, type `<ESC> <ESC> <ESC>`

## HELP

C-h C and a command character or sequence. display a very brief description of the command

get more information about a command, use C-h k instead of C-h c.

C-h f 	describe a function

C-h a     command apropos

C-h i       read included manuals (a.k.a. info)

## Mark

| C-x C-x | Swap point and mark |
| ------- | ------------------- |
|         |                     |