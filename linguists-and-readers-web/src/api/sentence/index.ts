import { db } from '../../utils/firebase.ts';
import { Sentence, SentenceJson } from './types.ts';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { uploadConstituentsFromJson } from '../constituent';

export const uploadSentenceFromJson = async (sentenceJson: SentenceJson) => {
  const sentenceRef = doc(db, 'stories', sentenceJson.linkedStoryId, 'sentences', sentenceJson.id);

  const sentence = {
    id: sentenceJson.id,
    linkedStoryId: sentenceJson.linkedStoryId,
    constituentIds: sentenceJson.constituents?.map((constituent) => constituent.id) || [],
  };

  await setDoc(sentenceRef, sentence);

  await uploadConstituentsFromJson(sentenceJson.constituents || [], sentenceJson.linkedStoryId, sentenceJson.id);
};

export const getSentences = async (storyId: string, sentenceIds: string[]) => {
  console.log('[getSentences] Getting', sentenceIds.length, 'sentences from story with id', storyId);

  const sentences = await Promise.all(
    sentenceIds.map(async (sentenceId) => {
      const sentenceDoc = doc(db, 'stories', storyId, 'sentences', sentenceId);
      const sentenceSnapshot = await getDoc(sentenceDoc);

      if (sentenceSnapshot.exists()) {
        return sentenceSnapshot.data();
      }

      console.log('[getSentences] Sentence with id', sentenceId, 'does not exist in story with id', storyId);
      return undefined;
    }),
  );

  return sentences.filter((sentence) => sentence !== undefined) as Sentence[];
};
