import { createContext, Dispatch, SetStateAction } from 'react';
import { StoryJson, StoryList } from '../../api/story/types.ts';

interface StoriesContextProps {
  story?: StoryJson;
  secondStory?: StoryJson;
  storyList?: StoryList;

  setStory: Dispatch<SetStateAction<undefined | StoryJson>>;
  setSecondStory: Dispatch<SetStateAction<undefined | StoryJson>>;
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
