const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildBans,
		GatewayIntentBits.GuildPresences,
		GatewayIntentBits.GuildMessages
	]
});

// Initialize
require("./command-manager.js").registerCommands(client);
require("./event-manager.js").registerEventListerners(client);

client.login(process.env['BOT_TOKEN']);