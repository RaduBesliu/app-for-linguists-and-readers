export interface ConstituentType extends Record<string, undefined | string | { [p: string]: string[] }> {
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
