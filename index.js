const { Client, GatewayIntentBits, Events } = require('discord.js');

const clientIntents = [GatewayIntentBits.Guilds];
const client = new Client({ intents: clientIntents });

const commandManager = require('./command-manager.js');
commandManager.registerCommands(client);

client.once(Events.ClientReady, c => {
	console.log(`Logged in as ${c.user.tag}`);
});

// const eventManager = require("./event-manager.js");
// eventManager.registerEventListerners(client);

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	try {
		const command = interaction.client.commands.get(interaction.commandName);
		if (!command) throw new Error('That doesn\'t seem to be a valid command.\n Please user /help to see a list of the commands available.');
		await command.execute(interaction);
	} catch (error) {
		console.log(error);
		await interaction.reply({ content: error.message, ephemeral: true });
	}
});

const startServer = require("./server.js");
startServer();
client.login(process.env['DISCORD_TOKEN']);