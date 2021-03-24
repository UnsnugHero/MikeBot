import { Message } from 'discord.js';
import { Command, CommandoClient } from 'discord.js-commando';
import { rollCommandValidator } from './dice.helpers';
import { rollRunner } from './dice.runners';

// TODO export all commands in  a command class as an array and the index file can import that and spread it
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
          validate: rollCommandValidator,
          type: 'string',
        },
      ],
    });
  }

  public run(
    msg: Message,
    args: Record<string, string>
  ): Promise<Message | Array<Message>> {
    const { roll } = args;
    return msg.channel.send(rollRunner(roll));
  }
}
