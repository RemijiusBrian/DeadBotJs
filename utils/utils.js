const { PermissionFlagsBits, EmbedBuilder } = require("discord.js");

const hasSendMessagePermInChannel = (member, channel) => member.permissionsIn(channel).has(PermissionFlagsBits.SendMessages) === true;

const baseEmbedBuilder = () => new EmbedBuilder()
	.setFooter({ text: 'Dead Men Tell No Tales' })
	.setTimestamp();

const isCertified = (member) => member.roles.cache.has(process.env['CERTIFIED_ROLE_ID']);

const denyIfNotCertified = async (interaction, editReply = false) => {
	if (!isCertified(interaction.member)) {
		if (editReply) {
			await interaction.editReply('You not be worthy for such actions maggot!\n' + 'https://media3.giphy.com/media/kx7ZO9wGh56ZdH4JdO/200w.webp?cid=ecf05e4778lp905ypj9na4u4qd6kufqqa1zenjohw6zc5rwb&rid=200w.webp&ct=g');
		} else {
			await interaction.reply('You not be worthy for such actions maggot!\n' + 'https://media3.giphy.com/media/kx7ZO9wGh56ZdH4JdO/200w.webp?cid=ecf05e4778lp905ypj9na4u4qd6kufqqa1zenjohw6zc5rwb&rid=200w.webp&ct=g');
		}
		return true;
	}
	return false;
}

const getMemberEventsChannel = async (guild) => await guild.channels.fetch(process.env['MEMBER_EVENT_CHANNEL']);

module.exports = {
	hasSendMessagePermInChannel,
	baseEmbedBuilder,
	isCertified,
	denyIfNotCertified,
	getMemberEventsChannel
}