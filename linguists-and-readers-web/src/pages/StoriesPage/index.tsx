import { useContext, useEffect, useState } from 'react';
import { getStory, getStoryList } from '../../api/story';
import { StoryJson, StoryList, StoryMetadata } from '../../api/story/types.ts';
import { LocalComponents } from './styled.ts';
import Sentence from '../../components/Sentence';
import Button from '../../components/Button';
import ContentListModal from '../../components/modals/ContentListModal';
import { AuthContext } from '../../providers/AuthProvider/context.ts';
import { toggleStoryRead } from '../../api/profile';
import { AlertContext } from '../../providers/AlertProvider/context.ts';
import { MESSAGES } from '../../utils/defines.ts';

const StoriesPage = () => {
  const { currentProfile, setCurrentProfile } = useContext(AuthContext);
  const { showAlert } = useContext(AlertContext);

  const [story, setStory] = useState<StoryJson | undefined>();
  const [storyList, setStoryList] = useState<StoryList | undefined>();
  const [isContentListModalOpen, setIsContentListModalOpen] = useState<boolean>(false);

  useEffect(() => {
    getStoryList().then((_storyLists) => {
      setStoryList(_storyLists);
    });
  }, []);

  const onStoryClick = async (storyId: string, storyMetadata: StoryMetadata) => {
    if (storyId === story?.id) {
      return;
    }

    const _story = await getStory(storyId, storyMetadata);
    setStory(_story);

    setIsContentListModalOpen(false);
  };

  const onContentListButtonClick = () => {
    setIsContentListModalOpen(true);
  };

  const onModalClose = () => {
    setIsContentListModalOpen(false);
  };

  const onToggleStoryReadClick = async () => {
    if (!currentProfile || !story || !currentProfile?.email) {
      showAlert('error', MESSAGES.errorMarkStoryAsRead);
      return;
    }

    const isStoryRead = currentProfile?.readStories?.includes(story.id);

    const updatedProfile = {
      ...currentProfile,
      readStories: isStoryRead
        ? currentProfile?.readStories?.filter((id) => id !== story.id)
        : [...(currentProfile?.readStories ?? []), story.id],
    };

    setCurrentProfile(updatedProfile);

    const result = await toggleStoryRead(currentProfile.email, story.id);

    if (result) {
      showAlert('success', isStoryRead ? MESSAGES.successMarkStoryAsUnread : MESSAGES.successMarkStoryAsRead);
      return;
    }

    showAlert('error', isStoryRead ? MESSAGES.errorMarkStoryAsUnread : MESSAGES.errorMarkStoryAsRead);
  };

  return (
    <LocalComponents.Container>
      <LocalComponents.ButtonsContainer>
        <Button label={'Open Content List'} onClick={onContentListButtonClick} />
        {story && (
          <Button
            label={currentProfile?.readStories?.includes(story.id) ? 'Mark as unread' : 'Mars as read'}
            type={currentProfile?.readStories?.includes(story.id) ? 'danger' : 'success'}
            onClick={onToggleStoryReadClick}
          />
        )}
      </LocalComponents.ButtonsContainer>
      <LocalComponents.StoryContainer>
        <LocalComponents.Title>{story?.title}</LocalComponents.Title>
        {story?.sentences?.map((sentence) => {
          return <Sentence key={sentence.id} sentence={sentence} />;
        })}
      </LocalComponents.StoryContainer>
      {storyList && (
        <ContentListModal
          isModalOpen={isContentListModalOpen}
          onClose={onModalClose}
          storyList={storyList}
          onStoryClick={onStoryClick}
          currentStoryId={story?.id}
        />
      )}
    </LocalComponents.Container>
  );
};

export default StoriesPage;
