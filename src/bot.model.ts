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
