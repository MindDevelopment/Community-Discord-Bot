const db = require('./sqlite');

module.exports = {
  warnings: {
    add(userId, guildId, moderatorId, reason) {
      const stmt = db.prepare(
        'INSERT INTO warnings (user_id, guild_id, moderator_id, reason) VALUES (?, ?, ?, ?)'
      );
      return stmt.run(userId, guildId, moderatorId, reason);
    },

    count(userId, guildId) {
      const stmt = db.prepare(
        'SELECT COUNT(*) as count FROM warnings WHERE user_id = ? AND guild_id = ?'
      );
      return stmt.get(userId, guildId).count;
    },

    list(userId, guildId) {
      const stmt = db.prepare(
        'SELECT * FROM warnings WHERE user_id = ? AND guild_id = ? ORDER BY created_at DESC'
      );
      return stmt.all(userId, guildId);
    },

    remove(id) {
      const stmt = db.prepare('DELETE FROM warnings WHERE id = ?');
      return stmt.run(id);
    },

    clear(userId, guildId) {
      const stmt = db.prepare('DELETE FROM warnings WHERE user_id = ? AND guild_id = ?');
      return stmt.run(userId, guildId);
    },
  },

  suggestions: {
    create(messageId, authorId, guildId, content) {
      const stmt = db.prepare(
        'INSERT OR IGNORE INTO suggestions (message_id, author_id, guild_id, content) VALUES (?, ?, ?, ?)'
      );
      return stmt.run(messageId, authorId, guildId, content);
    },

    updateStatus(messageId, status) {
      const stmt = db.prepare('UPDATE suggestions SET status = ? WHERE message_id = ?');
      return stmt.run(status, messageId);
    },

    list(guildId, status) {
      if (status) {
        const stmt = db.prepare(
          'SELECT * FROM suggestions WHERE guild_id = ? AND status = ? ORDER BY created_at DESC'
        );
        return stmt.all(guildId, status);
      }
      const stmt = db.prepare(
        'SELECT * FROM suggestions WHERE guild_id = ? ORDER BY created_at DESC'
      );
      return stmt.all(guildId);
    },
  },

  reports: {
    create(messageId, reporterId, targetId, guildId, reason) {
      const stmt = db.prepare(
        'INSERT OR IGNORE INTO reports (message_id, reporter_id, target_id, guild_id, reason) VALUES (?, ?, ?, ?, ?)'
      );
      return stmt.run(messageId, reporterId, targetId, guildId, reason);
    },

    updateStatus(messageId, status) {
      const stmt = db.prepare('UPDATE reports SET status = ? WHERE message_id = ?');
      return stmt.run(status, messageId);
    },

    list(guildId, status) {
      if (status) {
        const stmt = db.prepare(
          'SELECT * FROM reports WHERE guild_id = ? AND status = ? ORDER BY created_at DESC'
        );
        return stmt.all(guildId, status);
      }
      const stmt = db.prepare(
        'SELECT * FROM reports WHERE guild_id = ? ORDER BY created_at DESC'
      );
      return stmt.all(guildId);
    },
  },

  settings: {
    get(guildId, key) {
      const stmt = db.prepare('SELECT value FROM settings WHERE guild_id = ? AND key = ?');
      const row = stmt.get(guildId, key);
      return row ? row.value : null;
    },

    set(guildId, key, value) {
      const stmt = db.prepare(
        'INSERT OR REPLACE INTO settings (guild_id, key, value) VALUES (?, ?, ?)'
      );
      return stmt.run(guildId, key, value);
    },

    delete(guildId, key) {
      const stmt = db.prepare('DELETE FROM settings WHERE guild_id = ? AND key = ?');
      return stmt.run(guildId, key);
    },
  },
};
