const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const embed = require('../../utils/embed');
const db = require('../../database/queries');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('warn')
    .setDescription('Warn a member')
    .addUserOption(option =>
      option.setName('target').setDescription('The member to warn').setRequired(true))
    .addStringOption(option =>
      option.setName('reason').setDescription('Reason for the warning'))
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
  async execute(interaction) {
    const target = interaction.options.getMember('target');
    const reason = interaction.options.getString('reason') || 'No reason provided';

    if (!target) {
      return interaction.reply({ embeds: [embed.error('Error', 'Member not found.')], ephemeral: true });
    }

    if (target.id === interaction.user.id) {
      return interaction.reply({ embeds: [embed.error('Error', 'You cannot warn yourself.')], ephemeral: true });
    }

    db.warnings.add(target.id, interaction.guildId, interaction.user.id, reason);
    const count = db.warnings.count(target.id, interaction.guildId);

    await interaction.reply({
      embeds: [embed.warning('Warning Issued', `${target.user.tag} has been warned.\n**Reason:** ${reason}\n**Total Warnings:** ${count}`)],
    });
  },
};
