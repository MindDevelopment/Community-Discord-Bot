const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const embed = require('../../utils/embed');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Ban a member from the server')
    .addUserOption(option =>
      option.setName('target').setDescription('The member to ban').setRequired(true))
    .addStringOption(option =>
      option.setName('reason').setDescription('Reason for the ban'))
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
  async execute(interaction) {
    const target = interaction.options.getMember('target');
    const reason = interaction.options.getString('reason') || 'No reason provided';

    if (!target) {
      return interaction.reply({ embeds: [embed.error('Error', 'Member not found.')], ephemeral: true });
    }

    if (!target.bannable) {
      return interaction.reply({ embeds: [embed.error('Error', 'I cannot ban this member.')], ephemeral: true });
    }

    if (target.id === interaction.user.id) {
      return interaction.reply({ embeds: [embed.error('Error', 'You cannot ban yourself.')], ephemeral: true });
    }

    try {
      await target.ban({ reason });
      await interaction.reply({
        embeds: [embed.success('Banned', `${target.user.tag} has been banned.\n**Reason:** ${reason}`)],
      });
    } catch (err) {
      await interaction.reply({
        embeds: [embed.error('Error', `Failed to ban: ${err.message}`)],
        ephemeral: true,
      });
    }
  },
};
