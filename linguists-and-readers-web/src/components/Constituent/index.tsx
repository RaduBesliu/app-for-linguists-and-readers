import { ConstituentJson } from '../../api/constituent/types.ts';
import { LocalComponents } from './styled.ts';
import { Dispatch, SetStateAction, MouseEvent, MutableRefObject, useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider/context.ts';
import { AlignmentsContext } from '../../providers/AlignmentsProvider/context.ts';
import { generateRandomId } from '../../utils';

const Constituent = ({
  constituent,
  anchor,
  setAnchor,
  selectedConstituentRef,
  storyNumber = 'first',
  toggleSelectedIdsStatus,
}: {
  constituent: ConstituentJson;
  anchor: HTMLElement | null;
  setAnchor: Dispatch<SetStateAction<HTMLElement | null>>;
  selectedConstituentRef: MutableRefObject<undefined | ConstituentJson>;
  storyNumber: 'first' | 'second';
  toggleSelectedIdsStatus: (value: boolean) => void;
}) => {
  const { isLinguist } = useContext(AuthContext);
  const { selectedMode, localAlignment, setLocalAlignment, colorMappingObject } = useContext(AlignmentsContext);

  const isHighlighted = Boolean(
    selectedConstituentRef.current?.id === constituent.id ||
      (storyNumber === 'first' && localAlignment?.leftConstituentIds?.includes(constituent.id)) ||
      (storyNumber === 'second' && localAlignment?.rightConstituentIds?.includes(constituent.id)) ||
      (constituent.id in colorMappingObject && selectedMode[0] === 'constituents'),
  );

  const handleAlignmentClick = () => {
    const constituentId = constituent.id;

    if (selectedMode[0] !== 'constituents' || constituentId in colorMappingObject) {
      return;
    }

    if (storyNumber === 'first') {
      if (localAlignment?.leftConstituentIds?.includes(constituentId)) {
        setLocalAlignment?.((prev) => {
          const leftConstituentIds = prev?.leftConstituentIds?.filter((id) => id !== constituentId);

          if (prev) {
            return { ...prev, leftConstituentIds };
          }

          return { id: generateRandomId({}), leftConstituentIds };
        });

        toggleSelectedIdsStatus(false);
        return;
      }

      setLocalAlignment?.((prev) => {
        const leftConstituentIds = prev?.leftConstituentIds
          ? [...prev.leftConstituentIds, constituentId]
          : [constituentId];

        if (prev) {
          return { ...prev, leftConstituentIds };
        }

        return { id: generateRandomId({}), leftConstituentIds };
      });

      toggleSelectedIdsStatus(true);
      return;
    }

    if (localAlignment?.rightConstituentIds?.includes(constituentId)) {
      setLocalAlignment?.((prev) => {
        const rightConstituentIds = prev?.rightConstituentIds?.filter((id) => id !== constituentId);

        if (prev) {
          return { ...prev, rightConstituentIds };
        }

        return { id: generateRandomId({}), rightConstituentIds };
      });

      toggleSelectedIdsStatus(false);
      return;
    }

    setLocalAlignment?.((prev) => {
      const rightConstituentIds = prev?.rightConstituentIds
        ? [...prev.rightConstituentIds, constituentId]
        : [constituentId];

      if (prev) {
        return { ...prev, rightConstituentIds };
      }

      return { id: generateRandomId({}), rightConstituentIds };
    });
    toggleSelectedIdsStatus(true);
  };

  const onClick = (event: MouseEvent<HTMLSpanElement>) => {
    if (!isLinguist || selectedMode[0] !== 'read') {
      handleAlignmentClick();
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
      $backgroundColor={colorMappingObject[constituent.id]}
      onClick={(event) => onClick(event)}>
      {constituent.text}
    </LocalComponents.Span>
  );
};

export default Constituent;
