const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const utils = require('../utils/utils');

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
		const roleNames = member.roles.cache.map(role => role.toString()).join(' | ');
		const infoEmbed = utils.baseEmbedBuilder()
			.setColor(member.displayColor)
			.setTitle(member.user.tag)
			.setDescription(member.nickname)
			.addFields(
				{ name: 'Certified', value: utils.isCertified(member).toString().toString() },
				{ name: 'Bot', value: member.user.bot.toString(), inline: true },
				{ name: 'Joined server on', value: member.joinedAt.toDateString(), inline: true },
				{ name: 'Roles', value: roleNames }
			)
			.setImage(member.displayAvatarURL());

		await interaction.reply({ content: 'Getting Info...', ephemeral: true });
		await interaction.channel.send({ embeds: [infoEmbed] });
	}
}