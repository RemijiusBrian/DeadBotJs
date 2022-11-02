const { Events, EmbedBuilder } = require("discord.js");

module.exports = {
	event: Events.GuildMemberAdd,
	once: false,
	async onEvent(member) {
		try {
			console.log('Member Added...');
			const guild = member.guild;
			const memeberEventChannel = await guild.channels.fetch(process.env['MEMBER_EVENT_CHANNEL']);
			const newMember = await member.roles.add(process.env['MEMBER_ROLE_ID']);
			const welcomeEmbed = new EmbedBuilder()
				.setColor(newMember.displayColor)
				.setTitle(`Welcome ${newMember}, To the Dead Man's Isle!`)
				.setThumbnail(newMember.displayAvatarURL())
				.setImage(guild.bannerURL())
				.setTimestamp()
				.setFooter('Dead Men tell no tales');

			await memeberEventChannel.send({ embeds: [welcomeEmbed] });
		} catch (error) {
			console.error(error);
		}
	}
}