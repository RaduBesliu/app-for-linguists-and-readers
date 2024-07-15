import { AromanianDictionary } from './types.ts';
import { getAromanianDictionaryFromIndexedDb, saveAromanianDictionaryToIndexedDb } from '../../utils/indexedDb';

export const getAromanianDictionary = async (): Promise<AromanianDictionary | undefined> => {
  try {
    console.log('[getAromanianDictionary] Fetching aromanian dictionary');

    const aromanianDictionaryFromIndexedDb = await getAromanianDictionaryFromIndexedDb();

    if (aromanianDictionaryFromIndexedDb) {
      console.log(
        '[getAromanianDictionary] Retrieved aromanian dictionary from indexed db',
        Object.keys(aromanianDictionaryFromIndexedDb).length,
      );

      return aromanianDictionaryFromIndexedDb;
    }

    const response = await fetch(`http://localhost:8000/get-dictionary`);

    if (!response.ok) {
      console.log('[getAromanianDictionary] Failed to fetch aromanian dictionary');
      return undefined;
    }

    const aromanianDictionary = (await response.json()) as AromanianDictionary;
    console.log('[getAromanianDictionary] Fetched aromanian dictionary', Object.keys(aromanianDictionary).length);

    await saveAromanianDictionaryToIndexedDb(aromanianDictionary);

    return aromanianDictionary;
  } catch (error) {
    console.error('[getAromanianDictionary] Error fetching aromanian dictionary', error);
    return undefined;
  }
};
