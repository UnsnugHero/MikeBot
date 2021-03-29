// Methods for running a command

import { Collection } from 'discord.js';
import { CommandGroup } from 'discord.js-commando';
import { boldText } from '../../util/helpers';
import { MessageBuilder } from '../../util/message-builder';

/**************************
 * Help Command Methods
 *************************/

/**
 * Provides a list of all the commands available with the bot
 * with small explanations included
 * @returns string detailing all the commands this bot supports
 */
export const helpRunner = (
  groups: Collection<string, CommandGroup>
): string => {
  const helpMessage = new MessageBuilder();

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

export function helpCommandRunner(
  groups: Collection<string, CommandGroup>,
  command
): string {
  const availableCommands = groups.flatMap((group) => group.commands);
  const commandToExplain = availableCommands.get(command);

  if (!commandToExplain) return 'That command does not exist.';

  let helpMessage = '';

  if (commandToExplain.description) {
    helpMessage = `${commandToExplain.description}`;
  } else {
    return 'Sorry, Mike did not explain this one. Yell at him.';
  }

  if (commandToExplain.examples) {
    helpMessage = `${helpMessage}\nex. ${commandToExplain.examples.join(', ')}`;
  }

  return helpMessage;
}
