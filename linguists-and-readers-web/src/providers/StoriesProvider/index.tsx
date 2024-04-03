import { ReactNode, useMemo, useState } from 'react';
import { Story, StoryList } from '../../api/story/types.ts';
import { StoriesContext } from './context.ts';

export const StoriesProvider = ({ children }: { children: ReactNode }) => {
  const [story, setStory] = useState<undefined | Story>();
  const [secondStory, setSecondStory] = useState<undefined | Story>();
  const [storyList, setStoryList] = useState<undefined | StoryList>();

  const value = useMemo(
    () => ({
      story,
      secondStory,
      storyList,
      setStory,
      setSecondStory,
      setStoryList,
    }),
    [story, secondStory, storyList],
  );

  return <StoriesContext.Provider value={value}>{children}</StoriesContext.Provider>;
};

export default StoriesProvider;
