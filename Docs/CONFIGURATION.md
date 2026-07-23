# Configuration Reference

## Environment Variables (`.env`)

| Variable | Default | Description |
|----------|---------|-------------|
| `DISCORD_TOKEN` | — | Bot token from Discord Developer Portal |
| `CLIENT_ID` | — | Application ID for slash command registration |
| `GUILD_ID` | — | Guild ID for instant command deployment (development) |
| `PREFIX` | `!` | Command prefix for legacy message commands |
| `DB_PATH` | `./data/database.sqlite` | Path to SQLite database file |
| `LOG_LEVEL` | `INFO` | Log level: `DEBUG`, `INFO`, `WARN`, `ERROR` |

## Bot Configuration (`src/config.js`)

The `config.js` file centralizes all configurable bot settings:

### `embedColors`
Embed color presets used throughout the bot:

| Key | Color | Hex |
|-----|-------|-----|
| `primary` | Blurple | `#5865F2` |
| `success` | Green | `#57F287` |
| `warning` | Yellow | `#FEE75C` |
| `error` | Red | `#ED4245` |
| `info` | Blurple | `#5865F2` |

### `limits`
Command-specific limits:

| Key | Default | Description |
|-----|---------|-------------|
| `dailyWarnings` | `3` | Max warnings per user per day |
| `maxWarnings` | `10` | Max total warnings before action |
| `clearMax` | `100` | Max messages per clear command |
| `suggestMaxLength` | `1000` | Max characters for suggestions |
| `reportMaxLength` | `1500` | Max characters for reports |

### `channels`
Expected channel names (create these in your server):

| Key | Default | Purpose |
|-----|---------|---------|
| `suggestions` | `suggesties` | Where `/suggest` posts go |
| `reports` | `reports` | Where `/report` posts go |
| `welcome` | `welkom` | Welcome messages for new members |
| `logs` | `logs` | Moderation action logs |

## Database

The bot uses SQLite via `better-sqlite3`. The database file is created automatically at `DB_PATH`.

### Tables

| Table | Purpose |
|-------|---------|
| `warnings` | Member warnings with moderator info |
| `suggestions` | Community suggestions with status |
| `reports` | Member reports with status tracking |
| `settings` | Guild-specific key-value settings |

## Changing Channel Names

To use different channel names, edit `config.channels` in `src/config.js`:

```js
channels: {
  suggestions: 'ideas',       // instead of 'suggesties'
  reports: 'mod-reports',     // instead of 'reports'
  welcome: 'hello',           // instead of 'welkom'
  logs: 'audit-log',          // instead of 'logs'
}
```
