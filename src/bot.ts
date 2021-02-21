import jsonfile from 'jsonfile';

import { TodoList } from './bot.model';
import { TODO_FILE_PATH } from './constants';
import { boldText, underlineText } from './helpers';

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
   * @returns string representing entire todo list
   */
  public printAll(): string {
    // I couldn't get multline template strings to work ._.
    const todos = this._todoJson.sections.map((section, sIndex) => {
      return (
        section.todos
          // adding spaces since discord doesn't like tabs
          .map((todo, tIndex) => `    ${sIndex}.${tIndex} ${todo}`)
          .join('\n')
      );
    });

    const sections = this._todoJson.sections
      .map((section, sIndex) => {
        return (
          `${boldText(`${sIndex}. ${section.title}`)}\n\n` +
          `${todos[sIndex]}` +
          '\n'
        );
      })
      .join('\n');

    const printAllString =
      `${underlineText(this._todoJson.title)}\n\n` + sections;

    return printAllString;
  }

  /**
   * Pins the
   *
   */

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
