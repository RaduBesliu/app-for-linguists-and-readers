import styled from 'styled-components';
import { COLORS } from '../../utils/colors.ts';
import { isColorLight } from '../../utils';

export const LocalComponents = {
  Span: styled.span<{
    $isHighlighted: boolean;
    $canBeHighlighted: boolean;
    $selectedMode: string;
    $storyNumber: string;
    $backgroundColor?: string;
  }>`
    position: relative;

    font-size: 1.75em;
    border-radius: 4px;

    ${({ $isHighlighted, $selectedMode, $storyNumber, $backgroundColor }) =>
      $isHighlighted &&
      `background-color: ${$backgroundColor ? $backgroundColor : $storyNumber === 'first' || $selectedMode !== 'constituents' ? COLORS.primary : COLORS.tertiary}; color: ${$backgroundColor && isColorLight($backgroundColor) ? COLORS.black : COLORS.white};`};
    ${({ $backgroundColor, $selectedMode }) =>
      $backgroundColor && $selectedMode === 'constituents' && `font-weight: bold;`};

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
