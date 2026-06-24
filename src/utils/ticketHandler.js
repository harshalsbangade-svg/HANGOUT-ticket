const { ChannelType, PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { supportRoleId, ticketCategoryId } = require('../../config.json');

async function createTicket(interaction) {
    const guild = interaction.guild;
    const user = interaction.user;

    // Check if configuration IDs are placeholder strings
    if (supportRoleId === "YOUR_SUPPORT_ROLE_ID" || ticketCategoryId === "YOUR_TICKET_CATEGORY_ID") {
        return interaction.reply({ content: '❌ Bot configuration is incomplete. Please update `config.json`.', ephemeral: true });
    }

    try {
        const channel = await guild.channels.create({
            name: `ticket-${user.username}`,
            type: ChannelType.GuildText,
            parent: ticketCategoryId,
            permissionOverwrites: [
                {
                    id: guild.roles.everyone.id,
                    deny: [PermissionFlagsBits.ViewChannel],
                },
                {
                    id: user.id,
                    allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory],
                },
                {
                    id: supportRoleId,
                    allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory],
                },
            ],
        });

        const embed = new EmbedBuilder()
            .setTitle('🎟️ Ticket Opened')
            .setDescription(`Hello ${user},

Thank you for reaching out. Our support personnel will be with you shortly.
To close this ticket, click the button below.`)
            .setColor(0x5865F2)
            .setTimestamp();

        const closeButton = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('close_ticket')
                .setLabel('Close Ticket')
                .setStyle(ButtonStyle.Danger)
                .setEmoji('🔒')
        );

        await channel.send({ content: `${user} | <@&${supportRoleId}>`, embeds: [embed], components: [closeButton] });
        await interaction.reply({ content: `✅ Your ticket has been created: ${channel}`, ephemeral: true });

    } catch (error) {
        console.error('Error creating ticket:', error);
        await interaction.reply({ content: '❌ Failed to create ticket channel. Make sure the bot has full administrator permissions and the category ID is correct.', ephemeral: true });
    }
}

async function closeTicket(interaction) {
    try {
        await interaction.reply({ content: '🔒 Closing and deleting this ticket channel in 5 seconds...' });
        
        setTimeout(async () => {
            try {
                await interaction.channel.delete();
            } catch (err) {
                console.error('Failed to delete channel:', err);
            }
        }, 5000);

    } catch (error) {
        console.error('Error closing ticket:', error);
    }
}

module.exports = { createTicket, closeTicket };
