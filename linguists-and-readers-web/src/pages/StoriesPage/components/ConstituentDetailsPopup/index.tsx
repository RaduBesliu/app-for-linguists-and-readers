import { Popper } from '@mui/material';
import { LocalComponents } from './styled.ts';
import { Dispatch, MutableRefObject, SetStateAction, useContext, useEffect } from 'react';
import { ConstituentJson } from '../../../../api/constituent/types.ts';
import { mapConstituentKeyToText } from '../../../../utils';
import CloseIcon from '@mui/icons-material/Close';
import { MORPHOLOGY_DICTIONARY } from '../../../../utils/defines.ts';
import { DictionaryContext } from '../../../../providers/DictionaryProvider/context.ts';
import { useNavigate } from 'react-router-dom';

const ConstituentDetailsPopup = ({
  anchor,
  setAnchor,
  selectedConstituentRef,
}: {
  anchor: HTMLElement | null;
  setAnchor: Dispatch<SetStateAction<HTMLElement | null>>;
  selectedConstituentRef: MutableRefObject<undefined | ConstituentJson>;
}) => {
  const navigate = useNavigate();

  const { searchValue, oldSearchValue, setSearchValue, searchDictionary } = useContext(DictionaryContext);

  const isOpen = Boolean(anchor);
  const shownConstituentKeys = ['lemma', 'partOfSpeechExplanation', 'dependencyTypeExplanation'];

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
                  <LocalComponents.Key>{mapConstituentKeyToText(key)}:</LocalComponents.Key>
                  <LocalComponents.Description
                    $isClickable={key === 'lemma'}
                    onClick={() => onDescriptionClick(key, selectedConstituentRef.current?.[key]?.toString())}>
                    {selectedConstituentRef.current?.[key]?.toString()}
                  </LocalComponents.Description>
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
    </Popper>
  );
};

export default ConstituentDetailsPopup;
