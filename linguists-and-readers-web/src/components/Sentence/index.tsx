import { LocalComponents } from './styled.ts';
import { Dispatch, Fragment, MutableRefObject, SetStateAction, useContext } from 'react';
import Constituent from '../Constituent';
import { SentenceJson } from '../../api/sentence/types.ts';
import { ConstituentJson } from '../../api/constituent/types.ts';
import { AuthContext } from '../../providers/AuthProvider/context.ts';
import { AlignmentsContext } from '../../providers/AlignmentsProvider/context.ts';

const Sentence = ({
  sentence,
  anchor,
  setAnchor,
  selectedConstituentRef,
  storyNumber = 'first',
}: {
  sentence: SentenceJson;
  anchor: HTMLElement | null;
  setAnchor: Dispatch<SetStateAction<HTMLElement | null>>;
  selectedConstituentRef: MutableRefObject<undefined | ConstituentJson>;
  storyNumber: 'first' | 'second';
}) => {
  const { isLinguist } = useContext(AuthContext);
  const { selectedMode } = useContext(AlignmentsContext);

  return (
    <LocalComponents.Container
      $canBeHighlighted={isLinguist}
      $selectedMode={selectedMode[0]}
      $storyNumber={storyNumber}>
      {sentence?.constituents?.map((constituent, constituentIndex) => {
        return (
          <Fragment key={constituent.id}>
            {(constituent.text === '-' || constituent.text === '„') && ' '}
            <Constituent
              constituent={constituent}
              anchor={anchor}
              setAnchor={setAnchor}
              selectedConstituentRef={selectedConstituentRef}
              storyNumber={storyNumber}
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
