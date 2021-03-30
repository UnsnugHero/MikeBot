import diceCommands from './dice/dice.commands';
import animalCommands from './animal/animal.commands';
import helpCommands from './help/help.commands';
import complimentCommands from './compliment/compliment.commands';

export default [
  ...diceCommands,
  ...animalCommands,
  ...helpCommands,
  ...complimentCommands,
];
