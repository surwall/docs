[mkcert](https://github.com/FiloSottile/mkcert) is a simple tool for making locally-trusted development certificates. It requires no configuration.

## Create a CA
```bash
mkcert -install
```

## Sign a Certificate
```bash
mkcert example.com '*.example.com' example.test localhost 127.0.0.1
```

Make a certificate for `localhost`
```bash
mkcert localhost
```