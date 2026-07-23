require('dotenv').config();

const client = require('./client');
const commandHandler = require('./handlers/commandHandler');
const eventHandler = require('./handlers/eventHandler');
const logger = require('./utils/logger');

process.on('unhandledRejection', (err) => {
  logger.error(`Unhandled rejection: ${err.message}`, { stack: err.stack });
});

process.on('uncaughtException', (err) => {
  logger.error(`Uncaught exception: ${err.message}`, { stack: err.stack });
  process.exit(1);
});

commandHandler.init();
eventHandler.init();

client.login(client.config.token).catch((err) => {
  logger.error(`Failed to login: ${err.message}`);
  process.exit(1);
});
