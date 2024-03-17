export interface Alignment {
  id: string;

  leftConstituentIds?: string[];
  rightConstituentIds?: string[];

  leftSentenceIds?: string;
  rightSentenceIds?: string;
}

export interface Alignments {
  id: string;
  leftStoryId: string;
  rightStoryId: string;

  sentenceAlignments: Alignment[];
  constituentAlignments: Alignment[];
}
