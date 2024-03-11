export const validateEmail = (email: string) => {
  return email.toLowerCase().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
};

export const mapConstituentKeyToText = (key: string) => {
  switch (key) {
    case 'dependencyTypeExplanation':
      return 'Dependency type';
    case 'partOfSpeechExplanation':
      return 'Part of speech';
    case 'lemma':
      return 'Lemma';
    default:
      return 'Other';
  }
};
