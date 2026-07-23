# Command Reference

## ℹ️ Info Commands

### `/ping`
Check the bot's latency.

- **Cooldown:** 5 seconds
- **Permissions:** Everyone

### `/help`
Display a categorized list of all commands.

- **Cooldown:** None
- **Permissions:** Everyone

### `/botinfo`
View bot statistics: uptime, server count, command count, versions.

- **Cooldown:** None
- **Permissions:** Everyone

---

## 🛡️ Moderation Commands

### `/kick <target> [reason]`
Kick a member from the server.

- **Options:** `target` (user, required), `reason` (string)
- **Permissions:** `Kick Members`

### `/ban <target> [reason]`
Ban a member from the server.

- **Options:** `target` (user, required), `reason` (string)
- **Permissions:** `Ban Members`

### `/clear <amount>`
Bulk delete messages (1–100).

- **Options:** `amount` (integer 1–100, required)
- **Permissions:** `Manage Messages`

### `/timeout <target> <duration> [reason]`
Timeout a member for a specified duration.

- **Options:** `target` (user, required), `duration` (1–40320 minutes), `reason` (string)
- **Permissions:** `Moderate Members`

### `/warn <target> [reason]`
Issue a warning to a member. Warnings are stored in the database.

- **Options:** `target` (user, required), `reason` (string)
- **Permissions:** `Moderate Members`

### `/warnings <target>`
View all warnings for a member with timestamps and moderator info.

- **Options:** `target` (user, required)
- **Permissions:** `Moderate Members`

### `/unwarn <id>`
Remove a specific warning by its ID.

- **Options:** `id` (integer, required)
- **Permissions:** `Moderate Members`

---

## 🔧 Utility Commands

### `/serverinfo`
Display server statistics: owner, members, channels, roles, boost level.

- **Cooldown:** None
- **Permissions:** Everyone

### `/userinfo [target]`
Display user information: account age, join date, roles.

- **Options:** `target` (user, optional — defaults to yourself)
- **Cooldown:** None
- **Permissions:** Everyone

### `/avatar [target]`
Display a user's avatar in full size.

- **Options:** `target` (user, optional — defaults to yourself)
- **Cooldown:** None
- **Permissions:** Everyone

---

## 🎮 Fun Commands

### `/8ball <question>`
Ask the magic 8-ball a question.

- **Options:** `question` (string, required)
- **Cooldown:** 3 seconds

### `/roll [sides]`
Roll a dice with customizable sides (2–100).

- **Options:** `sides` (integer 2–100, default: 6)
- **Cooldown:** 3 seconds

---

## 💬 Community Commands

### `/suggest <suggestion>`
Submit a suggestion. It gets posted to the suggestions channel with 👍/👎 reactions.

- **Options:** `suggestion` (string, max 1000 chars, required)
- **Cooldown:** 60 seconds

### `/report <user> <reason>`
Report a member to the moderation team.

- **Options:** `user` (user, required), `reason` (string, max 1500 chars, required)
- **Cooldown:** 120 seconds
