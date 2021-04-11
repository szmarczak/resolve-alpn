'use strict';
const tls = require('tls');

module.exports = (options = {}) => new Promise((resolve, reject) => {
	let timeout = false;

	const callback = async () => {
		if (options.resolveSocket) {
			socket.off('error', reject);
			resolve({alpnProtocol: socket.alpnProtocol, socket, timeout});

			if (timeout) {
				await Promise.resolve();
				socket.emit('timeout');
			}
		} else {
			socket.destroy();
			resolve({alpnProtocol: socket.alpnProtocol, timeout});
		}
	};

	const socket = tls.connect(options, callback);

	socket.on('error', reject);
	socket.once('timeout', async () => {
		timeout = true;
		callback();
	});
});
