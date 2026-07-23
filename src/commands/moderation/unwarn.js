const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const embed = require('../../utils/embed');
const db = require('../../database/queries');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('unwarn')
    .setDescription('Remove a specific warning')
    .addIntegerOption(option =>
      option.setName('id').setDescription('Warning ID').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
  async execute(interaction) {
    const id = interaction.options.getInteger('id');
    const result = db.warnings.remove(id);

    if (result.changes === 0) {
      return interaction.reply({
        embeds: [embed.error('Error', 'Warning not found.')],
        ephemeral: true,
      });
    }

    await interaction.reply({
      embeds: [embed.success('Warning Removed', `Warning #${id} has been removed.`)],
    });
  },
};
