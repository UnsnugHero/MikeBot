// File for declaring and managing command groups for each module of the bot.
// Inclusion of a group will be determined by a config boolean
import { CommandGroup, CommandoClient } from 'discord.js-commando';

// custom type for command groups
export type GroupType = 'dice' | 'animal' | 'todo' | 'help' | 'compliment';

interface GroupConfig {
  id: GroupType;
  name: string;
  included: boolean;
}

const groupConfigs: GroupConfig[] = [
  { id: 'dice', name: 'Dice Commands', included: true },
  { id: 'animal', name: 'Animal Commands', included: true },
  { id: 'todo', name: 'Todo Commands', included: false },
  { id: 'help', name: 'Help Commands', included: true },
  { id: 'compliment', name: 'Compliment Commands', included: true },
];

const groupMaker = (
  client: CommandoClient,
  id: GroupType,
  name: string
): CommandGroup => {
  return new CommandGroup(client, id, name);
};

export const GROUPS = (client: CommandoClient): CommandGroup[] => {
  const groups = [];

  groupConfigs.forEach((groupConfig) => {
    if (groupConfig.included) {
      groups.push(groupMaker(client, groupConfig.id, groupConfig.name));
    }
  });

  return groups;
};
