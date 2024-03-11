import styled from 'styled-components';
import { COLORS } from '../../utils/colors.ts';

export const LocalComponents = {
  Container: styled.div<{ $canBeHighlighted: boolean }>`
    &:hover {
      ${({ $canBeHighlighted }) => $canBeHighlighted && `background-color: ${COLORS.background}; border-radius: 4px;`};
    }
  `,
};
