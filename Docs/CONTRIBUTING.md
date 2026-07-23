# Contributing

We welcome contributions! Follow these guidelines to keep the project organized.

## Getting Started

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Code Style

- **JavaScript:** ES6+ with CommonJS modules
- **Naming:** camelCase for variables/functions, PascalCase for classes
- **Formatting:** 2-space indentation, semicolons required
- **Quotes:** Single quotes for strings, template literals for interpolation

## Command Structure

Each command file must export:

```js
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('commandname')
    .setDescription('Description'),
  cooldown: 5, // seconds, optional
  async execute(interaction) {
    // Command logic
  },
};
```

## Event Structure

Each event file must export:

```js
module.exports = {
  name: 'eventName',
  once: false, // optional
  async execute(...args) {
    // Event logic
  },
};
```

## Pull Request Process

1. Update `Docs/COMMANDS.md` if you added or modified commands
2. Add a changelog entry in `CHANGELOGS/`
3. Ensure the bot starts without errors
4. Run `npm run deploy` to verify command registration

## Folder Conventions

| Folder | Purpose |
|--------|---------|
| `src/commands/` | One file per command, organized by category |
| `src/events/` | One file per Discord event |
| `src/utils/` | Shared utilities and helpers |
| `src/database/` | Database connection and query functions |
| `Docs/` | All documentation files |
| `CHANGELOGS/` | Version release notes |
