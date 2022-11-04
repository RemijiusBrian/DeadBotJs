const { Events } = require("discord.js");
const utils = require('../utils/utils');

module.exports = {
    event: Events.GuildBanAdd,
    once: false,
    async onEvent(ban) {
        try {
            const guild = ban.guild;
            const memeberEventChannel = await guild.channels.fetch(process.env['MEMBER_EVENT_CHANNEL']);

            const banEmbed = utils.baseEmbedBuilder()
                .setDescription(`**${ban.user.tag}** was banned for ${ban.reason}`)
                .setImage('https://images.app.goo.gl/JETYniemtFfAUv8q9');

            await memeberEventChannel.send({ embeds: [banEmbed] });
        } catch (error) {
            console.error(error);
        }
    }
}