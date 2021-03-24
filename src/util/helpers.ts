/**********************
 * Numbers
 *********************/

export const isPositiveInteger = (num: number): boolean => {
  if (Number.isNaN(num)) return false; // assert number
  if (!Number.isInteger(num)) return false; // assert integer
  if (num < 0) return false; // assert positive or 0
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

export const strikethroughText = (text: string): string => {
  return `~~${text}~~`;
};

export const singleLineCode = (text: string): string => {
  return `\`${text}\``;
};
