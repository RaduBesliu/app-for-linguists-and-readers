import { LocalComponents } from './styled.ts';
import { Dispatch, Fragment, MutableRefObject, SetStateAction, useContext } from 'react';
import Constituent from '../Constituent';
import { SentenceJson } from '../../api/sentence/types.ts';
import { ConstituentJson } from '../../api/constituent/types.ts';
import { AuthContext } from '../../providers/AuthProvider/context.ts';
import { AlignmentsContext } from '../../providers/AlignmentsProvider/context.ts';
import { generateRandomId } from '../../utils';

const Sentence = ({
  sentence,
  anchor,
  setAnchor,
  selectedConstituentRef,
  storyNumber = 'first',
  idsFromFirstStorySelected,
  idsFromSecondStorySelected,
  setIdsFromFirstStorySelected,
  setIdsFromSecondStorySelected,
}: {
  sentence: SentenceJson;
  anchor: HTMLElement | null;
  setAnchor: Dispatch<SetStateAction<HTMLElement | null>>;
  selectedConstituentRef: MutableRefObject<undefined | ConstituentJson>;
  storyNumber: 'first' | 'second';
  idsFromFirstStorySelected?: number;
  idsFromSecondStorySelected?: number;
  setIdsFromFirstStorySelected?: Dispatch<SetStateAction<number>>;
  setIdsFromSecondStorySelected?: Dispatch<SetStateAction<number>>;
}) => {
  const { isLinguist } = useContext(AuthContext);
  const {
    selectedMode,
    localAlignment,
    setLocalAlignment,
    colorMappingObject,
    selectedAlignmentId,
    setSelectedAlignmentId,
  } = useContext(AlignmentsContext);

  const toggleSelectedIdsStatus = (increase: boolean) => {
    if (storyNumber === 'first' && idsFromFirstStorySelected !== undefined) {
      setIdsFromFirstStorySelected?.((prev) => (increase ? prev + 1 : prev - 1));

      return;
    }

    if (idsFromSecondStorySelected !== undefined) {
      setIdsFromSecondStorySelected?.((prev) => (increase ? prev + 1 : prev - 1));
    }
  };

  const onSentenceClick = () => {
    const sentenceId = sentence.id;

    if (selectedMode[0] !== 'sentences') {
      return;
    }

    if (sentenceId in colorMappingObject) {
      setSelectedAlignmentId?.((prev) =>
        prev === colorMappingObject[sentenceId]?.[0] ? undefined : colorMappingObject[sentenceId]?.[0],
      );
      return;
    }

    if (storyNumber === 'first') {
      if (localAlignment?.leftSentenceIds?.includes(sentenceId)) {
        setLocalAlignment?.((prev) => {
          const leftSentenceIds = prev?.leftSentenceIds?.filter((id) => id !== sentenceId);

          if (prev) {
            return { ...prev, leftSentenceIds };
          }

          return { id: generateRandomId({}), leftSentenceIds };
        });
        toggleSelectedIdsStatus(false);
        return;
      }

      setLocalAlignment?.((prev) => {
        const leftSentenceIds = prev?.leftSentenceIds ? [...prev.leftSentenceIds, sentenceId] : [sentenceId];

        if (prev) {
          return { ...prev, leftSentenceIds };
        }

        return { id: generateRandomId({}), leftSentenceIds };
      });
      toggleSelectedIdsStatus(true);
      return;
    }

    if (localAlignment?.rightSentenceIds?.includes(sentenceId)) {
      setLocalAlignment?.((prev) => {
        const rightSentenceIds = prev?.rightSentenceIds?.filter((id) => id !== sentenceId);

        if (prev) {
          return { ...prev, rightSentenceIds };
        }

        return { id: generateRandomId({}), rightSentenceIds };
      });
      toggleSelectedIdsStatus(false);
      return;
    }

    setLocalAlignment?.((prev) => {
      const rightSentenceIds = prev?.rightSentenceIds ? [...prev.rightSentenceIds, sentenceId] : [sentenceId];

      if (prev) {
        return { ...prev, rightSentenceIds };
      }

      return { id: generateRandomId({}), rightSentenceIds };
    });
    toggleSelectedIdsStatus(true);
  };

  return (
    <LocalComponents.Container
      onClick={onSentenceClick}
      $canBeHighlighted={isLinguist}
      $selectedMode={selectedMode[0]}
      $storyNumber={storyNumber}
      $backgroundColor={
        selectedMode[0] === 'sentences' &&
        sentence.id in colorMappingObject &&
        (!selectedAlignmentId || selectedAlignmentId === colorMappingObject[sentence.id]?.[0])
          ? colorMappingObject[sentence.id]?.[1]
          : ''
      }
      $isSelected={Boolean(
        (storyNumber === 'first' && localAlignment?.leftSentenceIds?.includes(sentence.id)) ||
          (storyNumber === 'second' && localAlignment?.rightSentenceIds?.includes(sentence.id)) ||
          (sentence.id in colorMappingObject &&
            (!selectedAlignmentId || selectedAlignmentId === colorMappingObject[sentence.id]?.[0]) &&
            selectedMode[0] === 'sentences'),
      )}>
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
              toggleSelectedIdsStatus={toggleSelectedIdsStatus}
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
