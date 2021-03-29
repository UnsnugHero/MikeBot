import { Message } from 'discord.js';
import { Command, CommandoClient } from 'discord.js-commando';
import { randomAnimalRunner } from './animal.runners';
import { RANDOM_DOG_URL, RANDOM_CAT_URL } from './animal.constants';

export class RandomDogCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'dog',
      group: 'animal',
      memberName: 'dog',
      description: 'Gets a random image of a dog',
    });
  }

  public async run(msg: Message): Promise<Message> {
    const dogImage = await randomAnimalRunner(RANDOM_DOG_URL);
    return msg.channel.send(dogImage);
  }
}

export class RandomCatCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'cat',
      group: 'animal',
      memberName: 'cat',
      description: 'Gets a random image of a cat',
    });
  }

  public async run(msg: Message): Promise<Message> {
    const catImage = await randomAnimalRunner(RANDOM_CAT_URL);
    return msg.channel.send(catImage);
  }
}

export default [RandomDogCommand, RandomCatCommand];
