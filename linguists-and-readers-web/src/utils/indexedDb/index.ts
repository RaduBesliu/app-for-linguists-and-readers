import * as localforage from 'localforage';
import { Story } from '../../api/story/types.ts';

localforage.config({
  name: 'Linguists-and-Readers',
  storeName: 'data',
});

export const getStoryFromIndexedDb = async (storyId: string): Promise<Story | undefined> => {
  try {
    const story = await localforage.getItem(storyId);

    console.log('[getStoryFromIndexedDb] Story retrieved:', storyId);
    return story as Story;
  } catch (error) {
    console.error('[getStoryFromIndexedDb] Error retrieving story with id:', storyId, error);
    return undefined;
  }
};

export const saveStoryToIndexedDb = async (storyId: string, story: Story) => {
  try {
    await localforage.setItem(storyId, story);

    console.log('[saveStoryToIndexedDb] Story saved:', story.id);
  } catch (error) {
    console.error('[saveStoryToIndexedDb] Error saving story with id:', story.id, error);
  }
};
