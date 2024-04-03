import { Alignment, Alignments } from '../../api/alignment/types.ts';
import { createContext, Dispatch, SetStateAction } from 'react';

interface AlignmentsContextProps {
  allUserAlignments: Alignments[];
  currentStoriesAlignment: Alignments | undefined;
  localAlignment: Alignment | undefined;
  selectedMode: ('constituents' | 'sentences' | 'read' | 'default alignments')[];
  spacedSentences: boolean;
  colorMappingObject: Record<string, string[]>;
  defaultAlignmentsColorMappingObject: Record<string, string[]>;
  selectedAlignmentId: string | undefined;
  scrollSync: boolean;
  deleteAlignment: (alignmentId: string) => Promise<void>;
  setAllUserAlignments: Dispatch<SetStateAction<Alignments[]>>;
  setCurrentStoriesAlignment: Dispatch<SetStateAction<Alignments | undefined>>;
  setLocalAlignment: Dispatch<SetStateAction<Alignment | undefined>>;
  setSelectedMode: Dispatch<SetStateAction<('constituents' | 'sentences' | 'read' | 'default alignments')[]>>;
  setSpacedSentences: Dispatch<SetStateAction<boolean>>;
  saveLocalAlignment: (leftStoryId: string, rightStoryId: string, alignment: Alignment) => void;
  setSelectedAlignmentId: Dispatch<SetStateAction<string | undefined>>;
  setScrollSync: Dispatch<SetStateAction<boolean>>;
}

export const AlignmentsContext = createContext<AlignmentsContextProps>({
  allUserAlignments: [],
  currentStoriesAlignment: undefined,
  localAlignment: undefined,
  selectedMode: ['read'],
  spacedSentences: false,
  colorMappingObject: {},
  defaultAlignmentsColorMappingObject: {},
  selectedAlignmentId: undefined,
  scrollSync: true,
  deleteAlignment: () => Promise.resolve(),
  setAllUserAlignments: () => {},
  setCurrentStoriesAlignment: () => {},
  setLocalAlignment: () => {},
  setSelectedMode: () => {},
  setSpacedSentences: () => {},
  saveLocalAlignment: () => {},
  setSelectedAlignmentId: () => {},
  setScrollSync: () => {},
});
