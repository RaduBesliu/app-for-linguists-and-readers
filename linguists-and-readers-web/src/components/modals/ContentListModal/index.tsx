import { AccordionDetails, Modal } from '@mui/material';
import { LocalComponents } from './styled.ts';
import { StoryMetadata } from '../../../api/story/types.ts';
import { modalContainerStyles } from '../../styled.ts';
import { Accordion, AccordionSummary } from '@mui/material';
import { useContext } from 'react';
import { AuthContext } from '../../../providers/AuthProvider/context.ts';
import DoneIcon from '@mui/icons-material/Done';
import { COLORS } from '../../../utils/colors.ts';
import CloseIcon from '@mui/icons-material/Close';
import { StoriesContext } from '../../../providers/StoriesProvider/context.ts';

const ContentListModal = ({
  isModalOpen,
  onClose,
  onStoryClick,
  currentStoryId,
}: {
  isModalOpen: boolean;
  onClose: () => void;
  onStoryClick: (storyId: string, storyMetadata: StoryMetadata) => Promise<void>;
  currentStoryId?: string;
}) => {
  const { currentProfile } = useContext(AuthContext);
  const { storyList } = useContext(StoriesContext);

  const onCloseClick = () => {
    onClose();
  };

  return (
    <Modal open={isModalOpen} onClose={onClose} style={modalContainerStyles}>
      <LocalComponents.ContentListModalContainer>
        <LocalComponents.CloseIconWrapper onClick={onCloseClick}>
          <CloseIcon fontSize={'large'} />
        </LocalComponents.CloseIconWrapper>
        {storyList &&
          Object.keys(storyList).map((language) => {
            return (
              <LocalComponents.ContentLanguageGroupContainer key={language}>
                <Accordion>
                  <AccordionSummary>
                    <LocalComponents.ContentListTitle>{language}</LocalComponents.ContentListTitle>
                  </AccordionSummary>
                  <AccordionDetails>
                    <LocalComponents.ContentListStoryContainer>
                      {storyList?.[language].map((storyMetadata: StoryMetadata) => {
                        return (
                          <LocalComponents.ContentListStoryTitleWrapper key={storyMetadata.id}>
                            <LocalComponents.ContentListStoryTitle
                              onClick={() => onStoryClick(storyMetadata.id, storyMetadata)}
                              $isSelected={storyMetadata.id === currentStoryId}>
                              {storyMetadata.title}
                            </LocalComponents.ContentListStoryTitle>
                            {currentProfile?.readStories?.includes(storyMetadata.id) && (
                              <LocalComponents.CheckmarkIconWrapper>
                                <DoneIcon fontSize={'inherit'} htmlColor={COLORS.success} />
                              </LocalComponents.CheckmarkIconWrapper>
                            )}
                          </LocalComponents.ContentListStoryTitleWrapper>
                        );
                      })}
                    </LocalComponents.ContentListStoryContainer>
                  </AccordionDetails>
                </Accordion>
              </LocalComponents.ContentLanguageGroupContainer>
            );
          })}
      </LocalComponents.ContentListModalContainer>
    </Modal>
  );
};

export default ContentListModal;
