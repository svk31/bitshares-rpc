var jayson = require('jayson');
var Q = require('q');

function client(options) {
	var defaults = {
		port: 1775,
		hostname: '127.0.0.1',
		username: 'USERNAME',
		password: 'PASSWORD'
	};

	options.port = (options.port) ? options.port : defaults.port;	
	options.hostname = (options.hostname) ? options.hostname : defaults.hostname;
	options.username = (options.username) ? options.username : defaults.username;
	options.password = (options.password) ? options.password : defaults.password;

	if (!(this instanceof client)) return new client(options);

	this.jayson_client = jayson.client.http({
		port: options.port,
		hostname: options.hostname,
		path: '/rpc',
		auth: (options.username + ':' + options.password),
	});
}

module.exports = client;

client.prototype.request = function(method, params) {
	this.params = params || [];
	this.method = method;

	var deferred = Q.defer();
	this.jayson_client.request(this.method, this.params, function(error, response, result) {
		if (error) {
			deferred.reject(error);
		} else {
			deferred.resolve(result);
		}
	});
	return deferred.promise;
};