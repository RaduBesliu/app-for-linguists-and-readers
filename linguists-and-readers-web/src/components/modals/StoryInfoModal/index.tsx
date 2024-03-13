import { Modal } from '@mui/material';
import { LocalComponents } from './styled.ts';
import { modalContainerStyles } from '../../styled.ts';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { useContext } from 'react';
import { StoriesContext } from '../../../providers/StoriesProvider/context.ts';

const StoryInfoModal = ({ isModalOpen, onClose }: { isModalOpen: boolean; onClose: () => void }) => {
  const { story } = useContext(StoriesContext);

  const sentencesNumber = story?.sentences?.length ?? 0;
  const constituentsNumber =
    story?.sentences?.reduce((counter, sentence) => counter + (sentence?.constituents?.length ?? 0), 0) ?? 1;
  const averageConstituentsNumberPerSentence = (constituentsNumber / sentencesNumber).toFixed(2);

  const onCloseClick = () => {
    onClose();
  };

  return (
    <Modal open={isModalOpen} onClose={onClose} style={modalContainerStyles}>
      <LocalComponents.Container>
        <LocalComponents.CloseIconWrapper onClick={onCloseClick}>
          <CloseIcon fontSize={'large'} />
        </LocalComponents.CloseIconWrapper>
        <LocalComponents.Label>Sentences number: {sentencesNumber}</LocalComponents.Label>
        <LocalComponents.Label>Constituents number: {constituentsNumber}</LocalComponents.Label>
        <LocalComponents.Label>
          Average constituents number per sentence: {averageConstituentsNumberPerSentence}
        </LocalComponents.Label>
        <LocalComponents.DangerTextWrapper>
          <WarningAmberOutlinedIcon fontSize={'inherit'} />
          Warning! Constituent data is automatically generated and may not be 100% accurate.
        </LocalComponents.DangerTextWrapper>
      </LocalComponents.Container>
    </Modal>
  );
};

export default StoryInfoModal;
