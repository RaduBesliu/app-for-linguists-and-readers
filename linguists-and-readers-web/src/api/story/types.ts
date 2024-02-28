import { Timestamp } from 'firebase/firestore';
import { Translation } from '../types.ts';
import { SentenceJson } from '../sentence/types.ts';

export interface Story {
  id: string;
  title: string;
  createdAt: Timestamp;
  updatedAt?: Timestamp;
  sentenceIds: string[];
  language: string;
  isInOriginalLanguage: boolean;
  linkedStoryTranslationIds?: Translation[];
}

export interface StoryJson {
  id: string;
  title: string;
  createdAt: number;
  sentences?: SentenceJson[];
  language: string;
  isInOriginalLanguage: boolean;
}
