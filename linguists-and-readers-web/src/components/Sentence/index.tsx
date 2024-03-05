import { LocalComponents } from './styled.ts';
import { Fragment } from 'react';
import Constituent from '../Constituent';
import { SentenceJson } from '../../api/sentence/types.ts';

const Sentence = ({ sentence }: { sentence: SentenceJson }) => {
  return (
    <LocalComponents.Container>
      {sentence?.constituents?.map((constituent, constituentIndex) => {
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
    </LocalComponents.Container>
  );
};

export default Sentence;
