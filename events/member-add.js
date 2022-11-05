const { Events } = require("discord.js");
const utils = require('../utils/utils');

module.exports = {
	event: Events.GuildMemberAdd,
	once: false,
	async onEvent(member) {
		try {
			const guild = member.guild;
			const memberEventsChannel = await utils.getMemberEventsChannel(interaction.guild);
			let addedMember = member;
			if (!member.user.bot) {
				addedMember = await member.roles.add(process.env['MEMBER_ROLE_ID']);
			}

			const welcomeEmbed = utils.baseEmbedBuilder()
				.setColor(addedMember.displayColor)
				.setDescription(`${addedMember.toString()}, Welcome aboard **The Dead Man's Isle!** ya bloomin cockroach!`)
				.setThumbnail(guild.bannerURL());

			await memberEventsChannel.send({ embeds: [welcomeEmbed] });
		} catch (error) {
			console.error(error);
		}
	}
}