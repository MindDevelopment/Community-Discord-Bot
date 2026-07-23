const { EmbedBuilder } = require('discord.js');
const client = require('../client');
const logger = require('../utils/logger');
const config = require('../config');

module.exports = {
  name: 'messageUpdate',
  async execute(oldMessage, newMessage) {
    if (newMessage.partial) {
      try {
        await newMessage.fetch();
      } catch {
        return;
      }
    }

    if (newMessage.author?.bot) return;
    if (oldMessage.content === newMessage.content) return;

    const channel = newMessage.guild?.channels.cache.find(
      c => c.name === config.channels.modlogs
    );
    if (!channel) return;

    const embed = new EmbedBuilder()
      .setColor(config.embedColors.warning)
      .setAuthor({ name: newMessage.author?.tag || 'Unknown', iconURL: newMessage.author?.displayAvatarURL({ dynamic: true }) })
      .setDescription(`**Message edited in** ${newMessage.channel} ([Jump](${newMessage.url}))`)
      .addFields(
        { name: 'Before', value: oldMessage.content ? `${oldMessage.content.slice(0, 1024)}` : '*No content*', inline: false },
        { name: 'After', value: newMessage.content ? `${newMessage.content.slice(0, 1024)}` : '*No content*', inline: false },
        { name: 'Channel', value: `${newMessage.channel}`, inline: true },
        { name: 'Message ID', value: newMessage.id, inline: true },
      )
      .setFooter({ text: `Author ID: ${newMessage.author?.id || 'Unknown'}` })
      .setTimestamp();

    await channel.send({ embeds: [embed] }).catch(err => {
      logger.error(`Failed to send messageUpdate log: ${err.message}`);
    });
  },
};
