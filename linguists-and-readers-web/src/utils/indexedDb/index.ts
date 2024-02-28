import * as localforage from 'localforage';
import { Constituent } from '../../api/constituent/types.ts';
import { Sentence } from '../../api/sentence/types.ts';
import { Story } from '../../api/story/types.ts';

localforage.config({
  name: 'Linguists-and-Readers',
  storeName: 'data',
});

export const saveStory = async (story: Story) => {
  try {
    await localforage.setItem(story.id, story);

    console.log('[IndexedDB - saveStory] Story saved:', story.id);
  } catch (error) {
    console.error('[IndexedDB - saveStory] Error saving story:', error);
  }
};

export const getStory = async (storyId: string): Promise<Story | undefined> => {
  try {
    const story = await localforage.getItem(storyId);

    console.log('[IndexedDB - getStory] Story retrieved:', storyId);
    return story as Story;
  } catch (error) {
    console.error('[IndexedDB - getStory] Error retrieving story:', error);
    return undefined;
  }
};

export const saveSentences = async (storyId: string, sentences: Sentence[]) => {
  const sentencesSaveId = `${storyId}-sentences`;

  try {
    await localforage.setItem(sentencesSaveId, sentences);

    console.log('[IndexedDB - saveSentences] Sentences saved for story:', storyId);
  } catch (error) {
    console.error('[IndexedDB - saveSentences] Error saving sentences:', error);
  }
};

export const getSentences = async (storyId: string): Promise<Sentence[] | undefined> => {
  const sentencesSaveId = `${storyId}-sentences`;

  try {
    const sentences = await localforage.getItem(sentencesSaveId);

    console.log('[IndexedDB - getSentences] Sentences retrieved for story:', storyId);
    return sentences as Sentence[];
  } catch (error) {
    console.error('[IndexedDB - getSentences] Error retrieving sentences:', error);
    return undefined;
  }
};

export const saveConstituents = async (storyId: string, constituents: Constituent[]) => {
  const constituentsSaveId = `${storyId}-constituents`;

  try {
    await localforage.setItem(constituentsSaveId, constituents);

    console.log('[IndexedDB - saveConstituents] Constituents saved for story:', storyId);
  } catch (error) {
    console.error('[IndexedDB - saveConstituents] Error saving constituents:', error);
  }
};

export const getConstituents = async (storyId: string): Promise<Constituent[] | undefined> => {
  const constituentsSaveId = `${storyId}-constituents`;

  try {
    const constituents = await localforage.getItem(constituentsSaveId);

    console.log('[IndexedDB - getConstituents] Constituents retrieved for story:', storyId);
    return constituents as Constituent[];
  } catch (error) {
    console.error('[IndexedDB - getConstituents] Error retrieving constituents:', error);
    return undefined;
  }
};
