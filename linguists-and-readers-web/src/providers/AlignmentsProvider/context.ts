import { Alignment, Alignments } from '../../api/alignment/types.ts';
import { createContext, Dispatch, SetStateAction } from 'react';

interface AlignmentsContextProps {
  allUserAlignments: Alignments[];
  currentStoriesAlignment: Alignments | undefined;
  localAlignment: Alignment | undefined;
  selectedMode: ('constituents' | 'sentences' | 'read')[];
  spacedSentences: boolean;
  colorMappingObject: Record<string, string>;
  setAllUserAlignments: Dispatch<SetStateAction<Alignments[]>>;
  setCurrentStoriesAlignment: Dispatch<SetStateAction<Alignments | undefined>>;
  setLocalAlignment: Dispatch<SetStateAction<Alignment | undefined>>;
  setSelectedMode: Dispatch<SetStateAction<('constituents' | 'sentences' | 'read')[]>>;
  setSpacedSentences: Dispatch<SetStateAction<boolean>>;
  saveLocalAlignment: (leftStoryId: string, rightStoryId: string, alignment: Alignment) => void;
}

export const AlignmentsContext = createContext<AlignmentsContextProps>({
  allUserAlignments: [],
  currentStoriesAlignment: undefined,
  localAlignment: undefined,
  selectedMode: ['read'],
  spacedSentences: false,
  colorMappingObject: {},
  setAllUserAlignments: () => {},
  setCurrentStoriesAlignment: () => {},
  setLocalAlignment: () => {},
  setSelectedMode: () => {},
  setSpacedSentences: () => {},
  saveLocalAlignment: () => {},
});
