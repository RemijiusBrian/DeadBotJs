const { PermissionFlagsBits } = require("discord.js");

const hasSendMessagePermInChannel = (member, channel) => member.permissionsIn(channel).has(PermissionFlagsBits.SendMessages) === true;

module.exports = {
	hasSendMessagePermInChannel
}