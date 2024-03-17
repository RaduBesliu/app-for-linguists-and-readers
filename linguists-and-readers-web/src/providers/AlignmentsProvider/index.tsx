import { ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { Alignments } from '../../api/alignment/types.ts';
import { AlignmentsContext } from './context.ts';
import { StoriesContext } from '../StoriesProvider/context.ts';
import { AuthContext } from '../AuthProvider/context.ts';

const AlignmentsProvider = ({ children }: { children: ReactNode }) => {
  const { currentProfile } = useContext(AuthContext);
  const { story, secondStory } = useContext(StoriesContext);

  const [allUserAlignments, setAllUserAlignments] = useState<Alignments[]>([]);
  const [currentStoriesAlignment, setCurrentStoriesAlignment] = useState<Alignments | undefined>();
  const [localAlignmentIds, setLocalAlignmentIds] = useState<string[]>([]);

  const [selectedMode, setSelectedMode] = useState<('constituents' | 'sentences' | 'read')[]>(['read']);
  const [spacedSentences, setSpacedSentences] = useState<boolean>(false);

  useEffect(() => {
    setAllUserAlignments(currentProfile?.personalAlignments ?? []);
  }, [currentProfile]);

  useEffect(() => {
    if (!story || !secondStory) {
      return;
    }

    const storyAlignment = allUserAlignments.find(
      (alignment) => alignment.leftStoryId === story.id && alignment.rightStoryId === secondStory.id,
    );

    setCurrentStoriesAlignment(storyAlignment);
  }, [story, secondStory, allUserAlignments]);

  useEffect(() => {
    setLocalAlignmentIds([]);
  }, [currentProfile, story, secondStory]);

  const value = useMemo(
    () => ({
      allUserAlignments,
      currentStoriesAlignment,
      localAlignmentIds,
      selectedMode,
      spacedSentences,
      setAllUserAlignments,
      setCurrentStoriesAlignment,
      setLocalAlignmentIds,
      setSelectedMode,
      setSpacedSentences,
    }),
    [allUserAlignments, currentStoriesAlignment, localAlignmentIds, selectedMode, spacedSentences],
  );

  return <AlignmentsContext.Provider value={value}>{children}</AlignmentsContext.Provider>;
};

export default AlignmentsProvider;
