import { Message } from 'discord.js';
import jsonfile from 'jsonfile';

import { TodoList } from './bot.model';
import { TODO_FILE_PATH } from './constants';
import { formatTodoJson } from './helpers';

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
   * Prints the entire Todo list to the chat. Either ignores arguments passed or says this takes no args,
   * not sure which one to do yet.
   *
   * @param msg originating message of command
   */
  public printAll(msg: Message) {
    const formattedTodo = formatTodoJson(this._todoJson);
    return msg.channel.send(formattedTodo).catch((error) => {
      msg.channel.send('Uh oh! I had a problem printing the Todo list.');
      console.log(error);
    });
  }

  /**
   * Pins the entire todo list to the chat
   *
   * @param msg originating message of command
   */
  public pinAll(msg: Message) {
    const formattedTodo = formatTodoJson(this._todoJson);
    return msg.channel
      .send(formattedTodo)
      .then((sentMsg) => sentMsg.pin())
      .catch((error) => {
        msg.channel.send('Uh oh! I could not pin that message.');
        console.log(error);
      });
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
