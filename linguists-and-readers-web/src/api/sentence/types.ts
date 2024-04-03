import { ConstituentType } from '../constituent/types.ts';

export interface SentenceType {
  id: string;
  linkedStoryId: string;
  constituents?: ConstituentType[];
  defaultAlignmentIds?: [number[]];
}
