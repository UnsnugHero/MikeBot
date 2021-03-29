import got from 'got';

/**
 * Gets a radom image/gif of some animal from the supplied URL
 * Might end up being just random cat/dog runner since those apis
 * seem to be extremely similar
 * @returns link to an image/gif
 */
export const randomAnimalRunner = async (url: string): Promise<string> => {
  try {
    const response = await got(url, {
      searchParams: { limit: 1, size: 'full' },
    });
    const { body } = response;
    const parsedBody = JSON.parse(body);

    return parsedBody[0].url;
  } catch (error) {
    console.error(error);
    return 'RANDOM ANIMAL ERROR! PANIC!';
  }
};
