import styled from 'styled-components';
import { COLORS } from '../../utils/colors.ts';

export const LocalComponents = {
  Span: styled.span<{ $isHighlighted: boolean; $canBeHighlighted: boolean }>`
    position: relative;

    font-size: 1.75em;
    border-radius: 4px;

    ${({ $isHighlighted }) => $isHighlighted && `background-color: ${COLORS.primary}; color: ${COLORS.white};`}

    &:hover {
      ${({ $canBeHighlighted }) =>
        $canBeHighlighted && `cursor: pointer; background-color: ${COLORS.primary}; color: ${COLORS.white};`};
    }
  `,
};
