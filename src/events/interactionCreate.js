const client = require('../client');
const logger = require('../utils/logger');
const { permissionLevels } = require('../utils/permissions');

module.exports = {
  name: 'interactionCreate',
  async execute(interaction) {
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (!command) {
        return interaction.reply({
          content: 'This command is currently disabled or unavailable.',
          ephemeral: true,
        }).catch(() => {});
      }

      if (command.cooldown) {
        const cooldowns = client.cooldowns;
        if (!cooldowns.has(command.data.name)) {
          cooldowns.set(command.data.name, new Map());
        }

        const now = Date.now();
        const timestamps = cooldowns.get(command.data.name);
        const cooldownAmount = (command.cooldown || 3) * 1000;

        if (timestamps.has(interaction.user.id)) {
          const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;
          if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return interaction.reply({
              content: `Please wait ${timeLeft.toFixed(1)}s before using this command again.`,
              ephemeral: true,
            });
          }
        }

        timestamps.set(interaction.user.id, now);
        setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);
      }

      try {
        logger.debug(`${interaction.user.tag} used /${command.data.name}`);
        await command.execute(interaction);
      } catch (err) {
        logger.error(`Error executing /${command.data.name}: ${err.message}`);
        const reply = {
          content: 'An error occurred while executing this command.',
          ephemeral: true,
        };
        if (interaction.replied || interaction.deferred) {
          await interaction.followUp(reply);
        } else {
          await interaction.reply(reply);
        }
      }
    }
  },
};
