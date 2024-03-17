import { Alignments } from '../alignment/types.ts';

export interface Profile {
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: 'linguist' | 'reader';

  readStories?: string[];
  personalAlignments?: Alignments[];
}
