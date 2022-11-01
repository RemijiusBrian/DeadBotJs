const { SlashCommandBuilder } = require("discord.js");
const mcUtils = require('../utils/mc-utils');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('start-mc')
        .setDescription('Starts the Minecraft server'),
    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });
        await interaction.reply('Working on it...');
    }
}