const fs = require('fs');
const path = require('path');
const client = require('../client');
const logger = require('../utils/logger');

function loadCommands(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (!client.config.setupEnabled && entry.name === 'setup') {
        client.logger.info('Skipping setup commands (SETUP_ENABLED=false)');
        continue;
      }
      loadCommands(fullPath);
    } else if (entry.name.endsWith('.js')) {
      try {
        const command = require(fullPath);
        if ('data' in command && 'execute' in command) {
          command.category = path.basename(path.dirname(fullPath));
          client.commands.set(command.data.name, command);
          logger.debug(`Loaded command: ${command.data.name}`);
        } else {
          logger.warn(`Invalid command file: ${fullPath}`);
        }
      } catch (err) {
        logger.error(`Error loading command ${fullPath}: ${err.message}`);
      }
    }
  }
}

function init() {
  const commandsPath = path.join(__dirname, '..', 'commands');
  loadCommands(commandsPath);
  logger.info(`Loaded ${client.commands.size} commands`);
}

module.exports = { init };
