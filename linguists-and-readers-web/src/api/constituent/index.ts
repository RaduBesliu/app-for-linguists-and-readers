import { Constituent, ConstituentJson } from './types.ts';
import { db } from '../../utils/firebase.ts';
import { doc, getDocs, writeBatch, query, where, collectionGroup } from 'firebase/firestore';

export const uploadConstituentsFromJson = async (
  constituentsJson: ConstituentJson[],
  storyId: string,
  sentenceId: string,
) => {
  const storyRef = doc(db, 'stories', storyId);
  const sentenceRef = doc(storyRef, 'sentences', sentenceId);

  const batch = writeBatch(db);

  for (const constituentJson of constituentsJson) {
    const constituentRef = doc(sentenceRef, 'constituents', constituentJson.id);
    batch.set(constituentRef, constituentJson);
  }

  await batch.commit();
};

export const getConstituentsForStory = async (storyId: string): Promise<Constituent[] | undefined> => {
  console.log('[getConstituentsForStory] Getting constituents for story with id', storyId);
  const startTime = new Date().getTime();

  const constituentsQuery = query(collectionGroup(db, 'constituents'), where('linkedStoryId', '==', storyId));

  const constituentsSnapshot = await getDocs(constituentsQuery);

  const constituents = constituentsSnapshot.docs.map((constituentDoc) => constituentDoc.data() as Constituent);

  console.log(
    '[getConstituentsForStory] Found',
    constituents.length,
    'constituents for story with id',
    storyId,
    'in',
    new Date().getTime() - startTime,
    'ms',
  );
  return constituents;
};
