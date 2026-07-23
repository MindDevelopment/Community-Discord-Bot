const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const embed = require('../../utils/embed');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kick a member from the server')
    .addUserOption(option =>
      option.setName('target').setDescription('The member to kick').setRequired(true))
    .addStringOption(option =>
      option.setName('reason').setDescription('Reason for the kick'))
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
  async execute(interaction) {
    const target = interaction.options.getMember('target');
    const reason = interaction.options.getString('reason') || 'No reason provided';

    if (!target) {
      return interaction.reply({ embeds: [embed.error('Error', 'Member not found.')], ephemeral: true });
    }

    if (!target.kickable) {
      return interaction.reply({ embeds: [embed.error('Error', 'I cannot kick this member.')], ephemeral: true });
    }

    if (target.id === interaction.user.id) {
      return interaction.reply({ embeds: [embed.error('Error', 'You cannot kick yourself.')], ephemeral: true });
    }

    try {
      await target.kick(reason);
      await interaction.reply({
        embeds: [embed.success('Kicked', `${target.user.tag} has been kicked.\n**Reason:** ${reason}`)],
      });
    } catch (err) {
      await interaction.reply({
        embeds: [embed.error('Error', `Failed to kick: ${err.message}`)],
        ephemeral: true,
      });
    }
  },
};
