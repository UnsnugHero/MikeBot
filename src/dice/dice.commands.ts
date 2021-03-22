import { Message } from 'discord.js';
import { Command, CommandoClient } from 'discord.js-commando';

export class RollCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'roll',
      group: 'dice',
      memberName: 'roll',
      description: 'Rolls a user supplied number of dice of a number of sides.',
      examples: ['!roll d6', '!roll 2d10', '!roll 100d75'],
      args: [
        {
          key: 'roll',
          prompt:
            'Provide dice to roll! The argument is #d# where # is some number greater than 0.',
          type: 'string',
        },
      ],
    });
  }

  public run(
    msg: Message,
    args: Record<string, unknown>
  ): Promise<Message | Array<Message>> {
    console.log(this.client.registry.groups);
    const { roll } = args;
    return msg.channel.send(roll);
  }
}
