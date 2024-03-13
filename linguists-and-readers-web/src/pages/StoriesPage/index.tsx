import { useContext, useEffect, useRef, useState } from 'react';
import { getStory, getStoryList } from '../../api/story';
import { StoryMetadata } from '../../api/story/types.ts';
import { LocalComponents } from './styled.ts';
import Sentence from '../../components/Sentence';
import Button from '../../components/Button';
import ContentListModal from '../../components/modals/ContentListModal';
import { AuthContext } from '../../providers/AuthProvider/context.ts';
import { toggleStoryRead } from '../../api/profile';
import { AlertContext } from '../../providers/AlertProvider/context.ts';
import { MESSAGES } from '../../utils/defines.ts';
import ConstituentDetailsPopup from './components/ConstituentDetailsPopup';
import { ConstituentJson } from '../../api/constituent/types.ts';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { COLORS } from '../../utils/colors.ts';
import StoryInfoModal from '../../components/modals/StoryInfoModal';
import { StoriesContext } from '../../providers/StoriesProvider/context.ts';

const StoriesPage = () => {
  const { currentProfile, setCurrentProfile, isLinguist } = useContext(AuthContext);
  const { showAlert } = useContext(AlertContext);
  const { story, setStory, storyList, setStoryList } = useContext(StoriesContext);

  const [isContentListModalOpen, setIsContentListModalOpen] = useState<boolean>(false);
  const [isStoryInfoModalOpen, setIsStoryInfoModalOpen] = useState<boolean>(false);

  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const selectedConstituentRef = useRef<undefined | ConstituentJson>();

  useEffect(() => {
    if (storyList) {
      return;
    }

    getStoryList().then((_storyLists) => {
      setStoryList(_storyLists);
    });
  }, [storyList, setStoryList]);

  useEffect(() => {
    if (story) {
      return;
    }

    const lastStoryId = localStorage.getItem('lastStoryId');

    if (lastStoryId) {
      getStory(lastStoryId).then((_story) => {
        console.log('[localStorage] Get lastStoryId:', lastStoryId);
        setStory(_story);
      });
    }
  }, [story, setStory]);

  // DO NOT DELETE - USEFUL FOR EXPLANATION
  // useEffect(() => {
  //   if (!story) {
  //     return;
  //   }
  //
  //   const morphArr = [];
  //   story.sentences?.forEach((sentence) => {
  //     sentence.constituents?.forEach((constituent) => {
  //       constituent.morphology &&
  //         Object.keys(constituent.morphology)?.forEach((morphKey) => {
  //           let ok = true;
  //           if (!MORPHOLOGY_DICTIONARY[morphKey]) {
  //             morphArr.push(constituent.morphology);
  //           }
  //
  //           constituent?.morphology?.[morphKey]?.forEach((val) => {
  //             if (!MORPHOLOGY_DICTIONARY[morphKey]?.[val]) {
  //               morphArr.push(constituent.morphology);
  //               ok = false;
  //               return;
  //             }
  //           });
  //
  //           if (!ok) {
  //             return;
  //           }
  //         });
  //     });
  //   });
  //
  //   console.log(morphArr);
  // }, [story]);

  const onStoryClick = async (storyId: string, storyMetadata: StoryMetadata) => {
    if (storyId === story?.id) {
      return;
    }

    const _story = await getStory(storyId, storyMetadata);
    setStory(_story);

    try {
      localStorage.setItem('lastStoryId', storyId);
      console.log('[localStorage] Set lastStoryId:', storyId);
    } catch (e) {
      console.error('[localStorage] Error setting lastStoryId:', e);
    }

    setIsContentListModalOpen(false);
  };

  const onContentListButtonClick = () => {
    setIsContentListModalOpen(true);
  };

  const onContentListModalClose = () => {
    setIsContentListModalOpen(false);
  };

  const onInfoClick = () => {
    setIsStoryInfoModalOpen(true);
  };

  const onStoryInfoModalClose = () => {
    setIsStoryInfoModalOpen(false);
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
        {storyList && <Button label={'Open Content List'} onClick={onContentListButtonClick} />}
        {story && (
          <Button
            label={currentProfile?.readStories?.includes(story.id) ? 'Mark as unread' : 'Mark as read'}
            type={currentProfile?.readStories?.includes(story.id) ? 'danger' : 'success'}
            onClick={onToggleStoryReadClick}
          />
        )}
      </LocalComponents.ButtonsContainer>
      {story && (
        <LocalComponents.StoryContainer>
          <ConstituentDetailsPopup
            anchor={anchor}
            setAnchor={setAnchor}
            selectedConstituentRef={selectedConstituentRef}
          />
          <LocalComponents.TitleWrapper>
            <LocalComponents.Title>{story.title}</LocalComponents.Title>
            {isLinguist && (
              <LocalComponents.InfoIconWrapper onClick={onInfoClick}>
                <InfoOutlinedIcon fontSize={'large'} htmlColor={COLORS.primary} />
              </LocalComponents.InfoIconWrapper>
            )}
          </LocalComponents.TitleWrapper>
          {story.sentences?.map((sentence) => {
            return (
              <Sentence
                key={sentence.id}
                sentence={sentence}
                anchor={anchor}
                setAnchor={setAnchor}
                selectedConstituentRef={selectedConstituentRef}
              />
            );
          })}
        </LocalComponents.StoryContainer>
      )}
      {storyList && (
        <ContentListModal
          isModalOpen={isContentListModalOpen}
          onClose={onContentListModalClose}
          onStoryClick={onStoryClick}
          currentStoryId={story?.id}
        />
      )}
      {story && <StoryInfoModal isModalOpen={isStoryInfoModalOpen} onClose={onStoryInfoModalClose} />}
    </LocalComponents.Container>
  );
};

export default StoriesPage;
