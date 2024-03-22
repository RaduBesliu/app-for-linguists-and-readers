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

export const generateRandomId = ({ length = 20 }: { length?: number }) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export function createRandomColorGenerator() {
  return {
    next: () => {
      // Generate the next color
      const randomRed = Math.floor(Math.random() * 256);
      const randomGreen = Math.floor(Math.random() * 256);
      const randomBlue = Math.floor(Math.random() * 256);
      return `rgb(${randomRed}, ${randomGreen}, ${randomBlue})`;
    },
  };
}

export const isColorLight = (color: string) => {
  const red = parseInt(color.slice(4, color.indexOf(',')), 10);
  const green = parseInt(color.slice(color.indexOf(',') + 2, color.lastIndexOf(',')), 10);
  const blue = parseInt(color.slice(color.lastIndexOf(',') + 2, color.indexOf(')')), 10);

  const brightness = (red * 299 + green * 587 + blue * 114) / 1000;
  return brightness > 120;
};
