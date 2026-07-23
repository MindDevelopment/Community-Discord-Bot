const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const config = require('../../config');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Show all available commands'),
  async execute(interaction) {
    const categories = {};
    for (const [, cmd] of interaction.client.commands) {
      const category = cmd.data.name;
      const catName = cmd.category || 'General';
      if (!categories[catName]) categories[catName] = [];
      categories[catName].push(cmd.data);
    }

    const embed = new EmbedBuilder()
      .setColor(config.embedColors.primary)
      .setTitle('📚 Bot Commands')
      .setDescription('Here are all available commands:')
      .setTimestamp()
      .setFooter({ text: 'Community Discord Bot' });

    embed.addFields(
      { name: 'ℹ️ Info', value: '`/ping`, `/help`, `/botinfo`', inline: false },
      { name: '🛡️ Moderation', value: '`/kick`, `/ban`, `/clear`, `/timeout`, `/warn`, `/warnings`', inline: false },
      { name: '🔧 Utility', value: '`/serverinfo`, `/userinfo`, `/avatar`', inline: false },
      { name: '🎮 Fun', value: '`/8ball`, `/roll`', inline: false },
      { name: '💬 Community', value: '`/suggest`, `/report`', inline: false }
    );

    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
