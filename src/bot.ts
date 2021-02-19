import jsonfile from 'jsonfile';

import { TodoList } from './bot.model';
import { TODO_FILE_PATH } from './constants';

export class TodoBot {
  // indicates if an init has been requested
  private _init: boolean;
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
    this._init = false;
  }

  /**
   * Adds a Todo item to a section or the general section if no section is specified
   *
   * @param cmdArgs components of a command minus the initial command
   * @returns string to return to the user
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
