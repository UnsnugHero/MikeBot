/**
 * Describes the structure of the todo list document
 *
 * The document is composed of sections
 * Each section has a title, ID, and a list of todos
 * Each Todo Item has an ID and text content
 */
export interface TodoList {
  title: string;
  sections: Section[];
}

export interface Section {
  title: string;
  todos: string[];
}
