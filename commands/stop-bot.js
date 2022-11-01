const { SlashCommandBuilder, ChannelType } = require("discord.js");
const Utils = require('../utils/utils.js');

const KEY_CHANNEL = 'channel';
const KEY_MESSAGE = 'message';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('reload')
		.setDescription('Reloads the bot'),
	async execute(interaction) {
		await interaction.reply({ content: 'Reloading...', ephemeral: true });
		interaction.client.destroy();
	}
}