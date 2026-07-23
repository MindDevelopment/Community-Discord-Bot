const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const config = require('../../config');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('userinfo')
    .setDescription('View information about a user')
    .addUserOption(option =>
      option.setName('target').setDescription('The user to inspect')),
  async execute(interaction) {
    const target = interaction.options.getUser('target') || interaction.user;
    const member = await interaction.guild.members.fetch(target.id).catch(() => null);

    const embed = new EmbedBuilder()
      .setColor(config.embedColors.primary)
      .setTitle(target.tag)
      .setThumbnail(target.displayAvatarURL({ dynamic: true, size: 256 }))
      .addFields(
        { name: 'ID', value: target.id, inline: true },
        { name: 'Bot', value: target.bot ? 'Yes' : 'No', inline: true },
        { name: 'Account Created', value: `<t:${Math.floor(target.createdTimestamp / 1000)}:R>`, inline: true },
      );

    if (member) {
      embed.addFields(
        { name: 'Joined Server', value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:R>`, inline: true },
        { name: 'Roles', value: member.roles.cache.filter(r => r.id !== interaction.guild.id).map(r => r.toString()).join(' ') || 'None', inline: false },
      );
    }

    await interaction.reply({ embeds: [embed] });
  },
};
