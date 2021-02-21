import { TodoList } from './bot.model';

export const italicizeText = (text: string): string => {
  return `*${text}*`;
};

export const boldText = (text: string): string => {
  return `**${text}**`;
};

export const underlineText = (text: string): string => {
  return `__${text}__`;
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
