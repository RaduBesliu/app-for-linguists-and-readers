import { Popper } from '@mui/material';
import { LocalComponents } from './styled.ts';
import { Dispatch, MutableRefObject, SetStateAction } from 'react';
import { ConstituentJson } from '../../../../api/constituent/types.ts';
import { mapConstituentKeyToText } from '../../../../utils';
import CloseIcon from '@mui/icons-material/Close';
import { MORPHOLOGY_DICTIONARY } from '../../../../utils/defines.ts';

const ConstituentDetailsPopup = ({
  anchor,
  setAnchor,
  selectedConstituentRef,
}: {
  anchor: HTMLElement | null;
  setAnchor: Dispatch<SetStateAction<HTMLElement | null>>;
  selectedConstituentRef: MutableRefObject<undefined | ConstituentJson>;
}) => {
  const isOpen = Boolean(anchor);
  const shownConstituentKeys = ['lemma', 'partOfSpeechExplanation', 'dependencyTypeExplanation'];

  const onCloseClick = () => {
    selectedConstituentRef.current = undefined;
    setAnchor(null);
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
                  <LocalComponents.Description>
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
                      {MORPHOLOGY_DICTIONARY?.[morphologyKey]?.explanation ?? 'Other'}:
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