const { SlashCommandBuilder } = require("discord.js");
const mcUtils = require('../utils/mc-utils');
const exec = require('child_process').exec;

const START_MC_COMMAND = 'gcloud compute instances start --zone \"asia-south2-a\" \"supercomputer\"  --project \"verdant-algebra-364611\"';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('start-mc')
        .setDescription('Starts your Minecraft server'),
    async execute(interaction) {
        await interaction.deferReply();
        exec(START_MC_COMMAND, async (err, stdout, stderr) => {
            await interaction.editReply('`Starting your Minecraft server...`');
        });
    }
}