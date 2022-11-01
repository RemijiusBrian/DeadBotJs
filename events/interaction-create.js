const { Events } = require("discord.js");

module.exports = {
	event: Events.InteractionCreate,
	once: false,
	async onEvent(interaction) {
		if (!interaction.isChatInputCommand()) return;
		try {
			const command = interaction.client.commands.get(interaction.commandName);
			if (!command) throw new Error('That doesn\'t seem to be a valid command.');
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: error.message, ephemeral: true });
		}
	}
}