const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const KEY_MEMBER = 'member';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('about')
		.setDescription('Get general details about a member')
		.addMentionableOption(option =>
			option.setName(KEY_MEMBER)
				.setDescription('Member to fetch info about')
				.setRequired(true)
		),
	async execute(interaction) {
		const member = interaction.options.getMentionable(KEY_MEMBER);
		const roles = member.roles.cache;
		const roleNames = roles.map(role => role.toString()).join(' | ');
		const infoEmbed = new EmbedBuilder()
			.setColor(member.displayColor)
			.setTitle(member.user.tag)
			.setDescription(member.nickname)
			.addFields(
				{ name: 'Certified', value: roles.has(process.env['CERTIFIED_DEAD_ROLE']).toString() },
				{ name: 'Bot', value: member.user.bot.toString(), inline: true },
				{ name: 'Joined server on', value: member.joinedAt.toDateString(), inline: true },
				{ name: 'Roles', value: roleNames }
			)
			.setImage(member.displayAvatarURL())
			.setTimestamp();

		await interaction.reply({ content: 'Getting Info...', ephemeral: true });
		await interaction.channel.send({ embeds: [infoEmbed] });
	}
}