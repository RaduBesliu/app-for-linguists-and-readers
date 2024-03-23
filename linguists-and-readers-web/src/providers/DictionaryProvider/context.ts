import { createContext, Dispatch, SetStateAction } from 'react';
import { DictionaryResult } from '../../api/dictionary/types.ts';

interface DictionaryContextProps {
  searchValue: string;
  oldSearchValue: string;
  results: DictionaryResult | undefined;
  setSearchValue: Dispatch<SetStateAction<string>>;
  searchDictionary: () => Promise<void>;
}

export const DictionaryContext = createContext<DictionaryContextProps>({
  searchValue: '',
  oldSearchValue: '',
  results: undefined,
  setSearchValue: () => {},
  searchDictionary: async () => {},
});
