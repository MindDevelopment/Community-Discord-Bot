# Installation Guide

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [npm](https://www.npmjs.com/) v9 or higher
- A [Discord Application](https://discord.com/developers/applications) with a bot token

## Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/Community-Discord-Bot.git
cd Community-Discord-Bot
```

## Step 2: Install Dependencies

```bash
npm install
```

## Step 3: Configure Environment

Copy the example environment file and fill in your values:

```bash
cp .env.example .env
```

Edit `.env` with your bot credentials:

```
DISCORD_TOKEN=your_bot_token_here
CLIENT_ID=your_client_id_here
GUILD_ID=your_guild_id_here
PREFIX=!
LOG_LEVEL=INFO
```

| Variable | Description | Required |
|----------|-------------|----------|
| `DISCORD_TOKEN` | Your bot token from Discord Developer Portal | Yes |
| `CLIENT_ID` | Application ID of your bot | Yes |
| `GUILD_ID` | Server ID for guild-specific commands | No |
| `PREFIX` | Prefix for legacy commands (if implemented) | No |
| `DB_PATH` | Path to SQLite database file | No |
| `LOG_LEVEL` | Logging severity: `DEBUG`, `INFO`, `WARN`, `ERROR` | No |

## Step 4: Deploy Slash Commands

```bash
npm run deploy
```

This registers all slash commands with Discord. If `GUILD_ID` is set, commands deploy instantly to that guild. Otherwise, global deployment can take up to an hour.

## Step 5: Invite the Bot

Generate an invite link in the Discord Developer Portal with these permissions:

- `Send Messages`
- `Embed Links`
- `Read Message History`
- `Kick Members` (moderation)
- `Ban Members` (moderation)
- `Moderate Members` (timeout)
- `Manage Messages` (clear command)

## Step 6: Start the Bot

```bash
npm start
```

## Step 7: Create Required Channels

The bot expects certain channels by default. Create these text channels in your server:

| Channel Name | Purpose |
|-------------|---------|
| `suggesties` | Suggestion submission channel |
| `reports` | Member reports (mod-only) |
| `welkom` | Welcome messages for new members |
| `logs` | Moderation and system logs |

## Running with PM2 (Production)

```bash
npm install -g pm2
pm2 start src/index.js --name community-bot
pm2 save
pm2 startup
```
