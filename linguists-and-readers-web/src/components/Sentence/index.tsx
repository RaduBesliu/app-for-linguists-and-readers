import { LocalComponents } from './styled.ts';
import { Dispatch, Fragment, MutableRefObject, SetStateAction, useContext } from 'react';
import Constituent from '../Constituent';
import { SentenceJson } from '../../api/sentence/types.ts';
import { ConstituentJson } from '../../api/constituent/types.ts';
import { AuthContext } from '../../providers/AuthProvider/context.ts';

const Sentence = ({
  sentence,
  anchor,
  setAnchor,
  selectedConstituentRef,
}: {
  sentence: SentenceJson;
  anchor: HTMLElement | null;
  setAnchor: Dispatch<SetStateAction<HTMLElement | null>>;
  selectedConstituentRef: MutableRefObject<undefined | ConstituentJson>;
}) => {
  const { currentProfile } = useContext(AuthContext);

  const canBeHighlighted = Boolean(currentProfile?.role === 'linguist');

  return (
    <LocalComponents.Container $canBeHighlighted={canBeHighlighted}>
      {sentence?.constituents?.map((constituent, constituentIndex) => {
        return (
          <Fragment key={constituent.id}>
            {(constituent.text === '-' || constituent.text === '„') && ' '}
            <Constituent
              constituent={constituent}
              anchor={anchor}
              setAnchor={setAnchor}
              selectedConstituentRef={selectedConstituentRef}
            />
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
