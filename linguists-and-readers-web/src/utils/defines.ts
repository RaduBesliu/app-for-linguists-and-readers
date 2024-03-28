// noinspection SpellCheckingInspection

export const USER_ROLES = ['Linguist', 'Reader'] as const;

export const ALIGNMENTS_OPTIONS = ['Constituents', 'Sentences', 'Read'] as const;

export const MESSAGES = {
  errorEmailRequired: 'The email address is required!',
  errorEmailNotVerified: 'Email not verified! Please check your inbox.',
  errorEmailInvalid: 'The email address is invalid!',

  errorPasswordRequired: 'The password is required!',
  errorPasswordLength: 'The password must be at least 6 characters long!',
  errorPasswordMatch: 'The passwords do not match!',

  errorFirstNameRequired: 'The first name is required!',

  errorLastNameRequired: 'The last name is required!',

  errorRoleRequired: 'The role is required!',

  errorInvalidCredentials: 'Invalid credentials! Please try again.',

  errorAccountCreation: 'There was an error creating your account. Please try again.',

  errorGoogleSignIn: 'There was an error signing in with Google. Please try again.',

  errorSendPasswordResetEmail: 'There was an error sending the password reset email. Please try again.',

  errorUpdateAccountDetails: 'There was an error updating your account details. Please try again.',

  errorMarkStoryAsRead: 'There was an error marking the story as read. Please try again.',
  errorMarkStoryAsUnread: 'There was an error marking the story as unread. Please try again.',

  errorSaveAlignment: 'There was an error saving the alignment. Please try again.',

  errorDeleteAlignment: 'There was an error deleting the alignment. Please try again.',

  successLogin: 'You have successfully logged in!',

  successRegister: 'Your account was successfully created! Verification email sent!',

  successGoogleSignIn: 'You have successfully signed in with Google!',

  successSendPasswordResetEmail: 'Password reset email sent! Please check your inbox.',

  successUpdateAccountDetails: 'Your account details were successfully updated!',

  successMarkStoryAsRead: 'Story marked as read!',
  successMarkStoryAsUnread: 'Story marked as unread!',

  successSaveAlignment: 'Alignment saved successfully!',

  successDeleteAlignment: 'Alignment deleted successfully!',
};

export const MORPHOLOGY_DICTIONARY: Record<string, object> = {
  'adptype': {
    explanation: 'Adposition Type',
    prep: 'Preposition',
  },
  'case': {
    explanation: 'Grammatical Case',
    acc: 'Accusative',
    nom: 'Nominative',
    dat: 'Dative',
    gen: 'Genitive',
    voc: 'Vocative',
  },
  'definite': {
    explanation: 'Definiteness',
    def: 'Definite',
    ind: 'Indefinite',
  },
  'degree': {
    explanation: 'Degree of Comparison',
    pos: 'Positive',
    comp: 'Comparative',
    sup: 'Superlative',
  },
  'gender': {
    explanation: 'Grammatical Gender',
    masc: 'Masculine',
    fem: 'Feminine',
    neut: 'Neuter',
  },
  'mood': {
    explanation: 'Mood of the Verb',
    ind: 'Indicative',
    sub: 'Subjunctive',
    imp: 'Imperative',
  },
  'number': {
    explanation: 'Grammatical Number',
    sing: 'Singular',
    plur: 'Plural',
  },
  'numform': {
    explanation: 'Numeral Form',
    word: 'Word',
    digit: 'Digit',
    roman: 'Roman Numeral',
  },
  'numtype': {
    explanation: 'Type of Numeral',
    card: 'Cardinal number',
    ord: 'Ordinal number',
  },
  'person': {
    'explanation': 'Grammatical Person',
    '1': 'First Person',
    '2': 'Second Person',
    '3': 'Third Person',
  },
  'polarity': {
    explanation: 'Polarity',
    pos: 'Positive',
    neg: 'Negative',
  },
  'position': {
    explanation: 'Position in Relation to the Noun',
    prenom: 'Prenominal',
    postnom: 'Postnominal',
  },
  'poss': {
    explanation: 'Possessiveness',
    yes: 'Possessive',
  },
  'prontype': {
    explanation: 'Pronoun Type',
    int: 'Interrogative',
    rel: 'Relative',
    dem: 'Demonstrative',
    ind: 'Indefinite',
    neg: 'Negative',
    prs: 'Personal',
    art: 'Article',
    tot: 'Total',
    emp: 'Emphatic',
  },
  'reflex': {
    explanation: 'Reflexivity',
    yes: 'Reflexive',
  },
  'strength': {
    explanation: 'Clitic Strength',
    weak: 'Weak',
    strong: 'Strong',
  },
  'tense': {
    explanation: 'Verb Tense',
    past: 'Past',
    pres: 'Present',
    imp: 'Imperfect',
    pqp: 'Pluperfect',
    fut: 'Future',
  },
  'variant': {
    explanation: 'Form Variant',
    short: 'Short',
    long: 'Long',
  },
  'verbform': {
    explanation: 'Verb Form',
    ger: 'Gerund',
    part: 'Participle',
    fin: 'Finite',
    inf: 'Infinitive',
  },
  'abbr': {
    explanation: 'Abbreviation',
    yes: 'Yes',
  },
  'number[psor]': {
    explanation: 'Number for Possessor',
    sing: 'Singular',
    plur: 'Plural',
  },
  'parttype': {
    explanation: 'Particle Type',
    inf: 'Infinitive Marker',
  },
};

export const HOME_INFORMATION = [
  {
    title: 'Stories',
    description:
      'Stories are a great way to learn new things. Read stories in different languages and see their morphological analysis or navigate to the dictionary to look up words.',
    navigateTo: '/stories',
  },
  {
    title: 'Dictionary',
    description:
      'Use the dictionary to look up words in Romanian (and Aromanian). You can also see detailed information about each word.',
    navigateTo: '/dictionary',
  },
  {
    title: 'Alignments',
    description:
      'Alignments are a great way to match sentences and words in different languages. You can manually align them by clicking on each word/sentence.',
    navigateTo: '/alignments',
  },
  {
    title: 'Account',
    description:
      'Manage your account details and preferences. You can also change your password, role or modify your account details.',
    navigateTo: '/account',
  },
];

export const DEFAULT_ALERT_DURATION = 3000;
