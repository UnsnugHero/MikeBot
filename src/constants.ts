import { command } from './models/todo.model';

// add as I implement
export const COMMANDS = new Set<command>([
  '!addtodo',
  '!addsection',
  '!removesection',
  '!printall',
  '!pinall',
]);

// text

export const UNSUPPORTED_COMMAND = 'Unsupported Command!';

// misc

export const TODO_FILE_PATH = 'data/todo.json';
