// TODO: support multiple arguments and not have the rollNum argument
// which would mean to default to 1 roll
export const rollRunner = (rollText: string): string => {
  const splitArgs = rollText.split('d');
  const rollNum = Number(splitArgs[0]);
  const sideNum = Number(splitArgs[1]);

  const rollResults: number[] = [];

  let i;
  for (i = 0; i < rollNum; ++i) {
    rollResults.push(Math.floor(Math.random() * Math.floor(sideNum) + 1));
  }

  return rollResults.join(' ');
};
