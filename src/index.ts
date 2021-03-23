import 'dotenv/config';

import { Command, CommandoClient } from 'discord.js-commando';
import { GROUPS } from './groups';
import { RollCommand } from './commands/dice/dice.commands';
import { HelpCommand } from './commands/help/help.commands';

const token = process.env.DISCORD_BOT_TOKEN;
const ownerId = process.env.DISCORD_OWNER_ID;

// put ownerId in env variable
const client = new CommandoClient({
  owner: ownerId,
});

// register my commands
// the availability of these will be controlled by configs
client.registry
  .registerDefaultTypes()
  .registerGroups(GROUPS(client))
  .registerCommands([RollCommand, HelpCommand]);

// event listeners
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.login(token);
