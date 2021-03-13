import jsonfile from 'jsonfile';

import { CommandStatus, Section, TodoList } from './bot.model';
import { getText } from './strings.constants';
import { buildCommandStatus, isPositiveInteger } from './helpers';

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
    jsonfile.readFile(filePath, (_, res) => {
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
   * @param args command arguments
   * @returns promise representing success of command
   */
  public addSection(args: string[]): Promise<CommandStatus> {
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
   * @param args command arguments
   * @returns promise representing success of command
   */
  public removeSection(args: string[]): Promise<CommandStatus> {
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
   * @param args command arguments
   * @returns promise representing success of command
   */
  public addTodo(args: string[]): Promise<CommandStatus> {
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
   * Returns a json todo list
   *
   * @returns Promise of the todo list
   */
  public printAll(): Promise<TodoList> {
    return new Promise((resolve, reject) => {
      resolve(this._todoJson), reject(null);
    });
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
