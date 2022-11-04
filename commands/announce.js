const { SlashCommandBuilder, ChannelType } = require("discord.js");
const Utils = require('../utils/utils.js');

const KEY_CHANNEL = 'channel';
const KEY_MESSAGE = 'message';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('announce')
		.setDescription('Announce something on your behalf'),
	async execute(interaction) {
		// TODO show modal
		await interaction.reply('Still Under construction!');
	}
}