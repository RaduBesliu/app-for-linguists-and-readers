import styled from 'styled-components';
import { COLORS } from '../../utils/colors.ts';

export const LocalComponents = {
  Span: styled.span<{
    $isHighlighted: boolean;
    $canBeHighlighted: boolean;
    $selectedMode: string;
    $storyNumber: string;
  }>`
    position: relative;

    font-size: 1.75em;
    border-radius: 4px;

    ${({ $isHighlighted }) => $isHighlighted && `background-color: ${COLORS.primary}; color: ${COLORS.white};`}

    &:hover {
      ${({ $canBeHighlighted, $selectedMode }) =>
        $canBeHighlighted &&
        $selectedMode === 'read' &&
        `cursor: pointer; background-color: ${COLORS.primary}; color: ${COLORS.white};`};

      ${({ $selectedMode, $storyNumber }) =>
        $selectedMode === 'constituents' &&
        `background-color: ${$storyNumber === 'first' ? COLORS.primary : COLORS.tertiary}; color: ${COLORS.white}; cursor: pointer`};
    }
  `,
};
