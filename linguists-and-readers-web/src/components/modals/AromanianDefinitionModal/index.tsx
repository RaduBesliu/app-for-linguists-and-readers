// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Modal } from '@mui/material';
import { LocalComponents } from './styled.ts';
import { modalContainerStyles } from '../../styled.ts';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { Fragment, useContext, useState } from 'react';
import { DictionaryContext } from '../../../providers/DictionaryProvider/context.ts';

const AromanianDefinitionModal = ({
  isModalOpen,
  onClose,
  reformattedText,
}: {
  isModalOpen: boolean;
  onClose: () => void;
  reformattedText: string;
}) => {
  const { aromanianDictionary } = useContext(DictionaryContext);

  const [localReformattedText, setLocalReformattedText] = useState<string>(reformattedText);

  const onCloseClick = () => {
    onClose();
  };

  const onLinkedDefinitionClick = (definition: string) => {
    setLocalReformattedText(definition.trim());
  };

  return (
    <Modal open={isModalOpen} onClose={onClose} style={modalContainerStyles}>
      <LocalComponents.Container>
        <LocalComponents.CloseIconWrapper onClick={onCloseClick}>
          <CloseIcon fontSize={'large'} />
        </LocalComponents.CloseIconWrapper>
        <LocalComponents.Key>{localReformattedText} - Definitions (scroll for more)</LocalComponents.Key>
        <LocalComponents.Separator />
        {aromanianDictionary?.[localReformattedText]?.definitions?.map((definition, index) => {
          const regex = new RegExp('{(\\w{2}):\\s*\\*?(.+?})', 'g');
          const parsedDefinition = definition?.replace(regex, '');
          const linkedDefinition = parsedDefinition?.match('vedz tu') ? parsedDefinition?.split('vedz tu')[1] : null;

          return (
            <Fragment key={index + definition}>
              {linkedDefinition && aromanianDictionary?.[linkedDefinition.trim()] ? (
                <LocalComponents.DefinitionLink>
                  <LocalComponents.Key>{index + 1}. vedz tu </LocalComponents.Key>
                  <LocalComponents.HighlightedKey onClick={() => onLinkedDefinitionClick(linkedDefinition)}>
                    {linkedDefinition}
                  </LocalComponents.HighlightedKey>
                </LocalComponents.DefinitionLink>
              ) : (
                <>
                  <LocalComponents.Key>
                    {index + 1}.{' '}
                    {parsedDefinition?.indexOf('§') === -1 ? parsedDefinition : parsedDefinition?.split('§')[0]}
                  </LocalComponents.Key>
                  {parsedDefinition?.indexOf('§') !== -1 && (
                    <>
                      <LocalComponents.Separator />
                      <LocalComponents.Key>Usage / other definitions</LocalComponents.Key>
                      <LocalComponents.Separator />
                      {parsedDefinition
                        ?.split('§')
                        .slice(1)
                        .map((other, usageIndex) => {
                          return (
                            <LocalComponents.Key key={usageIndex + other}>
                              {usageIndex + 1}. {other}
                            </LocalComponents.Key>
                          );
                        })}
                    </>
                  )}
                </>
              )}
            </Fragment>
          );
        })}
        <LocalComponents.Separator />
        {aromanianDictionary?.[localReformattedText]?.translations && (
          <>
            <LocalComponents.Key>Translations</LocalComponents.Key>
            <LocalComponents.Separator />
            {Object.keys(aromanianDictionary?.[localReformattedText]?.translations)?.map((translationIndex, index) => {
              return (
                <Fragment key={index + translationIndex}>
                  <LocalComponents.Key>{translationIndex.toUpperCase()}</LocalComponents.Key>
                  {aromanianDictionary?.[localReformattedText]?.translations[translationIndex]?.map(
                    (translation, tIndex) => {
                      const parsedTranslation = translation.substring(1, translation.length - 1);
                      return (
                        <LocalComponents.Key key={tIndex + translationIndex + translation}>
                          {' '}
                          - {parsedTranslation}
                        </LocalComponents.Key>
                      );
                    },
                  )}
                  <LocalComponents.Separator />
                </Fragment>
              );
            })}
          </>
        )}
        <LocalComponents.DangerTextWrapper>
          <WarningAmberOutlinedIcon fontSize={'inherit'} />
          Warning! Some definitions may not be accurate. Please consult a dictionary for more information.
        </LocalComponents.DangerTextWrapper>
        <LocalComponents.DangerTextWrapper>
          <WarningAmberOutlinedIcon fontSize={'inherit'} />
          Translations may not synced between one another. Please consult a dictionary for more information.
        </LocalComponents.DangerTextWrapper>
      </LocalComponents.Container>
    </Modal>
  );
};

export default AromanianDefinitionModal;
