import Discord, { Message } from 'discord.js';
import jsonfile from 'jsonfile';

import 'dotenv/config';

// constants/helpers
import { command, COMMANDS } from './constants';
import { handleAdd } from './helpers';

// discord
const client = new Discord.Client();
const token = process.env.DISCORD_BOT_TOKEN;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (msg: Message) => {
  // im assuming content can't be blank or null/undefined ...
  const { content } = msg;

  // get components of command
  const cmdArgs = content.split(' ');

  // return if null or empty
  if (!cmdArgs || cmdArgs.length === 0) return;

  const cmd: command = cmdArgs[0] as command;

  // check for a valid command
  if (COMMANDS.has(cmd)) {
    // remove unnecessary first element
    cmdArgs.shift();

    // handle various command cases
    switch (cmd) {
      case '!add':
        handleAdd(cmdArgs);
        break;
      default:
        console.error('Unsupported Command!');
        break;
    }
  }
});

client.login(token);
