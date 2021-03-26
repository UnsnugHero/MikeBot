import { Message } from 'discord.js';
import { Command, CommandoClient } from 'discord.js-commando';
import { helpRunner } from './help.runners';

export class HelpCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'help',
      group: 'help',
      memberName: 'help',
      description: 'Shows the commands available with this bot.',
    });
  }

  public run(msg: Message): Promise<Message | Array<Message>> {
    const groups = this.client.registry.groups;
    return msg.channel.send(helpRunner(groups));
  }
}

export default [HelpCommand];
