import { Alignments } from '../../api/alignment/types.ts';
import { createContext, Dispatch, SetStateAction } from 'react';

interface AlignmentsContextProps {
  allUserAlignments: Alignments[];
  currentStoriesAlignment: Alignments | undefined;
  localAlignmentIds: string[];
  selectedMode: ('constituents' | 'sentences' | 'read')[];
  spacedSentences: boolean;
  setAllUserAlignments: Dispatch<SetStateAction<Alignments[]>>;
  setCurrentStoriesAlignment: Dispatch<SetStateAction<Alignments | undefined>>;
  setLocalAlignmentIds: Dispatch<SetStateAction<string[]>>;
  setSelectedMode: Dispatch<SetStateAction<('constituents' | 'sentences' | 'read')[]>>;
  setSpacedSentences: Dispatch<SetStateAction<boolean>>;
}

export const AlignmentsContext = createContext<AlignmentsContextProps>({
  allUserAlignments: [],
  currentStoriesAlignment: undefined,
  localAlignmentIds: [],
  selectedMode: ['read'],
  spacedSentences: false,
  setAllUserAlignments: () => {},
  setCurrentStoriesAlignment: () => {},
  setLocalAlignmentIds: () => {},
  setSelectedMode: () => {},
  setSpacedSentences: () => {},
});
