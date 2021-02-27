import { command } from './bot.model';

// add as I implement
export const COMMANDS = new Set<command>([
  '!addsection',
  '!removesection',
  '!printall',
  '!pinall',
]);

// text

export const UNSUPPORTED_COMMAND = 'Unsupported Command!';

// misc

export const TODO_FILE_PATH = 'data/todo.json';
