// done removes a todo item and adds it to done section
// section adds a new section
// section lets user pass in custom id, else assigns a random one
// probably should make section part of add, maybe addsec
// show shows the entire todo list, pass section id to show that section

import { Message } from 'discord.js';

/**
 * Valid Bot Commands
 *
 * Add - Adds a todo item. Takes an optional section ID to store the
 * todo item at, otherwise it is added to the default general section.
 * The todo text is required. Todo text cannot start with the # character
 * as it is used to signify a section. See example.
 *
 * example: !add #3 Mine Iron Ore
 * explanation: add "Mine Iron Ore" to section with ID 3
 *
 * example: !add Mine Iron Ore
 * explanation: add "Mine Iron Ore" to general section
 *
 */
export type command =
  // CRUD commands
  // | '!add'
  | '!addsection'
  | '!removesection'
  // | '!get'
  // | '!update'
  // | '!delete'
  // other commands
  // | '!done'
  | '!printall'
  | '!pinall';
// | '!init'
// admin commands, for ME!
// | '!approve'
// | '!veto';

/**
 * Describes the structure of the todo list document
 *
 * The document is composed of sections
 * Each section has a title, and a list of todos
 * Each Todo Item is a string
 */
export interface TodoList {
  title: string;
  sections: Section[];
}

export interface Section {
  title: string;
  todos: string[];
}

/**
 * Status object representing if the command was successful as well
 * as a descriptor for the success or error of the command and error
 * if error
 */
export interface CommandStatus {
  success: boolean;
  description: string;
  error?: Message;
}
