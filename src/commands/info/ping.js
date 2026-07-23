const { SlashCommandBuilder } = require('discord.js');
const embed = require('../../utils/embed');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Check the bot latency'),
  cooldown: 5,
  async execute(interaction) {
    const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
    const roundtrip = sent.createdTimestamp - interaction.createdTimestamp;

    const e = embed.info('🏓 Pong!', [
      `**Roundtrip:** ${roundtrip}ms`,
      `**WebSocket:** ${interaction.client.ws.ping}ms`,
    ].join('\n'));

    await interaction.editReply({ content: null, embeds: [e] });
  },
};
