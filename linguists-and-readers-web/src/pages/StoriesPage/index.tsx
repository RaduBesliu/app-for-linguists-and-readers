import { Fragment, useEffect, useState } from 'react';
import { getStory } from '../../api/story';
import { StoryJson } from '../../api/story/types.ts';
import { LocalComponents } from './styled.ts';
import Constituent from '../../components/Constituent';

const StoriesPage = () => {
  const [story, setStory] = useState<StoryJson | undefined>();

  useEffect(() => {
    const startTime = new Date().getTime();
    getStory('49DPkcjX3Ax97DbaT1yZ').then((fetchedStory) => {
      console.log('Time taken:', new Date().getTime() - startTime);
      setStory(fetchedStory);
    });
  }, []);

  return (
    <LocalComponents.Container>
      <LocalComponents.StoryContainer>
        <LocalComponents.Title>{story?.title}</LocalComponents.Title>
        {story?.sentences?.map((sentence) => {
          return (
            <Fragment key={sentence.id}>
              {sentence.constituents?.map((constituent, constituentIndex) => {
                return (
                  <Fragment key={constituent.id}>
                    {(constituent.text === '-' || constituent.text === '„') && ' '}
                    <Constituent constituent={constituent} />
                    {(constituent.text === '-' ||
                      (constituentIndex < (sentence?.constituents?.length ?? 1) - 1 &&
                        sentence?.constituents?.[constituentIndex + 1]?.partOfSpeech !== 'PUNCT' &&
                        constituent.text[constituent.text.length - 1] !== '-' &&
                        sentence?.constituents?.[constituentIndex + 1]?.text[0] !== '-' &&
                        constituent.text !== '„')) &&
                      ' '}
                  </Fragment>
                );
              })}
              <br />
            </Fragment>
          );
        })}
      </LocalComponents.StoryContainer>
    </LocalComponents.Container>
  );
};

export default StoriesPage;
