const { SlashCommandBuilder } = require("discord.js");
const utils = require('../utils/utils');

const KEY_MEMBER = 'member';
const KEY_REASON = 'reason';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('certify')
        .setDescription('Certify a fellow maggot')
        .addMentionableOption(option =>
            option.setName(KEY_MEMBER)
                .setDescription('Member to certify')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName(KEY_REASON)
                .setDescription('Reason for certifying')
        ),
    async execute(interaction) {
        if (utils.denyIfNotCertified(interaction)) return;

        const member = interaction.options.getMentionable(KEY_MEMBER);
        const reason = interaction.options.getString(KEY_REASON);

        const certifiedMember = await member.roles.add(process.env['CERTIFIED_ROLE_ID'], reason);
        const memberEventsChannel = await utils.getMemberEventsChannel(interaction.guild);
        await memberEventsChannel.send(`Welcome to the \`Lordship\`, ${certifiedMember}\nhttps://media.tenor.com/9zjRb6CqPZIAAAAC/welcome-pirates.gif`)
        await interaction.reply({ content: 'It be done!', ephemeral: true });
    }
}