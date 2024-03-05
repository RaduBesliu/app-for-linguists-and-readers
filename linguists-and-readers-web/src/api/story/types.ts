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
  linkedStoryTranslationIds?: Translation[];
}

export interface StoryJson {
  id: string;
  title: string;
  createdAt: number;
  updatedAt?: number;
  sentences?: SentenceJson[];
  language: string;
}

export interface StoryMetadata {
  id: string;
  title: string;
  createdAt: Timestamp;
  updatedAt?: Timestamp;
  language: string;
}

export interface StoryList {
  [language: string]: StoryMetadata[];
}
