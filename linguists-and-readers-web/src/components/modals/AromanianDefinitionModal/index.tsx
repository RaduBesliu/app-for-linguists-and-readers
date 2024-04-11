// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Modal } from '@mui/material';
import { LocalComponents } from './styled.ts';
import { modalContainerStyles } from '../../styled.ts';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { Fragment, useContext } from 'react';
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

  const onCloseClick = () => {
    onClose();
  };

  return (
    <Modal open={isModalOpen} onClose={onClose} style={modalContainerStyles}>
      <LocalComponents.Container>
        <LocalComponents.CloseIconWrapper onClick={onCloseClick}>
          <CloseIcon fontSize={'large'} />
        </LocalComponents.CloseIconWrapper>
        <LocalComponents.Key>Definitions (scroll for more)</LocalComponents.Key>
        <LocalComponents.Separator />
        {aromanianDictionary?.[reformattedText]?.definitions?.map((definition, index) => {
          const regex = new RegExp('{(\\w{2}):\\s*\\*?(.+?})', 'g');
          const parsedDefinition = definition?.replace(regex, '');
          return (
            <Fragment key={definition}>
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
                    .map((other, index) => {
                      return (
                        <LocalComponents.Key key={index + other}>
                          {index + 1}. {other}
                        </LocalComponents.Key>
                      );
                    })}
                </>
              )}
            </Fragment>
          );
        })}
        <LocalComponents.Separator />
        {aromanianDictionary?.[reformattedText]?.translations && (
          <>
            <LocalComponents.Key>Translations</LocalComponents.Key>
            <LocalComponents.Separator />
            {Object.keys(aromanianDictionary?.[reformattedText]?.translations)?.map((translationIndex) => {
              return (
                <Fragment key={translationIndex}>
                  <LocalComponents.Key>{translationIndex.toUpperCase()}</LocalComponents.Key>
                  {aromanianDictionary?.[reformattedText]?.translations[translationIndex]?.map((translation) => {
                    const parsedTranslation = translation.substring(1, translation.length - 1);
                    return (
                      <LocalComponents.Key key={translationIndex + translation}>
                        {' '}
                        - {parsedTranslation}
                      </LocalComponents.Key>
                    );
                  })}
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
