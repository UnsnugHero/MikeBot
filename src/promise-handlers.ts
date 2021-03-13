import { Message } from 'discord.js';
import { CommandStatus, TodoList } from './bot.model';
import { formatTodoJson } from './helpers';
import { getText } from './strings.constants';

// This is for handling bot promises that have a description meant
// to be sent back to the channel
export const commandPromiseHandler = (
  msg: Message,
  promise: Promise<CommandStatus>
): void => {
  promise
    .then((response) => {
      msg.channel.send(response.description);
      console.log(response);
    })
    .catch((error) => {
      msg.channel.send(error.description);
      console.log(error);
    });
};

// Handles pinning the todo to the chat
export const pinHandler = (msg: Message, promise: Promise<TodoList>): void => {
  promise
    .then((todoJson) => {
      if (msg.pinnable) {
        const formattedTodo = formatTodoJson(todoJson);
        const sendMsgPromise = msg.channel.send(formattedTodo);
        const pinPromise = sendMsgPromise.then((sentMsg) => sentMsg.pin());
        Promise.all([sendMsgPromise, pinPromise]);
      } else {
        msg.channel.send(getText('PIN_ALL_PERMISSION'));
      }
    })
    .catch((error) => {
      msg.channel.send(getText('PIN_ALL_ERROR'));
      console.log(error);
    });
};

// Handles printing the todo to the chat
export const printHandler = (
  msg: Message,
  promise: Promise<TodoList>
): void => {
  promise
    .then((todoJson) => {
      const formattedTodo = formatTodoJson(todoJson);
      msg.channel.send(formattedTodo);
      console.log(getText('PRINT_ALL_SUCCESS'));
    })
    .catch((error) => {
      msg.channel.send(getText('PRINT_ALL_ERROR'));
      console.log(error);
    });
};
