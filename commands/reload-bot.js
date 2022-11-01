const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('reload')
		.setDescription('Reloads the bot'),
	async execute(interaction) {
		await interaction.reply('https://gfycat.com/lazyconsideratehammerkop');
		interaction.client.destroy();
	}
}