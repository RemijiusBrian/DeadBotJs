const { SlashCommandBuilder, ChannelType } = require("discord.js");
const Utils = require('../utils/utils.js');

const KEY_CHANNEL = 'channel';
const KEY_MESSAGE = 'message';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('say-to')
		.setDescription('Say something on your behalf')
		.addStringOption(option =>
			option.setName(KEY_MESSAGE)
				.setDescription('Message')
				.setRequired(true)
		)
		.addChannelOption(option =>
			option.setName(KEY_CHANNEL)
				.setDescription('Channel to send the message on')
				.addChannelTypes(ChannelType.GuildText)
				.setRequired(true)
		),
	async execute(interaction) {
		const message = interaction.options.getString(KEY_MESSAGE);
		const channel = interaction.options.getChannel(KEY_CHANNEL);

		// Check for permission to send message in channel
		if (!Utils.hasSendMessagePermInChannel(interaction.member, channel)) {
			throw new Error('I don\'nt have permission to send messages there.');
		}

		await channel.send(message);
		await interaction.reply({ content: 'Done!', ephemeral: true });
	}
}