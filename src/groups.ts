// File for declaring and managing command groups for each module of the bot.
// Inclusion of a group will be determined by a config file corresponding to
// CommandType ids.
import { CommandGroup, CommandoClient } from 'discord.js-commando';

// custom type for command ids. Each type corresponds to a bot module.
type CommandType = 'dice' | 'dogs' | 'todo';

export const GROUPS = (client: CommandoClient): CommandGroup[] => {
  return [DICE_GROUP(client), DOGS_GROUP(client), TODO_GROUP(client)];
};

const DICE_GROUP = (client: CommandoClient): CommandGroup => {
  const DICE_GROUP_ID: CommandType = 'dice';
  const DICE_GROUP_NAME = 'Dice Commands';
  return new CommandGroup(client, DICE_GROUP_ID, DICE_GROUP_NAME);
};

const DOGS_GROUP = (client: CommandoClient): CommandGroup => {
  const DOGS_GROUP_ID: CommandType = 'dogs';
  const DOGS_GROUP_NAME = 'Dogs Commands';
  return new CommandGroup(client, DOGS_GROUP_ID, DOGS_GROUP_NAME);
};

const TODO_GROUP = (client: CommandoClient): CommandGroup => {
  const TODO_GROUP_ID: CommandType = 'todo';
  const TODO_GROUP_NAME = 'Todo Commands';
  return new CommandGroup(client, TODO_GROUP_ID, TODO_GROUP_NAME);
};
