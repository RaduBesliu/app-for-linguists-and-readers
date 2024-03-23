import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { DictionaryContext } from './context.ts';
import { DictionaryResult } from '../../api/dictionary/types.ts';

export const DictionaryProvider = ({ children }: { children: ReactNode }) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [results, setResults] = useState<DictionaryResult | undefined>(undefined);

  useEffect(() => {
    if (!searchValue) {
      setResults(undefined);
      return;
    }

    searchDictionary().then();
  }, [searchValue]);

  const fetchResultsForSearchValue = async (dictionarySearchValue: string) => {
    console.log('[fetchResultsForSearchValue] Fetching results for:', dictionarySearchValue);

    const result = await fetch(`https://dexonline.ro/definitie/${dictionarySearchValue}/json`);
    const data = (await result.json()) as DictionaryResult;

    console.log('[fetchResultsForSearchValue] Data:', data);
    setResults(data);
  };

  const searchDictionary = useCallback(async () => {
    const searchValueTrimmed = searchValue.trim();
    setSearchValue(searchValueTrimmed);

    if (!searchValueTrimmed) {
      console.log('[searchDictionary] Search value is empty');
      setResults(undefined);
      return;
    }

    console.log('[searchDictionary] Search for:', searchValueTrimmed);
    await fetchResultsForSearchValue(searchValueTrimmed);
  }, [searchValue]);

  const value = useMemo(
    () => ({
      searchValue,
      results,
      searchDictionary,
      setSearchValue,
    }),
    [results, searchDictionary, searchValue],
  );

  return <DictionaryContext.Provider value={value}>{children}</DictionaryContext.Provider>;
};

export default DictionaryProvider;
