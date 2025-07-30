## Configuration
Neovim configuration can be a vimscript `init.vim` or a lua script `init.lua` (not both).
It acts like `.vimrc` in Vim.  The config file is located at:

| Platform | path                                    |
|----------|-----------------------------------------|
| Unix     | ~/.config/nvim/init.vim(init.lua)       |
| Windows  | ~/AppData/Local/nvim/init.vim(init.lua) |

After creating the vimrc file, you can edit it in nvim using `:e $MYVIMRC`.

## Plugin Manager
We use "Lazy.nvim", since it is the most popular among others.
We better use single file setup.

```lua
if vim.g.vscode then
  -- VSCode extension
  return
else
  -- ordinary Neovim
end

-- Bootstrap lazy.nvim
local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"
if not (vim.uv or vim.loop).fs_stat(lazypath) then
  local lazyrepo = "https://github.com/folke/lazy.nvim.git"
  local out = vim.fn.system({ "git", "clone", "--filter=blob:none", "--branch=stable", lazyrepo, lazypath })
  if vim.v.shell_error ~= 0 then
    vim.api.nvim_echo({
      { "Failed to clone lazy.nvim:\n", "ErrorMsg" },
      { out, "WarningMsg" },
      { "\nPress any key to exit..." },
    }, true, {})
    vim.fn.getchar()
    os.exit(1)
  end
end
vim.opt.rtp:prepend(lazypath)

-- Make sure to setup `mapleader` and `maplocalleader` before
-- loading lazy.nvim so that mappings are correct.
-- This is also a good place to setup other settings (vim.opt)
vim.g.mapleader = " "
vim.g.maplocalleader = "\\"

-- Setup lazy.nvim
require("lazy").setup({
  spec = {
    -- add your plugins here
    {
      "ibhagwan/fzf-lua",
      -- optional for icon support
      dependencies = { "nvim-tree/nvim-web-devicons" },
      config = function()
        -- calling `setup` is optional for customization
        require("fzf-lua").setup({})
      end
    }
  },
  -- Configure any other settings here. See the documentation for more details.
  -- colorscheme that will be used when installing plugins.
  install = { colorscheme = { "habamax" } },
  -- automatically check for plugin updates
  checker = { enabled = true },
})

vim.keymap.set("n", "<c-P>", require('fzf-lua').files, { desc = "Fzf Files" }
```

Note that we put all our plugins in `spec = {}`, which is an array table.

## Transition to Nvim from Vim
- [x] todo ✅ 2024-11-02

## Writing init.lua Using Vscode
Neovim define all its api in global variable `vim`. You don't need to `require ('vim')`.

Donwload Vscode Lua LSP.
Add the lua library into Lua LSP settings.
```bash
C:\Program Files\Neovim\share\nvim\runtime\lua
```
After that, you have completions.
## See Also
