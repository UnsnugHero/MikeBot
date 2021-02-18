import Discord from 'discord.js';
import jsonfile from 'jsonfile';
import 'dotenv/config';

// discord
const client = new Discord.Client();
const token = process.env.DISCORD_BOT_TOKEN;

console.log(token);

// valid commands
// add adds a todo item
// add lets user pass in custom identifier, else assigns a random one
// done removes a todo item and adds it to done section
// section adds a new section
// section lets user pass in custom id, else assigns a random one
// probably should make section part of add, maybe addsec
// show shows the entire todo list, pass section id to show that section
// const cmds = ['!add', '!done', '!section', '!show']

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (msg) => {
  const { content } = msg;

  if (content === '!hi') msg.channel.send('Hi!');
});

client.login(token);
