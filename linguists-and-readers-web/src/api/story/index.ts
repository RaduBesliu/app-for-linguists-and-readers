import { Story, StoryList, StoryMetadata } from './types.ts';
import { getStoryFromIndexedDb, saveStoryToIndexedDb } from '../../utils/indexedDb';
import { parseStoryLists } from './parser.ts';

export const getStory = async (storyId: string, storyMetadata?: StoryMetadata): Promise<Story | undefined> => {
  try {
    console.log('[getStory] Fetching story', storyId);

    const storyFromIndexedDb = await getStoryFromIndexedDb(storyId);

    if (storyFromIndexedDb && storyMetadata?.updatedAt === storyFromIndexedDb.updatedAt) {
      console.log('[getStory] Fetched story from IndexedDB', storyId, storyFromIndexedDb);
      return storyFromIndexedDb;
    }

    const response = await fetch(`http://localhost:8000/get-story/${storyId}`);

    if (!response.ok) {
      console.log('[getStory] Failed to fetch story', storyId);
      return undefined;
    }

    const story = (await response.json()) as Story;
    console.log('[getStory] Fetched story', storyId, story);

    console.log('[getStory] Storing story in IndexedDB', storyId, story);
    await saveStoryToIndexedDb(storyId, story);

    return story;
  } catch (error) {
    console.error('[getStory] Error fetching story', storyId, error);
    return undefined;
  }
};

export const getStoryList = async (): Promise<StoryList | undefined> => {
  try {
    console.log('[getStoryList] Fetching story list');

    const response = await fetch(`http://localhost:8000/get-story-lists`);

    if (!response.ok) {
      console.log('[getStoryList] Failed to fetch story list');
      return undefined;
    }

    const storyList = (await response.json()) as [StoryMetadata[]];
    console.log('[getStoryList] Fetched story list', storyList);

    return parseStoryLists(storyList);
  } catch (error) {
    console.error('[getStoryLists] Error fetching story lists', error);
    return undefined;
  }
};
