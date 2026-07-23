# Module Structure

```
Community-Discord-Bot/
├── src/
│   ├── index.js                 # Entry point
│   ├── client.js                # Discord client setup
│   ├── config.js                # Central configuration
│   ├── scripts/
│   │   └── deploy-commands.js   # Slash command registration
│   ├── handlers/
│   │   ├── commandHandler.js    # Auto-loads commands from subdirectories
│   │   └── eventHandler.js      # Auto-loads events from events/
│   ├── commands/
│   │   ├── info/                # General info commands
│   │   │   ├── ping.js
│   │   │   ├── help.js
│   │   │   └── botinfo.js
│   │   ├── moderation/          # Moderation & admin commands
│   │   │   ├── kick.js
│   │   │   ├── ban.js
│   │   │   ├── clear.js
│   │   │   ├── timeout.js
│   │   │   ├── warn.js
│   │   │   ├── warnings.js
│   │   │   └── unwarn.js
│   │   ├── utility/             # Utility commands
│   │   │   ├── serverinfo.js
│   │   │   ├── userinfo.js
│   │   │   └── avatar.js
│   │   ├── fun/                 # Fun/entertainment commands
│   │   │   ├── 8ball.js
│   │   │   └── roll.js
│   │   └── community/           # Community interaction commands
│   │       ├── suggest.js
│   │       └── report.js
│   ├── events/
│   │   ├── ready.js             # Bot startup event
│   │   ├── interactionCreate.js # Slash command interaction handling
│   │   └── guildMemberAdd.js    # Welcome message on member join
│   ├── utils/
│   │   ├── logger.js            # Structured logging (DEBUG/INFO/WARN/ERROR)
│   │   ├── embed.js             # Embed builder helpers
│   │   └── permissions.js       # Permission level system
│   └── database/
│       ├── sqlite.js            # Database initialization & connection
│       └── queries.js           # Database query functions (warnings, suggestions, reports, settings)
├── data/
│   └── database.sqlite          # SQLite database (auto-created)
├── Dev/                         # Development files (not on GitHub)
├── Docs/
│   ├── INSTALL.md
│   ├── CONFIGURATION.md
│   ├── COMMANDS.md
│   ├── MODULES.md
│   └── CONTRIBUTING.md
├── CHANGELOGS/
│   └── v1.0.0.md
├── .env                         # Environment variables (not tracked)
├── .env.example                 # Example environment template
├── package.json
└── README.md
```

## Key Architecture Decisions

### Command Handler
Commands are auto-loaded from `src/commands/` and its subdirectories. Each command file must export:
- `data` — SlashCommandBuilder instance
- `execute(interaction)` — Command execution function
- `cooldown` (optional) — Cooldown in seconds

### Event Handler
Events are auto-loaded from `src/events/`. Each event file must export:
- `name` — Discord event name
- `once` (optional) — Whether to run only once
- `execute(...args)` — Event handler function

### Database
SQLite via `better-sqlite3`. The database stores warnings, suggestions, reports, and guild settings. All queries are organized in `src/database/queries.js` with a clean API per entity.

### Adding a New Command
1. Create a file in the appropriate `src/commands/<category>/` directory
2. Export `data` (SlashCommandBuilder) and `execute` function
3. Run `npm run deploy` to register the command
