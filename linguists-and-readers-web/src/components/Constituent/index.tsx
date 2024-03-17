import { ConstituentJson } from '../../api/constituent/types.ts';
import { LocalComponents } from './styled.ts';
import { Dispatch, SetStateAction, MouseEvent, MutableRefObject, useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider/context.ts';
import { AlignmentsContext } from '../../providers/AlignmentsProvider/context.ts';

const Constituent = ({
  constituent,
  anchor,
  setAnchor,
  selectedConstituentRef,
  storyNumber = 'first',
}: {
  constituent: ConstituentJson;
  anchor: HTMLElement | null;
  setAnchor: Dispatch<SetStateAction<HTMLElement | null>>;
  selectedConstituentRef: MutableRefObject<undefined | ConstituentJson>;
  storyNumber: 'first' | 'second';
}) => {
  const { isLinguist } = useContext(AuthContext);
  const { selectedMode } = useContext(AlignmentsContext);

  const isHighlighted = Boolean(selectedConstituentRef.current?.id === constituent.id);

  const onClick = (event: MouseEvent<HTMLSpanElement>) => {
    if (!isLinguist || selectedMode[0] !== 'read') {
      return;
    }

    if (anchor === null) {
      setAnchor(event.currentTarget);
      selectedConstituentRef.current = constituent;
      return;
    }

    if (event.currentTarget !== anchor) {
      return;
    }

    setAnchor(null);
    selectedConstituentRef.current = undefined;
  };

  return (
    <LocalComponents.Span
      $canBeHighlighted={isLinguist}
      $isHighlighted={isHighlighted}
      $selectedMode={selectedMode[0]}
      $storyNumber={storyNumber}
      onClick={(event) => onClick(event)}>
      {constituent.text}
    </LocalComponents.Span>
  );
};

export default Constituent;
