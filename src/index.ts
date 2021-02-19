import Discord, { Message } from 'discord.js';
import { tail } from 'lodash';

import 'dotenv/config';

// constants/helpers
import { command, COMMANDS, UNSUPPORTED_COMMAND } from './constants';

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
  const cmdWithArgs = content.split(' ');

  // return if null or empty
  if (!cmdWithArgs || cmdWithArgs.length === 0) return;

  const cmd: command = cmdWithArgs[0] as command;
  // check for a valid command
  if (COMMANDS.has(cmd)) {
    // remove unnecessary first element
    const args = tail(cmdWithArgs);

    // handle various command cases
    switch (cmd) {
      case '!add':
        // handleAdd(args);
        break;
      default:
        console.error(UNSUPPORTED_COMMAND);
        break;
    }
  }
});

client.login(token);
