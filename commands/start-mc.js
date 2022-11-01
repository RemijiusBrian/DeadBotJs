const { SlashCommandBuilder } = require("discord.js");
const mcUtils = require('../utils/mc-utils');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('start-mc')
        .setDescription('Starts the Minecraft server'),
    async execute(interaction) {
        interaction.deferReply();
        await interaction.reply('Working on it...');
    }
}