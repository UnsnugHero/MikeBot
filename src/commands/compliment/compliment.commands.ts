import { Message } from 'discord.js';
import { Command, CommandoClient } from 'discord.js-commando';

export class Compliment extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'talkmeup',
      group: 'compliment',
      memberName: 'talkmeup',
      description: 'Gives you a compliment',
    });
  }

  public run(msg: Message): Promise<Message> {
    const start = [
      'You are lookin fine you',
      'Hey there you',
      'You might be a',
      'Hey hey, you you',
      'I love you you',
      'You are my favorite',
      'Could you possibly be a better',
    ];
    const adjective = [
      'sweet cherry wine',
      'not smelly pile of poo',
      'BEE',
      'ramp-dazzle-pee-kee-dee',
      'mom',
      'succulent duckulent cluckulent hottie',
      'absolute pound cake',
      'complete and utter futter nutter',
      'wacka shmacka DOOOOOOOOOOOOOOOO',
      'jiggly swiggly milky dude',
      'hop scotch bish bosh',
      'squeenis queenis',
      'bean bag bagel boy',
      'pop rocks emperor',
      'fun time america general manager',
      'hand drawn bath bomb',
      'BEEDLE',
      'david blain bird brained baby bottle bop',
    ];

    const firstItem = start[Math.floor(Math.random() * start.length)];
    const secondItem = adjective[Math.floor(Math.random() * adjective.length)];

    return msg.reply(`${firstItem} ${secondItem}`);
  }
}

export default [Compliment];
