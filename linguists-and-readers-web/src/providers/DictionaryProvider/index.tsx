import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { DictionaryContext } from './context.ts';
import { AromanianDictionary, DictionaryResult } from '../../api/dictionary/types.ts';
import { getAromanianDictionary } from '../../api/dictionary';

export const DictionaryProvider = ({ children }: { children: ReactNode }) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [oldSearchValue, setOldSearchValue] = useState<string>('');
  const [results, setResults] = useState<DictionaryResult | undefined>(undefined);

  const [aromanianDictionary, setAromanianDictionary] = useState<AromanianDictionary | undefined>(undefined);

  useEffect(() => {
    if (!searchValue) {
      setResults(undefined);
      return;
    }

    searchDictionary().then();
  }, []);

  useEffect(() => {
    if (aromanianDictionary) {
      return;
    }

    getAromanianDictionary().then((data) => {
      setAromanianDictionary(data);
    });
  }, []);

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

    setOldSearchValue(searchValueTrimmed);
  }, [searchValue]);

  const value = useMemo(
    () => ({
      searchValue,
      oldSearchValue,
      results,
      searchDictionary,
      setSearchValue,
      aromanianDictionary,
    }),
    [results, searchDictionary, searchValue, aromanianDictionary],
  );

  return <DictionaryContext.Provider value={value}>{children}</DictionaryContext.Provider>;
};

export default DictionaryProvider;
