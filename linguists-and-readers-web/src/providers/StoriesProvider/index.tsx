import { ReactNode, useMemo, useState } from 'react';
import { StoryJson, StoryList } from '../../api/story/types.ts';
import { StoriesContext } from './context.ts';

export const StoriesProvider = ({ children }: { children: ReactNode }) => {
  const [story, setStory] = useState<undefined | StoryJson>();
  const [secondStory, setSecondStory] = useState<undefined | StoryJson>();
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
