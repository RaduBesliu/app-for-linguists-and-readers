import { StoryJson } from './types.ts';
import { getStoryFromIndexedDb, saveStoryToIndexedDb } from '../../utils/indexedDb';

export const getStory = async (storyId: string): Promise<StoryJson | undefined> => {
  try {
    console.log('[getStory] Fetching story', storyId);

    const storyFromIndexedDb = await getStoryFromIndexedDb(storyId);

    if (storyFromIndexedDb) {
      console.log('[getStory] Fetched story from IndexedDB', storyId, storyFromIndexedDb);
      return storyFromIndexedDb;
    }

    const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/get-story/${storyId}`);

    if (!response.ok) {
      console.log('[getStory] Failed to fetch story', storyId);
      return undefined;
    }

    const story = (await response.json()) as StoryJson;
    console.log('[getStory] Fetched story', storyId, story);

    console.log('[getStory] Storing story in IndexedDB', storyId, story);
    await saveStoryToIndexedDb(story);

    return story;
  } catch (error) {
    console.error('[getStory] Error fetching story', storyId, error);
    return undefined;
  }
};
