import { Message } from 'discord.js';
import jsonfile from 'jsonfile';

import { CommandStatus, TodoList } from './bot.model';
import { TODO_FILE_PATH } from './constants';
import { STRINGS } from './strings.constants';
import { buildCommandStatus, formatTodoJson } from './helpers';

export class TodoBot {
  // holds the curent value of the todo json
  private _todoJson: TodoList;

  constructor() {
    // i'll leave out case of an empty JSON file, assuming at least {}
    jsonfile.readFile(TODO_FILE_PATH, (err, res) => {
      if (res) {
        this._todoJson = res;
      } else {
        // crash the bot lol
        process.exit();
      }
    });
  }

  /**
   * Adds a new section to the Todo JSON
   *
   * @param msg
   * @returns promise representing success of command
   */
  public addSection(msg: Message): Promise<CommandStatus> {
    return new Promise(() => console.log(this._todoJson));
  }

  /**
   * Prints the entire Todo list to the chat. Either ignores arguments passed or says this takes no args,
   * not sure which one to do yet.
   *
   * @param msg originating message of command
   * @returns promise representing success of command
   */
  public printAll(msg: Message): Promise<CommandStatus> {
    const formattedTodo = formatTodoJson(this._todoJson);
    return msg.channel
      .send(formattedTodo)
      .then(() => buildCommandStatus(true, STRINGS['PRINT_ALL_SUCCESS']))
      .catch((error) =>
        buildCommandStatus(false, STRINGS['PRINT_ALL_ERROR'], error)
      );
  }

  /**
   * Pins the entire todo list to the chat
   *
   * @param msg originating message of command
   * @returns promise representing success of command
   */
  public pinAll(msg: Message): Promise<CommandStatus> {
    // is this how to handle a missing pinnable permission?
    if (msg.pinnable) {
      const formattedTodo = formatTodoJson(this._todoJson);
      const sendMsgPromise = msg.channel.send(formattedTodo);
      const pinPromise = sendMsgPromise.then((sentMsg) => sentMsg.pin());
      return Promise.all([sendMsgPromise, pinPromise])
        .then(() => buildCommandStatus(true, STRINGS['PIN_ALL_SUCCESS']))
        .catch((error) => {
          return buildCommandStatus(false, STRINGS['PIN_ALL_ERROR'], error);
        });
    }

    // missing pin permission
    return new Promise((resolve, reject) =>
      reject(buildCommandStatus(false, STRINGS['PIN_ALL_PERMISSION']))
    );
  }

  /**
   * Adds a Todo item to a section or the general section if no section is specified
   *
   * @param cmdArgs components of a command minus the initial command
   */
  public handleAdd(cmdArgs: string[]): string {
    // check if empty to handle error, send message saying command shouldn't be empty
    if (cmdArgs.length === 0) {
      //handle error here
      return 'Say something about using !add correctly';
    }

    let section = '';

    // check if command specified a section
    if (cmdArgs[0].charAt[0] === '#') {
      section = cmdArgs[0];
    }
  }
}
