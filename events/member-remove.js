const { Events } = require("discord.js");

module.exports = {
	event: Events.GuildMemberRemove,
	once: false,
	async onEvent(member) {
		try {
			const memberEventsChannel = await utils.getMemberEventsChannel(interaction.guild);
			await memberEventsChannel.send(`**${member.user.tag}** has walked the plank!`);
		} catch (error) {
			console.error(error);
		}
	}
}