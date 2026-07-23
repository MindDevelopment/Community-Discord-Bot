const { EmbedBuilder } = require('discord.js');
const client = require('../client');
const logger = require('../utils/logger');
const config = require('../config');

module.exports = {
  name: 'guildMemberAdd',
  async execute(member) {
    const channel = member.guild.channels.cache.find(
      c => c.name === config.channels.welcome
    );
    if (!channel) return;

    const embed = new EmbedBuilder()
      .setColor(config.embedColors.success)
      .setTitle('Welcome to the Community!')
      .setDescription(`Welcome ${member}, we're glad to have you!`)
      .addFields(
        { name: 'Member Count', value: `${member.guild.memberCount}`, inline: true },
        { name: 'Account Created', value: `<t:${Math.floor(member.user.createdTimestamp / 1000)}:R>`, inline: true }
      )
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .setTimestamp();

    try {
      await channel.send({ embeds: [embed] });
      logger.info(`Welcome message sent to ${member.user.tag}`);
    } catch (err) {
      logger.error(`Welcome message failed: ${err.message}`);
    }
  },
};
