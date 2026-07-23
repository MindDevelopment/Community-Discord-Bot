require('dotenv').config();

const config = {
  token: process.env.DISCORD_TOKEN,
  clientId: process.env.CLIENT_ID,
  guildId: process.env.GUILD_ID,
  prefix: process.env.PREFIX || '!',
  dbPath: process.env.DB_PATH || './data/database.sqlite',
  logLevel: process.env.LOG_LEVEL || 'INFO',

  embedColors: {
    primary: 0x5865F2,
    success: 0x57F287,
    warning: 0xFEE75C,
    error: 0xED4245,
    info: 0x5865F2,
  },

  limits: {
    dailyWarnings: 3,
    maxWarnings: 10,
    clearMax: 100,
    suggestMaxLength: 1000,
    reportMaxLength: 1500,
  },

  channels: {
    suggestions: '💡-suggesties',
    reports: '🚨-reports',
    welcome: '📬-welkom',
    leave: '👋-vaarwel',
    modlogs: '📋-modlogs',
    botlogs: '🤖-botlogs',
    announcements: '📢-mededelingen',
  },

  setupEnabled: process.env.SETUP_ENABLED === 'true',
};

module.exports = config;
