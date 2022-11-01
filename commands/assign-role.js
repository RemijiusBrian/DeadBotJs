const { SlashCommandBuilder, ChannelType } = require("discord.js");

const KEY_ROLE = 'role';
const KEY_MEMBER = 'member';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('assign-role')
		.setDescription('Assign a role to a member')
		.addMentionableOption(option =>
			option.setName(KEY_MEMBER)
				.setDescription('Member to assign the role to.')
				.setRequired(true)
		)
		.addRoleOption(option =>
			option.setName(KEY_ROLE)
				.setDescription('Role to call upon')
				.setRequired(true)
		),
	async execute(interaction) {
		const member = interaction.options.getMentionable(KEY_MEMBER);
		const role = interaction.options.getRole(KEY_ROLE);

		const result = await member.roles.add(role);
		await interaction.reply(`Role ${role} assigned to ${result}`);
	}
}