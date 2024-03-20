import styled from 'styled-components';
import { COLORS } from '../../utils/colors.ts';
import { isColorLight } from '../../utils';

export const LocalComponents = {
  Container: styled.div<{
    $canBeHighlighted: boolean;
    $selectedMode: string;
    $storyNumber: string;
    $backgroundColor?: string;
    $isSelected: boolean;
  }>`
    ${({ $isSelected, $storyNumber, $backgroundColor }) =>
      $isSelected &&
      `background-color: ${$backgroundColor ? $backgroundColor : $storyNumber === 'first' ? COLORS.primary : COLORS.tertiary}; color: ${$backgroundColor && isColorLight($backgroundColor) ? COLORS.black : COLORS.white}; border-radius: 4px;`};
    ${({ $backgroundColor, $selectedMode }) =>
      $backgroundColor && $selectedMode === 'sentences' && `font-weight: bold;`};

    &:hover {
      ${({ $canBeHighlighted }) => $canBeHighlighted && `background-color: ${COLORS.background}; border-radius: 4px;`};

      ${({ $selectedMode, $storyNumber }) =>
        $selectedMode === 'sentences' &&
        `background-color: ${$storyNumber === 'first' ? COLORS.primary : COLORS.tertiary}; color: ${COLORS.white}; border-radius: 4px; cursor: pointer;`};
    }
  `,
};
