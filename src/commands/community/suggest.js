const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const config = require('../../config');
const db = require('../../database/queries');
const embedUtil = require('../../utils/embed');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('suggest')
    .setDescription('Submit a suggestion for the server')
    .addStringOption(option =>
      option.setName('suggestion')
        .setDescription('Your suggestion')
        .setRequired(true)
        .setMaxLength(config.limits.suggestMaxLength)),
  cooldown: 60,
  async execute(interaction) {
    const suggestion = interaction.options.getString('suggestion');
    const channel = interaction.guild.channels.cache.find(
      c => c.name === config.channels.suggestions
    );

    if (!channel) {
      return interaction.reply({
        embeds: [embedUtil.error('Error', 'Suggestions channel not found. Contact an admin.')],
        ephemeral: true,
      });
    }

    const embed = new EmbedBuilder()
      .setColor(config.embedColors.primary)
      .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
      .setTitle('💡 New Suggestion')
      .setDescription(suggestion)
      .addFields({ name: 'Status', value: '🕐 Pending review', inline: true })
      .setTimestamp()
      .setFooter({ text: `ID: ${interaction.id}` });

    const message = await channel.send({ embeds: [embed] });
    await message.react('👍');
    await message.react('👎');

    db.suggestions.create(message.id, interaction.user.id, interaction.guildId, suggestion);

    await interaction.reply({
      embeds: [embedUtil.success('Suggestion Submitted', 'Your suggestion has been posted.')],
      ephemeral: true,
    });
  },
};
