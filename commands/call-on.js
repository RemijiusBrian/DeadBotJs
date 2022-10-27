const { SlashCommandBuilder, ChannelType } = require("discord.js");
const Utils = require('../utils/utils.js');
const minecrafterRoleId = process.env['ROLE_MINECRAFTER'];

const KEY_ROLE = 'role';
const KEY_ACTIVITY = 'activity';
const KEY_CHANNEL = 'channel';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('call-on')
		.setDescription('Call upon a role')
		.addRoleOption(option =>
			option.setName(KEY_ROLE)
				.setDescription('Role to call upon')
				.setRequired(true)
		)
		.addStringOption(option =>
			option.setName(KEY_ACTIVITY)
				.setDescription('Activity to call for')
		)
		.addChannelOption(option =>
			option.setName(KEY_CHANNEL)
				.setDescription('Channel to call on')
				.addChannelTypes(ChannelType.GuildText)
		),
	async execute(interaction) {
		const role = interaction.options.getRole(KEY_ROLE);
		const activity = interaction.options.getString(KEY_ACTIVITY);
		const channel = interaction.options.getChannel(KEY_CHANNEL) ?? interaction.channel;

		// Check for permission to send message in channel
		if (!Utils.hasSendMessagePermInChannel(interaction.member, channel)) {
			throw new Error('I don\'nt have permission to send messages there.');
		}

		await interaction.reply({ content: 'On it!', ephemeral: true });
		await channel.send(`Calling on ${role}${activity.length ? ` for ${activity}` : ''}`);
	}
}