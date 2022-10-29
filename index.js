const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildBans
	]
});

// Initialize
require("./command-manager.js").registerCommands(client);
require("./event-manager.js").registerEventListerners(client);

const startServer = require("./server.js");
startServer();
client.login(process.env['DEAD_MANS_BOT_TOKEN']);