import { Translation } from '../types.ts';
import { ConstituentJson } from '../constituent/types.ts';

export interface Sentence {
  id: string;
  linkedStoryId: string;
  constituentIds: string[];
  linkedSentenceTranslationIds?: Translation[];
}

export interface SentenceJson {
  id: string;
  linkedStoryId: string;
  constituents?: ConstituentJson[];
}
