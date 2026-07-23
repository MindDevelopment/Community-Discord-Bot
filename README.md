# Community Discord Bot

<p align="center">
  <strong>A feature-rich Discord bot for community servers</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-1.0.0-blue.svg" alt="Version">
  <img src="https://img.shields.io/badge/node-%3E%3D18-green.svg" alt="Node.js">
  <img src="https://img.shields.io/badge/discord.js-v14-purple.svg" alt="discord.js">
  <img src="https://img.shields.io/badge/license-MIT-yellow.svg" alt="License">
</p>

---

Community Discord Bot is a modular, fully-featured bot built with discord.js v14. It includes moderation tools, community interaction features, utility commands, and fun commands — all with SQLite persistence and slash command support.

## Features

- **Slash Commands** — Modern Discord interaction system with full typing
- **Moderation Suite** — Kick, ban, timeout, clear, warning system with database persistence
- **Community Tools** — Suggestions with voting, member reporting system
- **Server Info** — Server stats, user info, avatar viewer
- **Fun Commands** — 8-ball, dice roller
- **SQLite Database** — Persistent storage for warnings, suggestions, reports, and settings
- **Modular Design** — Auto-loading commands/events, easy to extend
- **Cooldown System** — Per-command rate limiting
- **Welcome Messages** — Automatic greeting for new members
- **Logging** — Structured logging with severity levels

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- A [Discord Application](https://discord.com/developers/applications) with bot token

## Quick Start

```bash
git clone https://github.com/MindDevelopment/Community-Discord-Bot.git
cd Community-Discord-Bot
npm install
cp .env.example .env
# Edit .env with your bot token and client ID
npm run deploy
npm start
```

## File Structure

```
Community-Discord-Bot/
├── src/
│   ├── index.js               # Entry point
│   ├── client.js              # Discord client setup
│   ├── config.js              # Configuration
│   ├── scripts/               # Utility scripts
│   ├── handlers/              # Command & event loaders
│   ├── commands/              # Slash commands by category
│   ├── events/                # Discord event handlers
│   ├── utils/                 # Logger, embed builder, permissions
│   └── database/              # SQLite connection & queries
├── Docs/                      # Documentation
├── CHANGELOGS/                # Version history
├── Dev/                       # Development files (not tracked)
├── data/                      # Database files (auto-created)
├── .env.example               # Environment template
└── package.json
```

## Commands

| Category | Commands |
|----------|----------|
| ℹ️ Info | `/ping`, `/help`, `/botinfo` |
| 🛡️ Moderation | `/kick`, `/ban`, `/clear`, `/timeout`, `/warn`, `/warnings`, `/unwarn` |
| 🔧 Utility | `/serverinfo`, `/userinfo`, `/avatar` |
| 🎮 Fun | `/8ball`, `/roll` |
| 💬 Community | `/suggest`, `/report` |

## Documentation

| Document | Description |
|----------|-------------|
| [INSTALL.md](Docs/INSTALL.md) | Complete installation and setup guide |
| [CONFIGURATION.md](Docs/CONFIGURATION.md) | Configuration reference for `.env` and `config.js` |
| [COMMANDS.md](Docs/COMMANDS.md) | Full command reference with options and permissions |
| [MODULES.md](Docs/MODULES.md) | Project structure and architecture documentation |
| [CONTRIBUTING.md](Docs/CONTRIBUTING.md) | Guidelines for contributing to the project |

## Changelog

See [CHANGELOGS/v1.0.0.md](CHANGELOGS/v1.0.0.md) for the initial release notes.

## License

MIT

---

<p align="center">
  <sub>Built with discord.js v14, SQLite, and a love for clean code.</sub>
</p>
