import { ConstituentJson } from '../../api/constituent/types.ts';
import { LocalComponents } from './styled.ts';
import { Dispatch, SetStateAction, MouseEvent, MutableRefObject, useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider/context.ts';

const Constituent = ({
  constituent,
  anchor,
  setAnchor,
  selectedConstituentRef,
}: {
  constituent: ConstituentJson;
  anchor: HTMLElement | null;
  setAnchor: Dispatch<SetStateAction<HTMLElement | null>>;
  selectedConstituentRef: MutableRefObject<undefined | ConstituentJson>;
}) => {
  const { currentProfile } = useContext(AuthContext);

  const canBeHighlighted = Boolean(currentProfile?.role === 'linguist');
  const isHighlighted = Boolean(selectedConstituentRef.current?.id === constituent.id);

  const onClick = (event: MouseEvent<HTMLSpanElement>) => {
    if (!canBeHighlighted) {
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
      $canBeHighlighted={canBeHighlighted}
      $isHighlighted={isHighlighted}
      onClick={(event) => onClick(event)}>
      {constituent.text}
    </LocalComponents.Span>
  );
};

export default Constituent;