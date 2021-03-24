// Methods for running a command

import { Collection } from 'discord.js';
import { CommandGroup } from 'discord.js-commando';
import { boldText } from '../../util/helpers';
import { MessageFormatter } from '../../util/message-formatter';

/**************************
 * Help Command Methods
 *************************/

/**
 *
 * @returns string detailing all the commands this bot supports
 */
export const helpRunner = (
  groups: Collection<string, CommandGroup>
): string => {
  const helpMessage = new MessageFormatter();

  helpMessage.addBoldLine(`This is Mike Bot! Fear the mundane.`);
  helpMessage.addNewLine();
  helpMessage.addBoldLine('Available commands');
  helpMessage.addNewLine();

  groups.forEach((group) => {
    helpMessage.addUnderlinedLine(group.name);

    group.commands.forEach((command) => {
      helpMessage.addLine(`${boldText(command.name)}: ${command.description}`);
    });
    helpMessage.addNewLine();
  });
  return helpMessage.getMessage();
};
