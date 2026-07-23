const { PermissionFlagsBits } = require('discord.js');

const permissionLevels = {
  everyone: 0,
  moderator: 1,
  admin: 2,
  owner: 3,
};

function getMemberLevel(member) {
  if (member.id === member.guild.ownerId) return permissionLevels.owner;
  if (member.permissions.has(PermissionFlagsBits.Administrator)) return permissionLevels.admin;
  if (member.permissions.has(PermissionFlagsBits.KickMembers)) return permissionLevels.moderator;
  return permissionLevels.everyone;
}

function requireLevel(required) {
  return (interaction) => {
    const level = getMemberLevel(interaction.member);
    return level >= required;
  };
}

module.exports = { permissionLevels, getMemberLevel, requireLevel };
