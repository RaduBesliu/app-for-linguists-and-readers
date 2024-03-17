import { LocalComponents } from './styled';
import { useContext, useEffect, useState } from 'react';
import { StoriesContext } from '../../providers/StoriesProvider/context.ts';
import { getStory, getStoryList } from '../../api/story';
import { StoryMetadata } from '../../api/story/types.ts';
import Story from '../../components/Story/index.tsx';
import { ScrollSync, ScrollSyncPane } from 'react-scroll-sync';
import Button from '../../components/Button';
import ContentListModal from '../../components/modals/ContentListModal';
import AlignmentsSettingsModal from '../../components/modals/AlignmentsSettingsModal';
import { AlignmentsContext } from '../../providers/AlignmentsProvider/context.ts';

const AlignmentsPage = () => {
  const { story, secondStory, setStory, setSecondStory, storyList, setStoryList } = useContext(StoriesContext);
  const { spacedSentences } = useContext(AlignmentsContext);

  const [isFirstStoryContentListModalOpen, setIsFirstStoryContentListModalOpen] = useState<boolean>(false);
  const [isSecondStoryContentListModalOpen, setIsSecondStoryContentListModalOpen] = useState<boolean>(false);
  const [isAlignmentsSettingsModalOpen, setIsAlignmentsSettingsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (storyList) {
      return;
    }

    getStoryList().then((_storyLists) => {
      setStoryList(_storyLists);
    });
  }, [storyList, setStoryList]);

  const onStoryClick = async (storyId: string, storyMetadata: StoryMetadata, storyNumber?: 'first' | 'second') => {
    if (storyId === story?.id || storyId === secondStory?.id) {
      return;
    }

    const _story = await getStory(storyId, storyMetadata);

    if (!storyNumber) {
      setStory(_story);
      setIsFirstStoryContentListModalOpen(false);
      return;
    }

    setSecondStory(_story);
    setIsSecondStoryContentListModalOpen(false);
  };

  const onOpenFirstStoryContentListModal = () => {
    setIsFirstStoryContentListModalOpen(true);
  };

  const onOpenSecondStoryContentListModal = () => {
    setIsSecondStoryContentListModalOpen(true);
  };

  const onCloseFirstStoryContentListModal = () => {
    setIsFirstStoryContentListModalOpen(false);
  };

  const onCloseSecondStoryContentListModal = () => {
    setIsSecondStoryContentListModalOpen(false);
  };

  const onOpenAlignmentsSettingsModal = () => {
    setIsAlignmentsSettingsModalOpen(true);
  };

  const onCloseAlignmentsSettingsModal = () => {
    setIsAlignmentsSettingsModalOpen(false);
  };

  return (
    <LocalComponents.Container>
      <Button type={'black'} width={200} label={'Alignments settings'} onClick={onOpenAlignmentsSettingsModal} />
      <LocalComponents.ButtonsContainer>
        <Button label={'Select first story'} onClick={onOpenFirstStoryContentListModal} />
        <Button label={'Select second story'} onClick={onOpenSecondStoryContentListModal} />
      </LocalComponents.ButtonsContainer>
      <ScrollSync>
        <LocalComponents.StoriesContainer>
          <ScrollSyncPane>
            <LocalComponents.StoryContainer>
              <Story spacedSentences={spacedSentences} storyNumber={'first'} />
            </LocalComponents.StoryContainer>
          </ScrollSyncPane>
          <LocalComponents.Separator $isVertical={true} />
          <ScrollSyncPane>
            <LocalComponents.StoryContainer>
              <Story spacedSentences={spacedSentences} storyNumber={'second'} />
            </LocalComponents.StoryContainer>
          </ScrollSyncPane>
        </LocalComponents.StoriesContainer>
      </ScrollSync>
      <ContentListModal
        isModalOpen={isFirstStoryContentListModalOpen}
        onClose={onCloseFirstStoryContentListModal}
        onStoryClick={onStoryClick}
        currentStoryId={story?.id}
      />
      <ContentListModal
        isModalOpen={isSecondStoryContentListModalOpen}
        onClose={onCloseSecondStoryContentListModal}
        onStoryClick={onStoryClick}
        currentStoryId={secondStory?.id}
        storyNumber={'second'}
      />
      <AlignmentsSettingsModal isModalOpen={isAlignmentsSettingsModalOpen} onClose={onCloseAlignmentsSettingsModal} />
    </LocalComponents.Container>
  );
};

export default AlignmentsPage;
