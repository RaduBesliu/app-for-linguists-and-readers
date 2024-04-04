// @ts-nocheck
import { Modal } from '@mui/material';
import { LocalComponents } from './styled.ts';
import { modalContainerStyles } from '../../styled.ts';
import CloseIcon from '@mui/icons-material/Close';
import { useContext } from 'react';
import CheckBox from '../../CheckBox';
import Picker from '../../Picker';
import { ALIGNMENTS_OPTIONS } from '../../../utils/defines.ts';
import { AlignmentsContext } from '../../../providers/AlignmentsProvider/context.ts';

const AlignmentsSettingsModal = ({ isModalOpen, onClose }: { isModalOpen: boolean; onClose: () => void }) => {
  const { selectedMode, spacedSentences, scrollSync, setSelectedMode, setSpacedSentences, setScrollSync } =
    useContext(AlignmentsContext);

  const onCloseClick = () => {
    onClose();
  };

  return (
    <Modal open={isModalOpen} onClose={onClose} style={modalContainerStyles}>
      <LocalComponents.Container>
        <LocalComponents.CloseIconWrapper onClick={onCloseClick}>
          <CloseIcon fontSize={'large'} />
        </LocalComponents.CloseIconWrapper>
        <LocalComponents.SectionWrapper>
          <LocalComponents.Title>Select alignments mode</LocalComponents.Title>
          <Picker
            values={ALIGNMENTS_OPTIONS}
            activeValues={selectedMode}
            setActiveValues={setSelectedMode}
            wrap={true}
          />
        </LocalComponents.SectionWrapper>
        <LocalComponents.SectionWrapper>
          <LocalComponents.Title>Additional settings</LocalComponents.Title>
          <CheckBox value={spacedSentences} setValue={setSpacedSentences} label={'Spaced sentences'} />
          <CheckBox value={scrollSync} setValue={setScrollSync} label={'Scroll sync'} />
        </LocalComponents.SectionWrapper>
      </LocalComponents.Container>
    </Modal>
  );
};

export default AlignmentsSettingsModal;
