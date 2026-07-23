const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const config = require('../../config');

const CATEGORY_ICONS = {
  info: 'ℹ️',
  moderation: '🛡️',
  utility: '🔧',
  fun: '🎮',
  community: '💬',
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Show all available commands'),
  async execute(interaction) {
    const categories = {};
    for (const [, cmd] of interaction.client.commands) {
      if (cmd.hidden) continue;
      const catName = cmd.category || 'other';
      if (!categories[catName]) categories[catName] = [];
      categories[catName].push(cmd.data);
    }

    const embed = new EmbedBuilder()
      .setColor(config.embedColors.primary)
      .setTitle('📚 Bot Commands')
      .setDescription('Here are all available commands:')
      .setTimestamp()
      .setFooter({ text: 'Community Discord Bot' });

    const categoryOrder = ['info', 'moderation', 'utility', 'fun', 'community', 'other'];
    for (const cat of categoryOrder) {
      if (!categories[cat] || categories[cat].length === 0) continue;
      const icon = CATEGORY_ICONS[cat] || '📁';
      const cmdList = categories[cat].map(c => `\`/${c.name}\``).join(', ');
      embed.addFields({ name: `${icon} ${cat.charAt(0).toUpperCase() + cat.slice(1)}`, value: cmdList, inline: false });
    }

    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
