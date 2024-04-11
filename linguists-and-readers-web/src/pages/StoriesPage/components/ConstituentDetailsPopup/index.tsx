// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { Popper, Tooltip } from '@mui/material';
import { LocalComponents } from './styled.ts';
import { Dispatch, MutableRefObject, SetStateAction, useContext, useEffect, useState } from 'react';
import { ConstituentType } from '../../../../api/constituent/types.ts';
import { mapConstituentKeyToText } from '../../../../utils';
import CloseIcon from '@mui/icons-material/Close';
import { BOOK_TO_CUNIA_REPLACEMENTS, MORPHOLOGY_DICTIONARY } from '../../../../utils/defines.ts';
import { DictionaryContext } from '../../../../providers/DictionaryProvider/context.ts';
import { useNavigate } from 'react-router-dom';
import { StoriesContext } from '../../../../providers/StoriesProvider/context.ts';
import AromanianDefinitionModal from '../../../../components/modals/AromanianDefinitionModal';

const ConstituentDetailsPopup = ({
  anchor,
  setAnchor,
  selectedConstituentRef,
  storyNumber,
}: {
  anchor: HTMLElement | null;
  setAnchor: Dispatch<SetStateAction<HTMLElement | null>>;
  selectedConstituentRef: MutableRefObject<undefined | ConstituentType>;
  storyNumber: 'first' | 'second';
}) => {
  const navigate = useNavigate();

  const { aromanianDictionary, searchValue, oldSearchValue, setSearchValue, searchDictionary } =
    useContext(DictionaryContext);
  const { story, secondStory } = useContext(StoriesContext);

  const [isAromanianDefinitionModal, setIsAromanianDefinitionModalOpen] = useState<boolean>(false);

  const isOpen = Boolean(anchor);
  const shownConstituentKeys = ['lemma', 'partOfSpeechExplanation', 'dependencyTypeExplanation'];

  const isConstituentInAromanian =
    (storyNumber === 'first' && story?.language !== 'romanian') ||
    (storyNumber === 'second' && secondStory?.language !== 'romanian');

  const replaceBookToCuniaExpressions = (text: string) => {
    let replacedText = '';

    for (let i = 0; i < text?.length; i++) {
      if (BOOK_TO_CUNIA_REPLACEMENTS[text[i]]) {
        replacedText += BOOK_TO_CUNIA_REPLACEMENTS[text[i]];
        continue;
      }

      replacedText += text[i];
    }

    return replacedText.toLowerCase();
  };

  const reformattedText = replaceBookToCuniaExpressions(selectedConstituentRef.current?.text);

  const isAromanianConstituentInDictionary = isConstituentInAromanian && aromanianDictionary?.[reformattedText];

  useEffect(() => {
    if (searchValue === oldSearchValue) {
      return;
    }

    searchDictionary().then(() => {
      navigate(`/dictionary`);
    });
  }, [searchValue]);

  const onCloseClick = () => {
    selectedConstituentRef.current = undefined;
    setAnchor(null);
  };

  const onDescriptionClick = (key: string, value?: string) => {
    if (key !== 'lemma' || !value) {
      return;
    }

    setSearchValue(value);
  };

  const onAromanianDefinitionModalClose = () => {
    setIsAromanianDefinitionModalOpen(false);
  };

  return (
    <Popper
      anchorEl={anchor}
      open={isOpen}
      disablePortal={true}
      style={{ zIndex: 1000 }}
      modifiers={[
        {
          name: 'flip',
          options: {
            altBoundary: true,
            rootBoundary: 'viewport',
          },
        },
        {
          name: 'preventOverflow',
          options: {
            altAxis: true,
            rootBoundary: 'viewport',
          },
        },
      ]}>
      <LocalComponents.Container>
        <LocalComponents.CloseIconWrapper onClick={onCloseClick}>
          <CloseIcon />
        </LocalComponents.CloseIconWrapper>
        <LocalComponents.Title>{selectedConstituentRef.current?.text}</LocalComponents.Title>
        {selectedConstituentRef.current &&
          Object.keys(selectedConstituentRef.current).map((key) => {
            if (shownConstituentKeys.includes(key)) {
              return (
                <LocalComponents.ValueWrapper key={key}>
                  <LocalComponents.Key>
                    {mapConstituentKeyToText(key, isConstituentInAromanian, isAromanianConstituentInDictionary)}
                  </LocalComponents.Key>
                  {key === 'lemma' && !isConstituentInAromanian ? (
                    <Tooltip title={<h1 style={{ fontSize: '1.2rem' }}>Go to dictionary</h1>} arrow>
                      <LocalComponents.Description
                        $isClickable={true}
                        onClick={() => onDescriptionClick(key, selectedConstituentRef.current?.[key]?.toString())}>
                        {selectedConstituentRef.current?.[key]?.toString()}
                      </LocalComponents.Description>
                    </Tooltip>
                  ) : key !== 'lemma' ? (
                    <LocalComponents.Description>
                      {selectedConstituentRef.current?.[key]?.toString()}
                    </LocalComponents.Description>
                  ) : (
                    isAromanianConstituentInDictionary && (
                      <LocalComponents.AromanianDescription onClick={() => setIsAromanianDefinitionModalOpen(true)}>
                        Click here
                      </LocalComponents.AromanianDescription>
                    )
                  )}
                </LocalComponents.ValueWrapper>
              );
            }
          })}
        {selectedConstituentRef.current?.morphology && (
          <LocalComponents.MorphologyWrapper>
            <LocalComponents.Key>Morphology</LocalComponents.Key>
            <LocalComponents.DescriptionList>
              {Object.keys(selectedConstituentRef.current.morphology).map((morphologyKey) => {
                return (
                  <LocalComponents.ValueWrapper key={morphologyKey}>
                    <LocalComponents.Key>
                      - {MORPHOLOGY_DICTIONARY?.[morphologyKey]?.explanation ?? 'Other'}:
                    </LocalComponents.Key>
                    <LocalComponents.DescriptionWrapper>
                      {selectedConstituentRef.current?.morphology?.[morphologyKey].map(
                        (morphologyIndividualValue, index) => {
                          return (
                            <LocalComponents.Description key={morphologyIndividualValue}>
                              {MORPHOLOGY_DICTIONARY?.[morphologyKey]?.[morphologyIndividualValue]?.toLowerCase()}
                              {index < (selectedConstituentRef.current?.morphology?.[morphologyKey]?.length ?? 1) - 1 &&
                                ', '}
                            </LocalComponents.Description>
                          );
                        },
                      )}
                    </LocalComponents.DescriptionWrapper>
                  </LocalComponents.ValueWrapper>
                );
              })}
            </LocalComponents.DescriptionList>
          </LocalComponents.MorphologyWrapper>
        )}
      </LocalComponents.Container>
      <AromanianDefinitionModal
        isModalOpen={isAromanianDefinitionModal}
        onClose={onAromanianDefinitionModalClose}
        reformattedText={reformattedText}
      />
    </Popper>
  );
};

export default ConstituentDetailsPopup;
