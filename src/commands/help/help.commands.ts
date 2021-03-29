import { Message, MessageEmbed } from 'discord.js';
import { Command, CommandoClient } from 'discord.js-commando';
import { helpCommandRunner, helpRunner } from './help.runners';

export class Help extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'help',
      group: 'help',
      memberName: 'help',
      description: 'Shows the commands available with this bot.',
      args: [
        {
          key: 'command',
          prompt: 'Provid a command to get info about',
          type: 'string',
          default: '',
        },
      ],
      argsPromptLimit: 0,
    });
  }

  public run(msg: Message, args: Record<string, string>): Promise<Message> {
    const { command } = args;
    const groups = this.client.registry.groups;

    let msgToSend: string | MessageEmbed;

    if (command) {
      msgToSend = helpCommandRunner(groups, command);
    } else {
      msgToSend = helpRunner(groups);
    }

    return msg.channel.send(msgToSend);
  }
}

export default [Help];
