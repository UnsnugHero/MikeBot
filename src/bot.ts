import { Message } from 'discord.js';
import jsonfile from 'jsonfile';

import { CommandStatus, Section, TodoList } from './bot.model';
import { STRINGS } from './strings.constants';
import { buildCommandStatus, formatTodoJson } from './helpers';

export class TodoBot {
  // path of json file to write
  private _filePath: string;
  // holds the curent value of the todo json
  private _todoJson: TodoList;
  // holds previous value of _todoJson in case of errors, or maybe undo TODO???
  private _todoJsonPrevious: TodoList;

  constructor(filePath: string) {
    this._filePath = filePath;

    // i'll leave out case of an empty JSON file, assuming at least {}
    jsonfile.readFile(filePath, (err, res) => {
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
  public addSection(msg: Message, args: string[]): Promise<CommandStatus> {
    // command must have a section title argument
    if (!args.length) {
      return new Promise((resolve, reject) =>
        reject(
          buildCommandStatus(false, 'Please specify a title for the section.')
        )
      );
    }

    // args will hold the section title, maybe a TODO would be to
    // allow for an arg to specify what place in the section list they
    // want to place it in
    const sectionTitle = args.join(' ');
    const newSection: Section = {
      title: sectionTitle,
      todos: [],
    };

    const newTodoJson: TodoList = {
      title: this._todoJson.title,
      sections: [...this._todoJson.sections, newSection],
    };

    // update the class todo json value
    this._updateTodoJson(newTodoJson);

    return (
      jsonfile
        .writeFile(this._filePath, newTodoJson)
        .then(() => {
          const successMsg = `New section ${sectionTitle} successfully added!`;
          // this could trigger catch, edge case ...
          return buildCommandStatus(true, successMsg);
        })
        .catch((error) => {
          // revert class todo json
          this._todoJson = this._todoJsonPrevious;
          return buildCommandStatus(false, 'Error adding new section.', error);
        })
        // want to send success message, but don't want it to possibly tip off
        // the catch error which would revert the class todoJson when it shouldn't
        .then((result: CommandStatus) => {
          if (result.success) msg.channel.send(result.description);

          return result;
        })
    );
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

  // HELPERS

  // updates class variables, not the json file
  private _updateTodoJson(newValue: TodoList) {
    this._todoJsonPrevious = this._todoJson;
    this._todoJson = newValue;
  }
}
