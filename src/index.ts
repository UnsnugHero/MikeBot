import 'dotenv/config';

import { CommandoClient } from 'discord.js-commando';
import { GROUPS } from './groups';
import commands from './commands/index.commands';

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
  .registerCommands(commands);

// event listeners
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.login(token);
