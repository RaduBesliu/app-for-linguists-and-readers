import { ConstituentType } from '../../api/constituent/types.ts';
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
  constituent: ConstituentType;
  anchor: HTMLElement | null;
  setAnchor: Dispatch<SetStateAction<HTMLElement | null>>;
  selectedConstituentRef: MutableRefObject<undefined | ConstituentType>;
  storyNumber: 'first' | 'second';
  toggleSelectedIdsStatus: (value: boolean) => void;
}) => {
  const { isLinguist } = useContext(AuthContext);
  const {
    selectedMode,
    localAlignment,
    setLocalAlignment,
    colorMappingObject,
    defaultAlignmentsColorMappingObject,
    extendedLocalAlignmentConstituentIds,
    selectedAlignmentId,
    setSelectedAlignmentId,
  } = useContext(AlignmentsContext);

  const isHighlighted = Boolean(
    selectedConstituentRef.current?.id === constituent.id ||
      (selectedMode[0] === 'default alignments' && defaultAlignmentsColorMappingObject?.[constituent.id]) ||
      (colorMappingObject?.[constituent.id] &&
        (!selectedAlignmentId || selectedAlignmentId === colorMappingObject[constituent.id][0]) &&
        selectedMode[0] === 'constituents') ||
      (storyNumber === 'first' && localAlignment?.leftConstituentIds?.includes(constituent.id)) ||
      (storyNumber === 'second' && localAlignment?.rightConstituentIds?.includes(constituent.id)),
  );

  const handleAlignmentClick = () => {
    const constituentId = constituent.id;

    if (selectedMode[0] !== 'constituents') {
      return;
    }

    if (colorMappingObject?.[constituentId]) {
      setSelectedAlignmentId?.((prev) =>
        prev === colorMappingObject[constituentId]?.[0] ? undefined : colorMappingObject[constituentId]?.[0],
      );
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
      $backgroundColor={
        selectedMode[0] === 'default alignments' && defaultAlignmentsColorMappingObject?.[constituent.id]
          ? defaultAlignmentsColorMappingObject[constituent.id]?.[1]
          : colorMappingObject?.[constituent.id] &&
              (!selectedAlignmentId || selectedAlignmentId === colorMappingObject[constituent.id]?.[0])
            ? colorMappingObject[constituent.id]?.[1]
            : ''
      }
      $isRecommended={extendedLocalAlignmentConstituentIds?.includes(constituent.id)}
      onClick={(event) => onClick(event)}>
      {constituent.text}
    </LocalComponents.Span>
  );
};

export default Constituent;
