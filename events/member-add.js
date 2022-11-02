const { Events, EmbedBuilder } = require("discord.js");

module.exports = {
	event: Events.GuildMemberAdd,
	once: false,
	async onEvent(member) {
		try {
			console.log('Member Added...');
			const guild = member.guild;
			const memeberEventChannel = await guild.channels.fetch(process.env['MEMBER_EVENT_CHANNEL']);
			let addedMember = member;
			if (!member.user.bot) {
				addedMember = await member.roles.add(process.env['MEMBER_ROLE_ID']);
			}

			const welcomeEmbed = new EmbedBuilder()
				.setColor(addedMember.displayColor)
				.setTitle(`${addedMember}, Welcome aboard **The Dead Man's Isle!** ya bloomin cockroach!`)
				.setThumbnail(guild.bannerURL())
				.setTimestamp()
				.setFooter({ text: 'Dead Men Tell No Tales' });

			await memeberEventChannel.send({ embeds: [welcomeEmbed] });
		} catch (error) {
			console.error(error);
		}
	}
}