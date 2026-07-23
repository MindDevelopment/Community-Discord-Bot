const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const config = require('../../config');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription('View a user avatar')
    .addUserOption(option =>
      option.setName('target').setDescription('The user whose avatar to view')),
  async execute(interaction) {
    const target = interaction.options.getUser('target') || interaction.user;

    const embed = new EmbedBuilder()
      .setColor(config.embedColors.primary)
      .setTitle(`${target.tag}'s Avatar`)
      .setImage(target.displayAvatarURL({ dynamic: true, size: 512 }))
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
