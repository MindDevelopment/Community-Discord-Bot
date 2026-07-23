const fs = require('fs');
const path = require('path');
const client = require('../client');
const logger = require('../utils/logger');

function init() {
  const eventsPath = path.join(__dirname, '..', 'events');
  const eventFiles = fs.readdirSync(eventsPath).filter(f => f.endsWith('.js'));

  for (const file of eventFiles) {
    try {
      const event = require(path.join(eventsPath, file));

      if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
      } else {
        client.on(event.name, (...args) => event.execute(...args));
      }

      logger.debug(`Loaded event: ${event.name}`);
    } catch (err) {
      logger.error(`Error loading event ${file}: ${err.message}`);
    }
  }

  logger.info(`Loaded ${eventFiles.length} events`);
}

module.exports = { init };
