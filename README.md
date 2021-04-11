# `resolve-alpn`

[![Node CI](https://github.com/szmarczak/resolve-alpn/workflows/Node%20CI/badge.svg)](https://github.com/szmarczak/resolve-alpn/actions)
[![codecov](https://codecov.io/gh/szmarczak/resolve-alpn/branch/master/graph/badge.svg)](https://codecov.io/gh/szmarczak/resolve-alpn)

## API

### resolveALPN(options)

Returns an object with an `alpnProtocol` property. The `socket` property may be also present.

```js
const result = await resolveALPN({
	host: 'nghttp2.org',
	port: 443,
	ALPNProtocols: ['h2', 'http/1.1'],
	servername: 'nghttp2.org'
});

console.log(result); // {alpnProtocol: 'h2'}
```

**Note:** While the `servername` option is not required in this case, many other servers do. It's best practice to set it anyway.

#### options

Same as [TLS options](https://nodejs.org/api/tls.html#tls_tls_connect_options_callback).

##### options.resolveSocket

By default, the socket gets destroyed and the promise resolves.<br>
If you set this to true, it will return the socket in a `socket` property.

```js
const result = await resolveALPN({
	host: 'nghttp2.org',
	port: 443,
	ALPNProtocols: ['h2', 'http/1.1'],
	servername: 'nghttp2.org',
	resolveSocket: true
});

console.log(result); // {alpnProtocol: 'h2', socket: tls.TLSSocket}

// Remember to destroy the socket if you don't use it!
result.socket.destroy();
```

## License

MIT
