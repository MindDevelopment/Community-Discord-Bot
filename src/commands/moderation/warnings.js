const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const embed = require('../../utils/embed');
const db = require('../../database/queries');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('warnings')
    .setDescription('View warnings for a member')
    .addUserOption(option =>
      option.setName('target').setDescription('The member to check').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
  async execute(interaction) {
    const target = interaction.options.getMember('target');
    if (!target) {
      return interaction.reply({ embeds: [embed.error('Error', 'Member not found.')], ephemeral: true });
    }

    const list = db.warnings.list(target.id, interaction.guildId);

    if (list.length === 0) {
      return interaction.reply({
        embeds: [embed.info('Warnings', `${target.user.tag} has no warnings.`)],
      });
    }

    const items = list.map((w, i) =>
      `**${i + 1}.** ${w.reason} — <t:${Math.floor(new Date(w.created_at).getTime() / 1000)}:R> (by <@${w.moderator_id}>)`
    );

    await interaction.reply({
      embeds: [embed.base(`⚠️ Warnings for ${target.user.tag}`, items.join('\n'), 0xFEE75C)],
    });
  },
};
