const { SlashCommandBuilder, PermissionFlagsBits, ChannelType, PermissionsBitField } = require('discord.js');
const db = require('../../database/queries');
const embed = require('../../utils/embed');

const CHANNELS = [
  { name: '📬-welkom', topic: 'Welkom berichten voor nieuwe leden', type: 'public' },
  { name: '👋-vaarwel', topic: 'Berichten wanneer leden vertrekken', type: 'public' },
  { name: '📋-modlogs', topic: 'Logs van moderatie acties (kicks, bans, warns, timeouts)', type: 'private' },
  { name: '💡-suggesties', topic: 'Deel je suggesties voor de server', type: 'public' },
  { name: '🚨-reports', topic: 'Rapporteer leden aan het moderatie team', type: 'private' },
  { name: '🤖-botlogs', topic: 'Algemene bot logs, errors en systeemmeldingen', type: 'private' },
  { name: '📢-mededelingen', topic: 'Server aankondigingen en belangrijke updates', type: 'public' },
];

module.exports = {
  hidden: true,
  data: new SlashCommandBuilder()
    .setName('setup-logs')
    .setDescription('Setup all logging channels for the server')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const setupDone = db.settings.get(interaction.guildId, 'setup_completed');

    if (setupDone === 'true') {
      return interaction.reply({
        embeds: [embed.warning('Setup Al Done', 'Server setup is already completed.\nTo re-run, set `SETUP_ENABLED=true` in `.env`, delete the `setup_completed` setting from the database, and re-deploy.')],
        ephemeral: true,
      });
    }

    await interaction.deferReply({ ephemeral: true });

    const created = [];
    const skipped = [];

    for (const chan of CHANNELS) {
      const exists = interaction.guild.channels.cache.find(c => c.name === chan.name);

      if (exists) {
        skipped.push(chan.name);
        continue;
      }

      const overwrites = [
        {
          id: interaction.guild.roles.everyone.id,
          deny: chan.type === 'private'
            ? [PermissionsBitField.Flags.ViewChannel]
            : [],
        },
      ];

      try {
        await interaction.guild.channels.create({
          name: chan.name,
          type: ChannelType.GuildText,
          topic: chan.topic,
          permissionOverwrites: overwrites,
        });
        created.push(chan.name);
      } catch (err) {
        interaction.client.logger.error(`Failed to create channel ${chan.name}: ${err.message}`);
      }
    }

    db.settings.set(interaction.guildId, 'setup_completed', 'true');

    const embedDesc = [];
    if (created.length > 0) {
      embedDesc.push('**✅ Created channels:**');
      embedDesc.push(created.map(n => `• ${n}`).join('\n'));
    }
    if (skipped.length > 0) {
      embedDesc.push('**⏭️ Already exist (skipped):**');
      embedDesc.push(skipped.map(n => `• ${n}`).join('\n'));
    }

    await interaction.editReply({
      embeds: [embed.success('Server Setup Complete', embedDesc.join('\n\n') || 'All channels already exist.')],
    });
  },
};
