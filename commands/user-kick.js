const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const KEY_MEMBER = 'member';
const KEY_REASON = 'reason';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Kick a member')
		.addUserOption(option =>
			option.setName(KEY_MEMBER)
				.setDescription('Kick target')
				.setRequired(true)
		)
		.addStringOption(option =>
			option.setName(KEY_REASON)
				.setDescription('Reason for Kick')
		)
		.setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
		.setDMPermission(false),
	async execute(interaction) {
		const member = interaction.options.getUser(KEY_MEMBER);
		const reason = interaction.options.getString(KEY_REASON) ?? 'No Reason';
		await interaction.guild.members.kick(member, reason);
		await interaction.reply(`Kicked ${member.tag} for ${reason}`);
	}
}