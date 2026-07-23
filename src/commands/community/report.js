const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const config = require('../../config');
const db = require('../../database/queries');
const embedUtil = require('../../utils/embed');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('report')
    .setDescription('Report a member to the moderators')
    .addUserOption(option =>
      option.setName('user').setDescription('The user to report').setRequired(true))
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('Reason for the report')
        .setRequired(true)
        .setMaxLength(config.limits.reportMaxLength)),
  cooldown: 120,
  async execute(interaction) {
    const target = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason');

    if (target.id === interaction.user.id) {
      return interaction.reply({
        embeds: [embedUtil.error('Error', 'You cannot report yourself.')],
        ephemeral: true,
      });
    }

    const channel = interaction.guild.channels.cache.find(
      c => c.name === config.channels.reports
    );

    if (!channel) {
      return interaction.reply({
        embeds: [embedUtil.error('Error', 'Reports channel not found. Contact an admin.')],
        ephemeral: true,
      });
    }

    const embed = new EmbedBuilder()
      .setColor(config.embedColors.error)
      .setTitle('🚨 New Report')
      .addFields(
        { name: 'Reporter', value: interaction.user.tag, inline: true },
        { name: 'Target', value: target.tag, inline: true },
        { name: 'Reason', value: reason, inline: false },
        { name: 'Status', value: '🔴 Open', inline: true },
      )
      .setTimestamp()
      .setFooter({ text: `ID: ${interaction.id}` });

    const message = await channel.send({ embeds: [embed] });
    db.reports.create(message.id, interaction.user.id, target.id, interaction.guildId, reason);

    await interaction.reply({
      embeds: [embedUtil.success('Report Submitted', 'Your report has been sent to the moderation team.')],
      ephemeral: true,
    });
  },
};
