const { Events } = require("discord.js");

module.exports = {
	event: Events.ClientReady,
	once: true,
	onEvent(client) {
		console.log(`Logged in as ${client.user.tag}`);
	}
}