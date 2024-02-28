import { useEffect } from 'react';
import { storyMock } from './story_mock.ts';
import { getStory, uploadStoryFromJson } from '../../api/story';
import { getSentences } from '../../api/sentence';
import { getConstituentsForStory } from '../../api/constituent';

const HomePage = () => {
  useEffect(() => {
    // getConstituentsForStory(storyMock.id).then((constituents) => {
    //   console.log('Constituents:', constituents);
    // });
  }, []);

  return <h1>Welcome home</h1>;
};

export default HomePage;
