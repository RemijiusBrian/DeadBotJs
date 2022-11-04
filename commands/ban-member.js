const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const KEY_MEMBER = 'member';
const KEY_REASON = 'reason';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Ban a member')
		.addMentionableOption(option =>
			option.setName(KEY_MEMBER)
				.setDescription('Ban target')
				.setRequired(true)
		)
		.addStringOption(option =>
			option.setName(KEY_REASON)
				.setDescription('Reason for ban')
		)
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
		.setDMPermission(false),
	async execute(interaction) {
		const member = interaction.options.getUser(KEY_MEMBER);
		const reason = interaction.options.getString(KEY_REASON) ?? 'Reasons Unknown';

		await member.ban({ deleteMessageSeconds: 0, reason });
		await interaction.reply(`Banned ${member.user.tag} for ${reason}`);
	}
}