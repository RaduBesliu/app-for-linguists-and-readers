import { StoryList, StoryMetadata } from './types.ts';

export const parseStoryLists = (storyLists: [StoryMetadata[]]): StoryList => {
  const storyList: StoryList = {};
  storyLists.forEach((storyMetadata) => {
    storyList[storyMetadata[0].language] = storyMetadata;
  });

  return storyList;
};
