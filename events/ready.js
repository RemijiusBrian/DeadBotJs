const { Events } = require("discord.js");

module.exports = {
	event: Events.ClientReady,
	once: true,
	async onEvent(client) {
		const channel = await client.channels.fetch(process.env['BOT_TEST_CHANNEL_ID']);
		await channel.send('Hey Guys! I\'m Back!');
		console.log(`Logged in as ${client.user.tag}`);
	}
}