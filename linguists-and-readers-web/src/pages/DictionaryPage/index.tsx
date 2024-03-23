import { LocalComponents } from './styled.ts';
import TextInput from '../../components/TextInput';
import { useContext } from 'react';
import Button from '../../components/Button';
import { DictionaryContext } from '../../providers/DictionaryProvider/context.ts';
import parse from 'html-react-parser';

const DictionaryPage = () => {
  const { searchValue, results, setSearchValue, searchDictionary } = useContext(DictionaryContext);

  return (
    <LocalComponents.Container>
      <LocalComponents.Header>
        <LocalComponents.Title>
          Search the dictionary{' '}
          {results && `- ${results.definitions.length} result${results.definitions.length > 1 ? 's' : ''} found`}
        </LocalComponents.Title>
        <LocalComponents.SearchWrapper>
          <TextInput value={searchValue} setValue={setSearchValue} placeholder='Search for a word' />
          <Button label={'Search'} width={256} onClick={searchDictionary} />
        </LocalComponents.SearchWrapper>
      </LocalComponents.Header>
      <LocalComponents.DictionaryResultWrapper>
        {results?.definitions?.map((result) => (
          <LocalComponents.DictionaryEntry key={result?.id}>
            <LocalComponents.DictionaryEntryText>{parse(result.htmlRep)}</LocalComponents.DictionaryEntryText>
            <LocalComponents.DictionaryEntryAdditionalInfoContainer>
              <LocalComponents.DictionaryEntryDatesContainer>
                <LocalComponents.DictionaryEntryDate>
                  Created at {new Date(result.createDate * 1000).toLocaleDateString()}
                </LocalComponents.DictionaryEntryDate>
                {result.modDate && (
                  <LocalComponents.DictionaryEntryDate>
                    Last modified at {new Date(result.modDate * 1000).toLocaleDateString()}
                  </LocalComponents.DictionaryEntryDate>
                )}
              </LocalComponents.DictionaryEntryDatesContainer>
              <LocalComponents.DictionaryEntrySource>{result.sourceName}</LocalComponents.DictionaryEntrySource>
            </LocalComponents.DictionaryEntryAdditionalInfoContainer>
          </LocalComponents.DictionaryEntry>
        ))}
      </LocalComponents.DictionaryResultWrapper>
    </LocalComponents.Container>
  );
};

export default DictionaryPage;
