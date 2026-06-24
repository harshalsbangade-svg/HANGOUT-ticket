const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setup-tickets')
        .setDescription('Deploys the ticket creation panel.')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setTitle('🎫 Support Tickets')
            .setDescription('Need assistance? Click the button below to open a private support ticket and talk to our staff.')
            .setColor(0x5865F2)
            .setFooter({ text: 'Our staff will be with you shortly.' });

        const button = new ButtonBuilder()
            .setCustomId('create_ticket')
            .setLabel('Create Ticket')
            .setStyle(ButtonStyle.Primary)
            .setEmoji('📩');

        const row = new ActionRowBuilder().addComponents(button);

        await interaction.reply({ content: 'Ticket panel deployed successfully!', ephemeral: true });
        await interaction.channel.send({ embeds: [embed], components: [row] });
    },
};
