const config = require('../config');

const levels = { DEBUG: 0, INFO: 1, WARN: 2, ERROR: 3 };
const levelNames = ['DEBUG', 'INFO', 'WARN', 'ERROR'];

function timestamp() {
  return new Date().toISOString();
}

function format(level, message, meta) {
  const metaStr = meta ? ` ${JSON.stringify(meta)}` : '';
  return `[${timestamp()}] [${level}] ${message}${metaStr}`;
}

function log(level, message, meta) {
  if (levels[level] >= (levels[config.logLevel] || 1)) {
    const formatted = format(level, message, meta);
    if (level === 'ERROR') console.error(formatted);
    else if (level === 'WARN') console.warn(formatted);
    else console.log(formatted);
  }
}

const logger = {
  debug: (msg, meta) => log('DEBUG', msg, meta),
  info: (msg, meta) => log('INFO', msg, meta),
  warn: (msg, meta) => log('WARN', msg, meta),
  error: (msg, meta) => log('ERROR', msg, meta),
};

module.exports = logger;
