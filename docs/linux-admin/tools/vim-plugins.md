## NERDTree
1. Open files operation
	1. `Enter` for opening a file at right
	2. `t` open a file in a new tab
	3. `i` open a file horizontally split
	4. `s` open a file vertically split
2. File manipuatlion
	1. `m` open the operation menu
	2. `mo` open with the default program
	3. `ma` add a new file or dir, **add `/` at the end to create a directory**
	4. `md` delete current file or dir
	5. `mm` move a file or dir
	6. `mp` copy node path to clipboard
	7. `ms` run the system command in this dir
	8. `ctrl+c` to cancel operation
	
	> [!tip]
	>
	> After you create a new file, make sure use `r` to refresh the view.
3. workspace
   1. `cd` change the workdir to selected dir
   2. `CD` change the tree root to the workdir

## Vim Table Mode
This plugin is used to create markdown table or any table more easily.
After installing it, at normal mode, use `<leader>tm` to toggle vim table mode.
In the editing mode, use `|` will auto align the width.
use `||` (vertical bar twice) to create a horizontal line like `| --- | --- |`.

Use `<leader>tr` to format or `:TableModeRealign` to reformat the table.
[See More](https://github.com/dhruvasagar/vim-table-mode)
* Editing
	* It provides a text object for table cells. You can use `i|` or `a|` to select it.
	* `<Leader>tdc` to delete a column (tdc stands for table delete column)
	* `[count]<Leader>tic` insert a column after the cursor
	* `[count]<Leader>tiC` insert a column before the cursor
* Navigation
	* `[|`, `]|` to move left | right  cells

## Vim Markdown
[See More](https://github.com/preservim/vim-markdown?tab=readme-ov-file#basic-usage)
Use `:Toc` to open a toc window at left.
1. Navigation
	1. Use `[[` or `]]` to jump previous or next header (no matter header level)