import { Message } from 'discord.js';
import { Command, CommandoClient } from 'discord.js-commando';

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
    console.log(
      groups.forEach((group) => {
        console.log(group);
      })
    );
    return msg.channel.send('');
  }
}
