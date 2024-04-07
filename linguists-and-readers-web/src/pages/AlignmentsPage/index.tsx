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
  const [isAlignmentsSettingsModalOpen, setIsAlignmentsSettingsModalOpen] = useState<boolean>(false);

  const [idsFromFirstStorySelected, setIdsFromFirstStorySelected] = useState<number>(0);
  const [idsFromSecondStorySelected, setIdsFromSecondStorySelected] = useState<number>(0);
  const [areIdsSelectedFromBothStories, setAreIdsSelectedFromBothStories] = useState<boolean>(false);

  useEffect(() => {
    if (!story) {
      return;
    }

    const _storyIndexInList = storyList?.[story?.language ?? 'romanian']?.findIndex(
      (_story) => story?.id === _story.id,
    );

    if (_storyIndexInList !== undefined && _storyIndexInList !== -1) {
      getStory(
        storyList?.[story?.language === 'romanian' ? 'aromanian' : 'romanian'][_storyIndexInList]?.id ?? '',
        storyList?.[story?.language === 'romanian' ? 'aromanian' : 'romanian'][_storyIndexInList],
      ).then((_secondStory) => {
        setSecondStory(_secondStory);
      });
    }
  }, []);

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

  const onStoryClick = async (storyId: string, storyMetadata: StoryMetadata) => {
    if (storyId === story?.id || storyId === secondStory?.id) {
      return;
    }

    const _story = await getStory(storyId, storyMetadata);

    setStory(_story);
    setIsFirstStoryContentListModalOpen(false);

    const _storyIndexInList = storyList?.[storyMetadata?.language ?? 'romanian']?.findIndex(
      (story) => story.id === storyId,
    );

    if (_storyIndexInList !== undefined && _storyIndexInList !== -1) {
      const _secondStory = await getStory(
        storyList?.[storyMetadata?.language === 'romanian' ? 'aromanian' : 'romanian'][_storyIndexInList]?.id ?? '',
        storyList?.[storyMetadata?.language === 'romanian' ? 'aromanian' : 'romanian'][_storyIndexInList],
      );

      setSecondStory(_secondStory);
    }
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

  const onCloseFirstStoryContentListModal = () => {
    setIsFirstStoryContentListModalOpen(false);
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
        <Button label={'Select a story'} onClick={onOpenFirstStoryContentListModal} />
      </LocalComponents.ButtonsContainer>
      <ScrollSync enabled={scrollSync}>
        <LocalComponents.StoriesContainer>
          <ScrollSyncPane>
            <LocalComponents.StoryContainer>
              <Story
                spacedSentences={spacedSentences}
                storyNumber={'first'}
                idsFromFirstStorySelected={idsFromFirstStorySelected}
                setIdsFromFirstStorySelected={setIdsFromFirstStorySelected}
                idsFromSecondStorySelected={idsFromSecondStorySelected}
                setIdsFromSecondStorySelected={setIdsFromSecondStorySelected}
              />
            </LocalComponents.StoryContainer>
          </ScrollSyncPane>
          <LocalComponents.Separator $isVertical={true} />
          <ScrollSyncPane>
            <LocalComponents.StoryContainer>
              <Story
                spacedSentences={spacedSentences}
                storyNumber={'second'}
                idsFromFirstStorySelected={idsFromFirstStorySelected}
                setIdsFromFirstStorySelected={setIdsFromFirstStorySelected}
                idsFromSecondStorySelected={idsFromSecondStorySelected}
                setIdsFromSecondStorySelected={setIdsFromSecondStorySelected}
              />
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
      <AlignmentsSettingsModal isModalOpen={isAlignmentsSettingsModalOpen} onClose={onCloseAlignmentsSettingsModal} />
    </LocalComponents.Container>
  );
};

export default AlignmentsPage;
