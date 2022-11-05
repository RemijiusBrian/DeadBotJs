const { SlashCommandBuilder } = require("discord.js");

const utils = require('../utils/utils');
const exec = require('child_process').exec;

const STOP_MC_COMMAND = 'gcloud compute instances stop --zone \"asia-south2-a\" \"supercomputer\"  --project \"verdant-algebra-364611\"';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop-mc')
        .setDescription('Stops your Minecraft server'),
    async execute(interaction) {
        await interaction.deferReply();
        if (utils.denyIfNotCertified(interaction, true)) return;

        exec(STOP_MC_COMMAND, async (err, stdout, stderr) => {
            await interaction.editReply('`Your Minecraft server has stopped.`');
        });
    }
}