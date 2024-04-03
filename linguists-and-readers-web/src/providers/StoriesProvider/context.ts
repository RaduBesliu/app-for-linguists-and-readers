import { createContext, Dispatch, SetStateAction } from 'react';
import { Story, StoryList } from '../../api/story/types.ts';

interface StoriesContextProps {
  story?: Story;
  secondStory?: Story;
  storyList?: StoryList;

  setStory: Dispatch<SetStateAction<undefined | Story>>;
  setSecondStory: Dispatch<SetStateAction<undefined | Story>>;
  setStoryList: Dispatch<SetStateAction<undefined | StoryList>>;
}

export const StoriesContext = createContext<StoriesContextProps>({
  story: undefined,
  secondStory: undefined,
  storyList: undefined,
  setStory: () => {},
  setSecondStory: () => {},
  setStoryList: () => {},
});
