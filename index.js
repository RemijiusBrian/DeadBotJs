const { Client, GatewayIntentBits } = require('discord.js');

const clientIntents = [GatewayIntentBits.Guilds];
const client = new Client({ intents: clientIntents });

// Initialize
const runInits = (client) => {
	require("./command-manager.js").registerCommands(client);
	require("./event-manager.js").registerEventListerners(client);
};
runInits(client);

const startServer = require("./server.js");
startServer();
client.login(process.env['DEAD_MANS_BOT_TOKEN']);