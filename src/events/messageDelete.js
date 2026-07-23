const { EmbedBuilder } = require('discord.js');
const client = require('../client');
const logger = require('../utils/logger');
const config = require('../config');

module.exports = {
  name: 'messageDelete',
  async execute(message) {
    if (message.partial) {
      try {
        await message.fetch();
      } catch {
        return;
      }
    }

    if (message.author?.bot) return;

    const channel = message.guild?.channels.cache.find(
      c => c.name === config.channels.modlogs
    );
    if (!channel) return;

    const embed = new EmbedBuilder()
      .setColor(config.embedColors.error)
      .setAuthor({ name: message.author?.tag || 'Unknown', iconURL: message.author?.displayAvatarURL({ dynamic: true }) })
      .setDescription(`**Message deleted in** ${message.channel}`)
      .addFields(
        { name: 'Content', value: message.content ? `${message.content.slice(0, 1024)}` : '*No content (uncached message)*', inline: false },
        { name: 'Channel', value: `${message.channel}`, inline: true },
        { name: 'Message ID', value: message.id, inline: true },
      )
      .setFooter({ text: `Author ID: ${message.author?.id || 'Unknown'}` })
      .setTimestamp();

    await channel.send({ embeds: [embed] }).catch(err => {
      logger.error(`Failed to send messageDelete log: ${err.message}`);
    });
  },
};
