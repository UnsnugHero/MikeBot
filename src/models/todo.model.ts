import { Message } from 'discord.js';

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
