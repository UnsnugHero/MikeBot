import { Message } from 'discord.js';
import { Command, CommandoClient } from 'discord.js-commando';
import { randomDogRunner } from './dogs.runners';

export class RandomDogCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'dog',
      group: 'dogs',
      memberName: 'dog',
      description: 'Gets a random image of a dog',
    });
  }

  public async run(msg: Message): Promise<Message> {
    const dogImage = await randomDogRunner();
    return msg.channel.send(dogImage);
  }
}

export default [RandomDogCommand];
