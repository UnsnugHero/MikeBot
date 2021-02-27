import { Message } from 'discord.js';
import jsonfile from 'jsonfile';

import { CommandStatus, Section, TodoList } from './bot.model';
import { getText } from './strings.constants';
import {
  buildCommandStatus,
  formatTodoJson,
  isPositiveInteger,
} from './helpers';

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
   * @param msg incoming message
   * @param args command arguments
   * @returns promise representing success of command
   */
  public addSection(msg: Message, args: string[]): Promise<CommandStatus> {
    // command must have a section title argument
    if (!args.length) {
      return this._buildCommandRejection(getText('ADD_SECTION_MISSING_TITLE'));
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

    const successMsg = getText('ADD_SECTION_SUCCESS', { sectionTitle });
    const errorMsg = getText('ADD_SECTION_ERROR');
    return this._attemptWrite(newTodoJson, successMsg, errorMsg);
  }

  /**
   * Removes a section by Id
   * @param msg incoming message
   * @param args command arguments
   * @returns promise representing success of command
   */
  public removeSection(msg: Message, args: string[]): Promise<CommandStatus> {
    // check if index arg is present
    if (!args.length)
      return this._buildCommandRejection(
        getText('REMOVE_SECTION_MISSING_INDEX')
      );

    const sectionIndex = Number(args[0]);
    // check if index can access an array
    if (!isPositiveInteger(sectionIndex))
      return this._buildCommandRejection(getText('NON_POSITIVE_INT_INDEX'));

    // check index is not out of bounds
    if (sectionIndex > this._todoJson.sections.length - 1)
      return this._buildCommandRejection(getText('NO_MATCHING_SECTION_INDEX'));

    // get section name for message confirmation
    const sectionToRemove = this._todoJson.sections[sectionIndex].title;

    // get sections without removed one while preserving
    const newSections = this._todoJson.sections.filter(
      (_, i) => sectionIndex !== i
    );

    const newTodoJson: TodoList = {
      title: this._todoJson.title,
      sections: newSections,
    };

    const successMsg = getText('REMOVE_SECTION_SUCCESS', {
      sectionToRemove,
    });
    const errorMsg = getText('REMOVE_SECTION_ERROR');
    return this._attemptWrite(newTodoJson, successMsg, errorMsg);
  }

  /**
   * Adds a Todo item to a section or the first section if no section is specified
   *
   * @param msg incoming message
   * @param args command arguments
   * @returns promise representing success of command
   */
  public addTodo(msg: Message, args: string[]): Promise<CommandStatus> {
    // need at least section index and content, so at least two arguments
    if (args.length < 2)
      return this._buildCommandRejection(getText('ADD_TODO_INCORRECT_ARGS'));

    const sectionIndex = Number(args[0]);
    if (!isPositiveInteger(sectionIndex))
      return this._buildCommandRejection(getText('NON_POSITIVE_INT_INDEX'));

    if (sectionIndex > this._todoJson.sections.length - 1)
      return this._buildCommandRejection(getText('NO_MATCHING_SECTION_INDEX'));

    const argsWithoutSectionIndex = args.slice(1);
    const todoConent = argsWithoutSectionIndex.join(' ');

    // add todo to the indexed section's todos
    const newTodoJson = { ...this._todoJson };
    newTodoJson.sections[sectionIndex].todos = [
      ...newTodoJson.sections[sectionIndex].todos,
      todoConent,
    ];

    const sectionTitle = this._todoJson.sections[sectionIndex].title;
    const successMsg = getText('ADD_TODO_SUCCESS', { sectionTitle });
    const errorMsg = getText('ADD_TODO_ERROR');
    return this._attemptWrite(newTodoJson, successMsg, errorMsg);
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
      .then(() => buildCommandStatus(true, getText('PRINT_ALL_SUCCESS')))
      .catch((error) =>
        buildCommandStatus(false, getText('PRINT_ALL_ERROR'), error)
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
        .then(() => buildCommandStatus(true, getText('PIN_ALL_SUCCESS')))
        .catch((error) => {
          return buildCommandStatus(false, getText('PIN_ALL_ERROR'), error);
        });
    }

    // missing pin permission
    return new Promise((_, reject) =>
      reject(buildCommandStatus(false, getText('PIN_ALL_PERMISSION')))
    );
  }

  // HELPERS

  // updates class variables, not the json file
  private _updateTodoJson(newValue: TodoList) {
    this._todoJsonPrevious = this._todoJson;
    this._todoJson = newValue;
  }

  // builds a promise rejection tailored for commands
  private _buildCommandRejection(errMsg: string): Promise<CommandStatus> {
    return new Promise((_, reject) =>
      reject(buildCommandStatus(false, errMsg))
    );
  }

  /**
   * Attempts to write to json file with new provided json value
   * @param newTodoJson updated todo json value to write to JSON file
   * @param successMsg message on success
   * @param errorMsg message on error
   * @returns command status typed promise
   */
  private _attemptWrite(
    newTodoJson: TodoList,
    successMsg: string,
    errorMsg: string
  ): Promise<CommandStatus> {
    return jsonfile
      .writeFile(this._filePath, newTodoJson)
      .then(() => {
        // actually update local todo on success
        this._updateTodoJson(newTodoJson);
        return buildCommandStatus(true, successMsg, true);
      })
      .catch((error) => buildCommandStatus(false, errorMsg, true, error));
  }
}
