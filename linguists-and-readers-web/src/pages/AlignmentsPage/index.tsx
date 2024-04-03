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
import { LoaderContext } from '../../providers/LoaderProvider/context.ts';
import { CircularProgress } from '@mui/material';

const AlignmentsPage = () => {
  const { isLoading } = useContext(LoaderContext);
  const { story, secondStory, setStory, setSecondStory, storyList, setStoryList } = useContext(StoriesContext);
  const {
    spacedSentences,
    scrollSync,
    localAlignment,
    setLocalAlignment,
    saveLocalAlignment,
    selectedAlignmentId,
    deleteAlignment,
  } = useContext(AlignmentsContext);

  const [isFirstStoryContentListModalOpen, setIsFirstStoryContentListModalOpen] = useState<boolean>(false);
  const [isSecondStoryContentListModalOpen, setIsSecondStoryContentListModalOpen] = useState<boolean>(false);
  const [isAlignmentsSettingsModalOpen, setIsAlignmentsSettingsModalOpen] = useState<boolean>(false);

  const [idsFromFirstStorySelected, setIdsFromFirstStorySelected] = useState<number>(0);
  const [idsFromSecondStorySelected, setIdsFromSecondStorySelected] = useState<number>(0);
  const [areIdsSelectedFromBothStories, setAreIdsSelectedFromBothStories] = useState<boolean>(false);

  useEffect(() => {
    if (idsFromFirstStorySelected && idsFromSecondStorySelected) {
      setAreIdsSelectedFromBothStories(true);
      return;
    }

    setAreIdsSelectedFromBothStories(false);
  }, [idsFromFirstStorySelected, idsFromSecondStorySelected]);

  useEffect(() => {
    if (storyList) {
      return;
    }

    getStoryList().then((_storyLists) => {
      setStoryList(_storyLists);
    });
  }, [storyList, setStoryList]);

  useEffect(() => {
    if (!localAlignment) {
      setIdsFromFirstStorySelected(0);
      setIdsFromSecondStorySelected(0);
    }
  }, [localAlignment]);

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

  const onResetAlignments = () => {
    setLocalAlignment(undefined);
  };

  const onSaveAlignments = () => {
    if (localAlignment && story && secondStory) {
      saveLocalAlignment(story.id, secondStory.id, localAlignment);
    }
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

  const onDeleteAlignment = async () => {
    if (selectedAlignmentId) {
      await deleteAlignment(selectedAlignmentId);
    }
  };

  return (
    <LocalComponents.Container>
      <LocalComponents.TopButtonsContainer>
        <LocalComponents.TwoButtonsContainer>
          <Button type={'danger'} label={'Reset alignments'} onClick={onResetAlignments} isDisabled={!localAlignment} />
          <Button
            type={'danger'}
            label={'Delete alignment'}
            onClick={onDeleteAlignment}
            isDisabled={!selectedAlignmentId}
          />
        </LocalComponents.TwoButtonsContainer>
        <LocalComponents.TwoButtonsContainer>
          <Button
            type={'success'}
            label={'Save alignments'}
            onClick={onSaveAlignments}
            isDisabled={!areIdsSelectedFromBothStories}
          />
          <Button type={'black'} label={'Alignments settings'} onClick={onOpenAlignmentsSettingsModal} />
        </LocalComponents.TwoButtonsContainer>
      </LocalComponents.TopButtonsContainer>
      <LocalComponents.ButtonsContainer>
        <Button label={'Select first story'} onClick={onOpenFirstStoryContentListModal} />
        <Button label={'Select second story'} onClick={onOpenSecondStoryContentListModal} />
      </LocalComponents.ButtonsContainer>
      <ScrollSync enabled={scrollSync}>
        <LocalComponents.StoriesContainer>
          <ScrollSyncPane>
            <LocalComponents.StoryContainer>
              {isLoading ? (
                <CircularProgress />
              ) : (
                <Story
                  spacedSentences={spacedSentences}
                  storyNumber={'first'}
                  idsFromFirstStorySelected={idsFromFirstStorySelected}
                  setIdsFromFirstStorySelected={setIdsFromFirstStorySelected}
                  idsFromSecondStorySelected={idsFromSecondStorySelected}
                  setIdsFromSecondStorySelected={setIdsFromSecondStorySelected}
                />
              )}
            </LocalComponents.StoryContainer>
          </ScrollSyncPane>
          <LocalComponents.Separator $isVertical={true} />
          <ScrollSyncPane>
            <LocalComponents.StoryContainer>
              {isLoading ? (
                <CircularProgress />
              ) : (
                <Story
                  spacedSentences={spacedSentences}
                  storyNumber={'second'}
                  idsFromFirstStorySelected={idsFromFirstStorySelected}
                  setIdsFromFirstStorySelected={setIdsFromFirstStorySelected}
                  idsFromSecondStorySelected={idsFromSecondStorySelected}
                  setIdsFromSecondStorySelected={setIdsFromSecondStorySelected}
                />
              )}
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
