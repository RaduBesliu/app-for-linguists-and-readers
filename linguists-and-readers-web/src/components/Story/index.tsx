import { LocalComponents } from './styled';
import ConstituentDetailsPopup from '../../pages/StoriesPage/components/ConstituentDetailsPopup';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { COLORS } from '../../utils/colors.ts';
import Sentence from '../Sentence';
import { Dispatch, Fragment, SetStateAction, useContext, useRef, useState } from 'react';
import { ConstituentJson } from '../../api/constituent/types.ts';
import { StoriesContext } from '../../providers/StoriesProvider/context.ts';
import { AuthContext } from '../../providers/AuthProvider/context.ts';
import StoryInfoModal from '../modals/StoryInfoModal';

const Story = ({
  spacedSentences = false,
  storyNumber = 'first',
  idsFromFirstStorySelected,
  setIdsFromFirstStorySelected,
  idsFromSecondStorySelected,
  setIdsFromSecondStorySelected,
}: {
  spacedSentences?: boolean;
  storyNumber?: 'first' | 'second';
  idsFromFirstStorySelected?: number;
  idsFromSecondStorySelected?: number;
  setIdsFromFirstStorySelected?: Dispatch<SetStateAction<number>>;
  setIdsFromSecondStorySelected?: Dispatch<SetStateAction<number>>;
}) => {
  const { isLinguist } = useContext(AuthContext);
  const { story, secondStory } = useContext(StoriesContext);

  const [isStoryInfoModalOpen, setIsStoryInfoModalOpen] = useState<boolean>(false);
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);

  const selectedConstituentRef = useRef<undefined | ConstituentJson>();

  const localStory = storyNumber === 'first' ? story : secondStory;

  const onInfoClick = () => {
    setIsStoryInfoModalOpen(true);
  };

  const onStoryInfoModalClose = () => {
    setIsStoryInfoModalOpen(false);
  };

  return (
    <LocalComponents.Container>
      {localStory && (
        <LocalComponents.StoryContainer>
          <ConstituentDetailsPopup
            anchor={anchor}
            setAnchor={setAnchor}
            selectedConstituentRef={selectedConstituentRef}
          />
          <LocalComponents.TitleWrapper>
            <LocalComponents.Title>{localStory.title}</LocalComponents.Title>
            {isLinguist && (
              <LocalComponents.InfoIconWrapper onClick={onInfoClick}>
                <InfoOutlinedIcon fontSize={'large'} htmlColor={COLORS.primary} />
              </LocalComponents.InfoIconWrapper>
            )}
          </LocalComponents.TitleWrapper>
          {localStory.sentences?.map((sentence) => {
            return (
              <Fragment key={sentence.id}>
                <Sentence
                  sentence={sentence}
                  anchor={anchor}
                  setAnchor={setAnchor}
                  selectedConstituentRef={selectedConstituentRef}
                  storyNumber={storyNumber}
                  idsFromFirstStorySelected={idsFromFirstStorySelected}
                  setIdsFromFirstStorySelected={setIdsFromFirstStorySelected}
                  idsFromSecondStorySelected={idsFromSecondStorySelected}
                  setIdsFromSecondStorySelected={setIdsFromSecondStorySelected}
                />
                {spacedSentences && <br />}
              </Fragment>
            );
          })}
        </LocalComponents.StoryContainer>
      )}
      {localStory && (
        <StoryInfoModal
          isModalOpen={isStoryInfoModalOpen}
          onClose={onStoryInfoModalClose}
          storyNumber={storyNumber ?? 'first'}
        />
      )}
    </LocalComponents.Container>
  );
};

export default Story;
