const { SlashCommandBuilder } = require("discord.js");
const utils = require('../utils/utils');

const KEY_MEMBER = 'member';
const KEY_REASON = 'reason';
const WELCOME_GIF = 'https://media.tenor.com/9zjRb6CqPZIAAAAC/welcome-pirates.gif';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('un-certify')
        .setDescription('Uncertify a maggot')
        .addMentionableOption(option =>
            option.setName(KEY_MEMBER)
                .setDescription('Member to uncertify')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName(KEY_REASON)
                .setDescription('Reason for uncertifying')
        ),
    async execute(interaction) {
        const denied = await utils.denyIfNotCertified(interaction);
        if (denied) return;

        const member = interaction.options.getMentionable(KEY_MEMBER);
        const reason = interaction.options.getString(KEY_REASON);

        const certifiedMember = await member.roles.remove(process.env['CERTIFIED_DEAD_ROLE'], reason);
        const memberEventsChannel = await utils.getMemberEventsChannel(interaction.guild);
        await memberEventsChannel.send(`${certifiedMember} is now a mere Peasent\`[Uncertified]\``);
        await interaction.reply({ content: 'It be done!', ephemeral: true });
    }
}