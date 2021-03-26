import got from 'got';

/**
 * Gets a random image/gif of some dog
 * @returns link to a random dog image/gif
 */
export const randomDogRunner = async (): Promise<string> => {
  try {
    const response = await got('https://api.thedogapi.com/v1/images/search', {
      searchParams: { limit: 1, size: 'full' },
    });
    const { body } = response;
    const parsedBody = JSON.parse(body);

    return parsedBody[0].url;
  } catch (error) {
    console.error(error);
    return 'DOG ERROR! PANIC!';
  }
};
