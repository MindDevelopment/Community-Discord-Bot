const { EmbedBuilder } = require('discord.js');
const config = require('../config');

function base(title, description, color = config.embedColors.primary) {
  return new EmbedBuilder()
    .setColor(color)
    .setTitle(title)
    .setDescription(description)
    .setTimestamp();
}

function success(title, description) {
  return base(title, description, config.embedColors.success)
    .setFooter({ text: '✅ Success' });
}

function warning(title, description) {
  return base(title, description, config.embedColors.warning)
    .setFooter({ text: '⚠️ Warning' });
}

function error(title, description) {
  return base(title, description, config.embedColors.error)
    .setFooter({ text: '❌ Error' });
}

function info(title, description) {
  return base(title, description, config.embedColors.info)
    .setFooter({ text: 'ℹ️ Info' });
}

function paginated(items, itemsPerPage, title, color) {
  const pages = [];
  for (let i = 0; i < items.length; i += itemsPerPage) {
    const chunk = items.slice(i, i + itemsPerPage);
    pages.push(
      new EmbedBuilder()
        .setColor(color || config.embedColors.primary)
        .setTitle(title)
        .setDescription(chunk.join('\n'))
        .setFooter({ text: `Page ${pages.length + 1}/${Math.ceil(items.length / itemsPerPage)}` })
        .setTimestamp()
    );
  }
  return pages;
}

module.exports = { base, success, warning, error, info, paginated };
