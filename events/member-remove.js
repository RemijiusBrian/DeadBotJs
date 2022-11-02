const { Events } = require("discord.js");

module.exports = {
	event: Events.GuildMemberRemove,
	once: false,
	async onEvent(member) {
		try {
			const memeberEventChannel = await member.guild.channels.fetch(process.env['MEMBER_EVENT_CHANNEL']);
			await memeberEventChannel.send(`**${member.user.tag}** has walked the plank!`);
		} catch (error) {
			console.error(error);
		}
	}
}