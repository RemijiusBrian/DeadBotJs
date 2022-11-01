const { REST, Routes, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');

const getCommands = () => {
	const commandsPath = path.join(__dirname, 'commands');
	const commandFiles = fs.readdirSync(commandsPath).filter(f => f.endsWith('.js'));

	return commandFiles.map(file => {
		const command = require(path.join(commandsPath, file));
		return command;
	});
};

const addCommandsToClient = (client, commands) => {
	client.commands = new Collection();
	commands.forEach(command => {
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		}
	})
};

const deployCommands = async (commandsList) => {
	const clientId = process.env['CLIENT_ID'];
	const token = process.env['BOT_TOKEN'];
	const guildId = process.env['DEAD_MANS_ISLE_ID'];

	const commands = commandsList.map(cmd => cmd.data.toJSON());
	const rest = new REST({ version: '10' }).setToken(token);
	try {
		console.log(`Started deploying ${commands.length} application (/) commands.`);

		const response = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		)
		console.log(`Successfully deployed ${response.length} application (/) commands.`);
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	async registerCommands(client) {
		const commands = getCommands();
		addCommandsToClient(client, commands);
		await deployCommands(commands);
	}
};