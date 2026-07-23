const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const config = require('../../config');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('serverinfo')
    .setDescription('View information about this server'),
  async execute(interaction) {
    const { guild } = interaction;
    const embed = new EmbedBuilder()
      .setColor(config.embedColors.primary)
      .setTitle(guild.name)
      .setThumbnail(guild.iconURL({ dynamic: true, size: 256 }))
      .addFields(
        { name: 'Owner', value: `<@${guild.ownerId}>`, inline: true },
        { name: 'Members', value: `${guild.memberCount}`, inline: true },
        { name: 'Created', value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:R>`, inline: true },
        { name: 'Channels', value: `${guild.channels.cache.size}`, inline: true },
        { name: 'Roles', value: `${guild.roles.cache.size}`, inline: true },
        { name: 'Boost Level', value: `Level ${guild.premiumTier}`, inline: true },
      )
      .setTimestamp();

    if (guild.bannerURL()) embed.setImage(guild.bannerURL({ size: 512 }));

    await interaction.reply({ embeds: [embed] });
  },
};
