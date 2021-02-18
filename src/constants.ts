// done removes a todo item and adds it to done section
// section adds a new section
// section lets user pass in custom id, else assigns a random one
// probably should make section part of add, maybe addsec
// show shows the entire todo list, pass section id to show that section

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
export type command = '!add' | '!done' | '!section' | '!show' | '!pin';
export const COMMANDS = new Set<command>([
  '!add',
  '!done',
  '!section',
  '!show',
  '!pin',
]);
