const fs = require('fs');
const path = require('path');

const getEventListeners = () => {
	const eventsPath = path.join(__dirname, 'events');
	const eventsFiles = fs.readdirSync(eventsPath).filter(f => f.endsWith('.js'));

	return eventsFiles.map(file => {
		const listener = require(path.join(eventsPath, file));
		return listener;
	});
};

const addEventListeners = async (client) => {
	const listeners = getEventListeners();
	listeners.forEach(listener => {
		try {
			if (listener.once) {
				client.once(listener.event, (...args) => listener.onEvent(...args));
			} else {
				client.on(listener.event, (...args) => listener.onEvent(...args));
			}
		} catch (error) {
			console.error(error);
		}
	});
};

module.exports = {
	async registerEventListerners(client) {
		addEventListeners(client);
	}
};