export interface DictionaryEntry {
  type: string;
  id: string;
  sourceName: string;
  htmlRep: string;
  createDate: number;
  modDate?: number;
}

export interface DictionaryResult {
  word: string;
  definitions: DictionaryEntry[];
}

export interface AromanianDictionary {
  [key: string]: {
    definitions: string[];
    translations: {
      [key: string]: string[];
    }[];
  };
}
