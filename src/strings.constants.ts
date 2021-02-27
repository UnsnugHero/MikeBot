export const getText = (
  key: string,
  interps?: { [key: string]: string }
): string => {
  // injection function for inserting values into strings at runtime
  const inject = (string: string, interps?: { [key: string]: string }) =>
    string.replace(/\${(.*?)}/g, (_, interpKey) => {
      return interps[interpKey];
    });

  return interps ? inject(STRINGS[key], interps) : STRINGS[key];
};

const STRINGS = {
  ADD_SECTION_MISSING_TITLE: 'Please specify a title for the section.',
  ADD_SECTION_SUCCESS: 'New section ${sectionTitle} successfully added!',
  ADD_SECTION_ERROR: 'Error adding new section.',

  REMOVE_SECTION_MISSING_INDEX: 'Please specify a section index to delete.',
  REMOVE_SECTION_MISSING_POS_INT: 'Please provide a positive integer value.',
  REMOVE_SECTION_BAD_INDEX: 'Index does not match an existing section.',
  REMOVE_SECTION_SUCCESS: 'Section ${sectionToRemove} successfully removed.',
  REMOVE_SECTION_ERROR: 'Error removing section.',

  PRINT_ALL_SUCCESS: 'Todo list successfully printed to chat.',
  PRINT_ALL_ERROR: 'Uh oh! I had a problem printing the Todo list.',

  PIN_ALL_SUCCESS: 'Message successfully pinned.',
  PIN_ALL_ERROR: 'Uh oh! I could not pin that message.',
  PIN_ALL_PERMISSION:
    'Uh oh! I may not have permission to pin, please give me permission to.',
};
