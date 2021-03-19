import Discord, { Message } from 'discord.js';
import { tail } from 'lodash';

import 'dotenv/config';

// constants/helpers
import { COMMANDS, UNSUPPORTED_COMMAND, TODO_FILE_PATH } from './constants';
import { TodoManager } from './todo-manager';
import { command } from './models/todo-bot.model';
import {
  commandPromiseHandler,
  pinHandler,
  printHandler,
} from './promise-handlers';

// discord
const client = new Discord.Client();
const token = process.env.DISCORD_BOT_TOKEN;

// Todo Manager instance
const todoManager = new TodoManager(TODO_FILE_PATH);

// function map
const commandRunner = (msg: Message, cmd: command, args: string[]) => {
  // command function to execute
  let commandFn;

  // our switch statement
  const commands: { [key in command] } = {
    // CRUD
    '!addtodo': () => commandPromiseHandler(msg, todoManager.addTodo(args)),
    '!addsection': () =>
      commandPromiseHandler(msg, todoManager.addSection(args)),
    '!removesection': () =>
      commandPromiseHandler(msg, todoManager.removeSection(args)),
    // printing
    '!pinall': () => pinHandler(msg, todoManager.printAll()),
    '!printall': () => printHandler(msg, todoManager.printAll()),
  };

  if (commands[cmd]) {
    commandFn = commands[cmd];
  } else {
    // the command doesn't exist
    commandFn = () => UNSUPPORTED_COMMAND;
  }

  commandFn();
};
