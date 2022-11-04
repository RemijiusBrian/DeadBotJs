const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

const KEY_MEMBER = 'member';
const KEY_TIME = 'time';
const KEY_REASON = 'reason';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shut-up')
        .setDescription('Timeout a member')
        .addMentionableOption(option =>
            option.setName(KEY_MEMBER)
                .setDescription('Timeout target')
                .setRequired(true)
        )
        .addIntegerOption(option =>
            option.setName(KEY_TIME)
                .setDescription('Mins to timeout')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName(KEY_REASON)
                .setDescription('Reason for Timeout')
        ),
    async execute(interaction) {
        const member = interaction.options.getMentionable(KEY_MEMBER);
        const time = interaction.options.getInteger(KEY_TIME);
        const reason = interaction.options.getString(KEY_REASON) ?? 'Reasons Unknown';

        await member.timeout(time * 60 * 1000, reason);
        await interaction.reply(`${member} is on a timeout for \`\`\`${reason}\`\`\``);
    }
}