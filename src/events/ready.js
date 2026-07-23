const client = require('../client');
const logger = require('../utils/logger');

module.exports = {
  name: 'ready',
  once: true,
  execute() {
    logger.info(`Logged in as ${client.user.tag}`);
    client.user.setPresence({
      activities: [{ name: '/help | Community Bot', type: 3 }],
      status: 'online',
    });
  },
};
