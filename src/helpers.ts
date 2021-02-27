import { Message } from 'discord.js';
import { CommandStatus, TodoList } from './bot.model';

/**********************
 * Numbers
 *********************/

export const isPositiveInteger = (num: number): boolean => {
  if (typeof num !== 'number') return false; // assert number
  if (!Number.isInteger(num)) return false; // assert integer (should be int since did parse int but why not)
  if (num < 0) return false; // assert positive
  return true;
};

/**********************
 * Text Formatters
 *********************/
export const italicizeText = (text: string): string => {
  return `*${text}*`;
};

export const boldText = (text: string): string => {
  return `**${text}**`;
};

export const underlineText = (text: string): string => {
  return `__${text}__`;
};

export const buildCommandStatus = (
  success: boolean,
  description: string,
  error?: Message
): CommandStatus => {
  return {
    success,
    description,
    ...(error ? { error } : {}),
  };
};

/**
 *
 * @param todoJson the todo list in JSON format
 * @returns todo list as a formatted string
 */
export const formatTodoJson = (todoJson: TodoList): string => {
  // I couldn't get multline template strings to work ._.
  const todos = todoJson.sections.map((section, sIndex) => {
    return (
      section.todos
        // adding spaces since discord doesn't like tabs
        .map((todo, tIndex) => `    ${sIndex}.${tIndex} ${todo}`)
        .join('\n')
    );
  });

  const sections = todoJson.sections
    .map((section, sIndex) => {
      return (
        `${boldText(`${sIndex}. ${section.title}`)}\n\n` +
        `${todos[sIndex]}` +
        '\n'
      );
    })
    .join('\n');

  const formattedTodo = `${underlineText(todoJson.title)}\n\n` + sections;

  return formattedTodo;
};
