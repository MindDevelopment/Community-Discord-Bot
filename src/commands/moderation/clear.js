const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const embed = require('../../utils/embed');
const config = require('../../config');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Clear messages in the channel')
    .addIntegerOption(option =>
      option.setName('amount')
        .setDescription('Number of messages to clear')
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(config.limits.clearMax))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
  async execute(interaction) {
    const amount = interaction.options.getInteger('amount');

    try {
      const messages = await interaction.channel.bulkDelete(amount, true);
      const reply = await interaction.reply({
        embeds: [embed.success('Cleared', `Deleted ${messages.size} messages.`)],
        fetchReply: true,
      });
      setTimeout(() => reply.delete().catch(() => {}), 3000);
    } catch (err) {
      await interaction.reply({
        embeds: [embed.error('Error', `Failed to clear messages: ${err.message}`)],
        ephemeral: true,
      });
    }
  },
};
