const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const config = require('./config');
const logger = require('./utils/logger');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.GuildMessageReactions,
  ],
  partials: [
    Partials.Message,
    Partials.Channel,
    Partials.Reaction,
  ],
});

client.commands = new Collection();
client.cooldowns = new Collection();
client.config = config;
client.logger = logger;

module.exports = client;
