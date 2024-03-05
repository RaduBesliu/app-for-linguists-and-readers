import { AccordionDetails, Modal } from '@mui/material';
import { LocalComponents } from './styled.ts';
import { StoryList, StoryMetadata } from '../../../api/story/types.ts';
import { modalContainerStyles } from '../../styled.ts';
import { Accordion, AccordionSummary } from '@mui/material';
import { useContext } from 'react';
import { AuthContext } from '../../../providers/AuthProvider/context.ts';
import DoneIcon from '@mui/icons-material/Done';
import { COLORS } from '../../../utils/colors.ts';

const ContentListModal = ({
  isModalOpen,
  onClose,
  storyList,
  onStoryClick,
  currentStoryId,
}: {
  isModalOpen: boolean;
  onClose: () => void;
  storyList: StoryList;
  onStoryClick: (storyId: string, storyMetadata: StoryMetadata) => Promise<void>;
  currentStoryId?: string;
}) => {
  const { currentProfile } = useContext(AuthContext);

  return (
    <Modal open={isModalOpen} onClose={onClose} style={modalContainerStyles}>
      <LocalComponents.ContentListModalContainer>
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
