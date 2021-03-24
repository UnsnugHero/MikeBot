import { isPositiveInteger } from '../../util/helpers';

// Roll command validator
export const rollCommandValidator = (rollText: string): string | boolean => {
  // bad format
  const badFormatMsg =
    'Badly formatted argument. Try !roll #d# where # is some positive int greater than 0.';
  if (rollText.indexOf('d') === -1 || rollText.match(/d/g).length > 1) {
    return badFormatMsg;
  }

  const splitArgs = rollText.split('d');
  if (splitArgs[0]) {
    const rollNum = Number(splitArgs[0]);
    if (!isPositiveInteger(rollNum) || rollNum < 1) {
      return badFormatMsg;
    }

    if (rollNum > 1000) {
      return 'Too many rolls. Calm down.';
    }
  } else {
    return badFormatMsg;
  }

  if (splitArgs[1]) {
    const sideNum = Number(splitArgs[1]);
    if (!isPositiveInteger(sideNum) || sideNum < 1) {
      return badFormatMsg;
    }
  } else {
    return badFormatMsg;
  }

  return true;
};
