const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Bot latency!'),
    async execute(interaction) {
        await interaction.reply({ content: `🏓 Pong! Latency is ${Date.now() - interaction.createdTimestamp}ms.`, ephemeral: true });
    },
};
