# NGINX with PHP
Php developers recommend php-fpm, a fast cgi program, to integrate with other static servers including NGINX. NGINX has a fastcgi module `ngx_http_fastcgi_module` which is enabled by default. We see in the **/etc/nginx** we have a partial conf called `fastcgi_params`, we can append custom cgi params there.

