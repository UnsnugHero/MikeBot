import Discord, { Message } from 'discord.js';
import { tail } from 'lodash';

import 'dotenv/config';

// constants/helpers
import { command, COMMANDS, UNSUPPORTED_COMMAND } from './constants';
import { TodoBot } from './bot';

// discord
const client = new Discord.Client();
const token = process.env.DISCORD_BOT_TOKEN;

// Todo Bot instance
const todoBot = new TodoBot();

// function map
const commandRunner = (msg: Message, cmd: command, cmdWithArgs: string[]) => {
  // command function to execute
  let commandFn;

  // our switch statement
  const commands: { [key in command]: any } = {
    '!pinall': () => todoBot.pinAll(msg),
    '!printall': () => todoBot.printAll(msg),
  };

  if (commands[cmd]) {
    commandFn = commands[cmd];
  } else {
    // the command doesn't exist
    commandFn = () => UNSUPPORTED_COMMAND;
  }

  commandFn();
};

/*******************************
 * DISCORD
 ******************************/

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
    commandRunner(msg, cmd, cmdWithArgs);
  }
});

client.login(token);
