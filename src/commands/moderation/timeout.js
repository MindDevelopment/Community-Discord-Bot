const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const embed = require('../../utils/embed');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('timeout')
    .setDescription('Timeout a member')
    .addUserOption(option =>
      option.setName('target').setDescription('The member to timeout').setRequired(true))
    .addIntegerOption(option =>
      option.setName('duration')
        .setDescription('Duration in minutes')
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(40320))
    .addStringOption(option =>
      option.setName('reason').setDescription('Reason for the timeout'))
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
  async execute(interaction) {
    const target = interaction.options.getMember('target');
    const duration = interaction.options.getInteger('duration');
    const reason = interaction.options.getString('reason') || 'No reason provided';

    if (!target) {
      return interaction.reply({ embeds: [embed.error('Error', 'Member not found.')], ephemeral: true });
    }

    if (!target.moderatable) {
      return interaction.reply({ embeds: [embed.error('Error', 'I cannot timeout this member.')], ephemeral: true });
    }

    try {
      await target.timeout(duration * 60 * 1000, reason);
      await interaction.reply({
        embeds: [embed.success('Timed Out', `${target.user.tag} has been timed out for ${duration} minutes.\n**Reason:** ${reason}`)],
      });
    } catch (err) {
      await interaction.reply({
        embeds: [embed.error('Error', `Failed to timeout: ${err.message}`)],
        ephemeral: true,
      });
    }
  },
};
