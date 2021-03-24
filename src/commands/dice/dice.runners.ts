//     // correct grammars
//     const replyPrefix = result.length > 1 ? 'You rolled' : 'You rolled a';

//     // construct a nicely formatted roll result
//     let nicelyFormattedResult = '';
//     result.forEach((rollRes) => {
//       nicelyFormattedResult += `${rollRes}, `;
//     });

//     // remove the last two chars
//     nicelyFormattedResult = nicelyFormattedResult.substring(
//       0,
//       nicelyFormattedResult.length - 2
//     );

//     // reply with result
//     msg.reply(`${replyPrefix} ${nicelyFormattedResult}`).catch((error) => {
//       msg.reply(`Something went wrong sending to text chat: ${error.message}`);
//     });
//   }
// });

// const handleDiceRoll = (upperBound) => {
//   return Math.floor(Math.random() * Math.floor(upperBound) + 1);
// };

export const rollRunner = () => {};
