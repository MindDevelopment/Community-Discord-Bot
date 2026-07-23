const { EmbedBuilder } = require('discord.js');
const client = require('../client');
const logger = require('../utils/logger');
const config = require('../config');

module.exports = {
  name: 'guildMemberRemove',
  async execute(member) {
    const channel = member.guild.channels.cache.find(
      c => c.name === config.channels.leave
    );
    if (!channel) return;

    const roles = member.roles.cache.filter(r => r.id !== member.guild.id).map(r => r.toString());

    const embed = new EmbedBuilder()
      .setColor(config.embedColors.error)
      .setTitle('Member Left')
      .setDescription(`${member.user.tag} has left the server.`)
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .addFields(
        { name: 'Member Count', value: `${member.guild.memberCount}`, inline: true },
        { name: 'Joined Server', value: member.joinedTimestamp ? `<t:${Math.floor(member.joinedTimestamp / 1000)}:R>` : 'Unknown', inline: true },
        { name: 'Account Created', value: `<t:${Math.floor(member.user.createdTimestamp / 1000)}:R>`, inline: true },
      )
      .setFooter({ text: `ID: ${member.user.id}` })
      .setTimestamp();

    if (roles.length > 0) {
      embed.addFields({ name: `Roles (${roles.length})`, value: roles.join(', ').slice(0, 1024), inline: false });
    }

    try {
      await channel.send({ embeds: [embed] });
      logger.info(`Leave message logged for ${member.user.tag}`);
    } catch (err) {
      logger.error(`Leave message failed: ${err.message}`);
    }
  },
};
