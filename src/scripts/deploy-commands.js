require('dotenv').config();
const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');
const config = require('../config');
const logger = require('../utils/logger');

const commands = [];

function loadCommands(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!config.setupEnabled && entry.name === 'setup') {
        logger.info('Skipping setup commands (SETUP_ENABLED=false)');
        continue;
      }
      loadCommands(fullPath);
    } else if (entry.name.endsWith('.js')) {
      try {
        const command = require(fullPath);
        if ('data' in command) {
          commands.push(command.data.toJSON());
        }
      } catch (err) {
        logger.error(`Error loading ${fullPath}: ${err.message}`);
      }
    }
  }
}

const commandsPath = path.join(__dirname, '..', 'commands');
loadCommands(commandsPath);

const rest = new REST({ version: '10' }).setToken(config.token);

(async () => {
  try {
    logger.info(`Deploying ${commands.length} commands...`);

    if (config.guildId) {
      await rest.put(
        Routes.applicationGuildCommands(config.clientId, config.guildId),
        { body: commands }
      );
      logger.info(`Deployed to guild ${config.guildId}`);
    } else {
      await rest.put(
        Routes.applicationCommands(config.clientId),
        { body: commands }
      );
      logger.info('Deployed globally');
    }
  } catch (err) {
    logger.error(`Deploy failed: ${err.message}`);
    process.exit(1);
  }
})();
