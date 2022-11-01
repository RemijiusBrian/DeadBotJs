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
		const roleNames = roles.map(role => role.name).join(' | ');
		const infoEmbed = new EmbedBuilder()
			.setColor(member.displayColor)
			.setTitle(member)
			.addFields(
				{ name: 'Bot', value: member.user.bot.toString(), inline: true },
				{ name: 'Joined server on', value: member.joinedAt.toDateString(), inline: true },
				{ name: 'Roles', value: roleNames }
			)
			.setImage(member.displayAvatarURL())
			.setTimestamp();

		if (roles.has(process.env['CERTIFIED_DEAD_ROLE'])) {
			infoEmbed.setDescription('Certified Dead!');
		}

		await interaction.reply({ content: 'Getting Info...', ephemeral: true });
		await interaction.channel.send({ embeds: [infoEmbed] });
	}
}