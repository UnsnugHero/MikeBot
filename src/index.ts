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
  // assuming content can;t be blank or undefined
  const { content } = msg;

  msg.reply(content);
});

client.login(token);
