import { Translation } from '../types.ts';

export interface Constituent {
  id: string;
  text: string;

  linkedSentenceId: string;
  linkedStoryId: string;
  linkedConstituentTranslationIds?: Translation[];

  // Linguistic properties
  lemma?: string;
  partOfSpeech?: string;
  partOfSpeechExplanation?: string;
  tag?: string;
  dependencyType?: string;
  dependencyTypeExplanation?: string;

  morphology?: {
    [key: string]: string[];
  };
}

export interface ConstituentJson extends Record<string, undefined | string | { [p: string]: string[] }> {
  id: string;
  text: string;

  linkedSentenceId: string;
  linkedStoryId: string;

  lemma?: string;
  partOfSpeech?: string;
  tag?: string;
  dependencyType?: string;
  dependencyTypeExplanation?: string;
  morphology?: {
    [key: string]: string[];
  };
}
