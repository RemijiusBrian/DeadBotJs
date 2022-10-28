const { Events, EmbedBuilder } = require("discord.js");

module.exports = {
	event: Events.GuildMemberAdd,
	once: false,
	async onEvent(member) {
		const guild = member.guild;
		const memeberEventChannel = await guild.channels.fetch(process.env['MEMBER_EVENT_CHANNEL']);
		const welcomeEmbed = new EmbedBuilder()
			.setColor(member.displayColor)
			.setTitle(`Welcome ${member}, To the Dead Man's Isle!`)
			.setThumbnail(member.displayAvatarURL())
			.setImage(guild.bannerURL())
			.setTimestamp()
			.setFooter('Dead Men tell no tales');

		await memeberEventChannel.send({ embeds: [welcomeEmbed] });
	}
}