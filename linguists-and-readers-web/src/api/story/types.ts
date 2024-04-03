import { Timestamp } from 'firebase/firestore';
import { SentenceType } from '../sentence/types.ts';

export interface Story {
  id: string;
  title: string;
  createdAt: number;
  updatedAt?: number;
  sentences?: SentenceType[];
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
