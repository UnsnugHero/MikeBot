import 'dotenv/config';

import { CommandoClient } from 'discord.js-commando';
import { GROUPS } from './groups';
import commands from './commands/index.commands';
import { PUCK_URLS } from './util/puck-constants';

const token = process.env.DISCORD_BOT_TOKEN;
const ownerId = process.env.DISCORD_OWNER_ID;
const puck_imgs = PUCK_URLS;

// put ownerId in env variable
const client = new CommandoClient({
  owner: ownerId,
  commandPrefix: '>',
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

client.on('message', (msg) => {
  if (
    msg.content === 'sis' &&
    msg.author.username !== 'MikeBot' &&
    msg.author.username !== 'bird bingus box'
  ) {
    msg.channel.send('sis');
  }

  if (msg.content.includes('puck')) {
    msg.channel.send(puck_imgs[Math.floor(Math.random() * puck_imgs.length)]);
  }
});

client.login(token);
