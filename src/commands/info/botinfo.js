const { SlashCommandBuilder, EmbedBuilder, version } = require('discord.js');
const config = require('../../config');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('botinfo')
    .setDescription('View bot information and statistics'),
  async execute(interaction) {
    const { client } = interaction;
    const uptime = Math.floor(client.uptime / 1000);
    const days = Math.floor(uptime / 86400);
    const hours = Math.floor((uptime % 86400) / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);

    const embed = new EmbedBuilder()
      .setColor(config.embedColors.primary)
      .setTitle('🤖 Bot Information')
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
      .addFields(
        { name: 'Name', value: client.user.tag, inline: true },
        { name: 'ID', value: client.user.id, inline: true },
        { name: 'Uptime', value: `${days}d ${hours}h ${minutes}m`, inline: true },
        { name: 'Servers', value: `${client.guilds.cache.size}`, inline: true },
        { name: 'Users', value: `${client.users.cache.size}`, inline: true },
        { name: 'Commands', value: `${client.commands.size}`, inline: true },
        { name: 'Discord.js', value: `v${version}`, inline: true },
        { name: 'Node.js', value: process.version, inline: true },
      )
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
