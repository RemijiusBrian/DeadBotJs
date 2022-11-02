const { PermissionFlagsBits, EmbedBuilder } = require("discord.js");

const hasSendMessagePermInChannel = (member, channel) => member.permissionsIn(channel).has(PermissionFlagsBits.SendMessages) === true;

const baseEmbedBuilder = () => new EmbedBuilder()
	.setFooter({ text: 'Dead Men Tell No Tales' })
	.setTimestamp();

module.exports = {
	hasSendMessagePermInChannel,
	baseEmbedBuilder
}