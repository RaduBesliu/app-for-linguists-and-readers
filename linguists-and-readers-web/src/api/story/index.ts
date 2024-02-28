import { db } from '../../utils/firebase';
import { Story, StoryJson } from './types.ts';
import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore';
import { uploadSentenceFromJson } from '../sentence';
import { UPLOAD_SENTENCE_DELAY_MS } from '../../utils/defines.ts';

export const uploadStoryFromJson = async (storyJson: StoryJson) => {
  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const storyRef = doc(db, 'stories', storyJson.id);

  const story = {
    id: storyJson.id,
    title: storyJson.title,
    createdAt: Timestamp.fromDate(new Date(storyJson.createdAt)),
    sentenceIds: storyJson.sentences?.map((sentence) => sentence.id) || [],
    language: storyJson.language,
    isInOriginalLanguage: storyJson.isInOriginalLanguage,
  };

  await setDoc(storyRef, story);

  for (const sentenceJson of storyJson.sentences || []) {
    await uploadSentenceFromJson(sentenceJson);
    await delay(UPLOAD_SENTENCE_DELAY_MS);
  }
};

export const getStory = async (storyId: string) => {
  const storyRef = doc(db, 'stories', storyId);
  const storySnapshot = await getDoc(storyRef);

  if (storySnapshot.exists()) {
    console.log('[getStory] Fetching story with id:', storyId);
    return storySnapshot.data() as Story;
  }

  console.log('[getStory] No such document!');
  return undefined;
};
