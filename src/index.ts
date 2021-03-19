// Entry point for all bots
import Discord, { Message } from 'discord.js';

import 'dotenv/config';

// discord
const client = new Discord.Client();
const token = process.env.DISCORD_BOT_TOKEN;

/*****************************
 * DISCORD
 ****************************/

// event listeners
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

// listen for messages in channels
client.on('message', (msg: Message) => {
  // assuming content can't be blank or undefined
  const { content } = msg;

  /**
   * Code brought over from previous bot entry point
   * don't know if ill be doing it like this for the
   * new version or not yet.
   */
  // // get components of command
  // const cmdWithArgs = content.split(' ');

  // // return if null or empty
  // if (!cmdWithArgs || cmdWithArgs.length === 0) return;

  // const cmd: command = cmdWithArgs[0] as command;
  // // check for a valid command
  // if (COMMANDS.has(cmd)) {
  //   // remove unnecessary first element
  //   const args = tail(cmdWithArgs);

  //   // handle various command cases
  //   commandRunner(msg, cmd, args);
  msg.reply(content);
});

client.login(token);
