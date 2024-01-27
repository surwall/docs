# MathJax

Mathjax is a subset of LaTex. Basically we use it to render math formulas which we can't simply do it in markdown.

We can divide the procedure of rendering formulas into two categories: Inline Math Block or just Math Block



## Inline Math Block

you wrap your expression into a pair of $, that is `$a+b=5$`. 

## Math Block

you would wrap your expression into a pair of $$, that is `$$a+b=1$$`.



## Complex Expressions

For more complex expressions, you may need to use Latex Commands. For example, you want to write the square root of a number, you would type `$\sqrt{number}`. As you can see, the command always start with backslash. That is a indicator. You wrap your argument into a bracket. You can omit it when it only takes one argument. So, we can write this way: `$\sqrt5$`. Another command takes two arguments: `$\frac{3}{5}$`. 



### write text 

Besides regular math symbols, you may append it write some texts.   

`$\text{If something, \emph{then} ...}$`

the command \emph just means emphasize.



### next line

you may write multiple expressions in a single math block, use command `\`, you have to append the indicator, so it's actually `\\`



### other commands

| display                     | expression                      |                         |
| --------------------------- | ------------------------------- | ----------------------- |
| $\frac{3}{5}$               | `$\frac{3}{5}$`                 |                         |
| ${3}\neq{5}$                | `${3}\ne{5}$` or `${3}\neq{5}$` |                         |
| $\pm{2}$                    | `$\pm{2}$`                      | plus-minus symbol       |
| $x~y$                       | `$x~y$`                         | very little space       |
| $x~~~y$                     | `$x~~~y$`                       | manually change space   |
| $x\;y$                      | `$x\;y$`                        | little space            |
| $x \quad y$                 | `$x\quady$`                     | space                   |
| $x\qquad y$                 | `$x\qquad y$`                   | more space              |
| $\frac{du}{dt}$             | `$\frac{du}{dt}$`               | the derivative          |
| $f'(x)$                     | `f'(x)`                         | the derivative          |
| $f''(x)$                    | `f''(x)`                        | the second derivative   |
| $\lim_{x \to +\infty} f(x)$ | `$\lim_{x \to +\infty} f(x)$`   | Limit at plus infinity  |
| $\lim_{x \to -\infty} f(x)$ | `$\lim_{x \to -\infty} f(x)$`   | Limit at minus infinity |
|                             |                                 |                         |



[math symbols](https://www.math-linux.com/latex-26/faq/latex-faq/article/latex-derivatives-limits-sums-products-and-integrals)

