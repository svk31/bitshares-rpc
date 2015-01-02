[![NPM version][npm-version-image]][npm-url] [![NPM downloads][npm-downloads-image]][npm-url] [![MIT License][license-image]][license-url]

#Bitshares-rpc

A very simple API wrapper for the excellent [jayson](https://github.com/tedeh/jayson) library and [Q](https://github.com/kriskowal/q) for promises to make an RPC client for Bitshares.

##Installation
	npm install bitshares-rpc

##Usage 
	var bitshares = require('bitshares-rpc');
	var config = require('config.json');

	var bitshares_client = bitshares.client({
		port: config.port,  // Optional - default 1775
		hostname: config.hostname,   // Optional - default 127.0.0.1
		username: config.username,
		password: config.password
	});

	bitshares_client.request('RPC_METHOD', [PARAMS]).then(function(result) {
		// Use result
	})
	.catch(function(error) {
		// Handle error
	});

RPC_METHOD can by any method found in the Bitshares client.

PARAMS is optional for methods that do not take parameters, if needed it should be an array of parameters.

See config.example.json for an example of how to configure the rpc parameters. They should match the parameters in your ".Bitshares/config.json" file.

##Examples

Some specific use cases:

	bitshares_client.request('getinfo')
	.then(function(result) {
		console.log(result);
	})
	.catch(function(error) {
		console.log(error);
	});

	bitshares_client.request('blockchain_list_delegates',[10, 10])
	.then(function(result) {
		console.log(result);
	})
	.catch(function(error) {
		console.log(error);
	});

Chaining with Q:

	var Q = require('q');
	Q.all([
		bitshares_client.request('getinfo'),
		bitshares_client.request('blockchain_list_delegates',[10, 10])
	])
	.then(function(result) {
		var getinfo = result[0];
		var delegates = result[1];
	})
	.catch(function(error) {
		console.log(error);
	})

## License

bitshares-rpc is freely distributable under the terms of the [MIT license](LICENSE).

[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: LICENSE

[npm-url]: https://npmjs.org/package/bitshares-rpc
[npm-version-image]: http://img.shields.io/npm/v/bitshares-rpc.svg?style=flat
[npm-downloads-image]: http://img.shields.io/npm/dm/bitshares-rpc.svg?style=flat
