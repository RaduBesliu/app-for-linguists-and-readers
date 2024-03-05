import styled from 'styled-components';
import { COLORS } from '../../utils/colors.ts';

export const LocalComponents = {
  Span: styled.span`
    font-size: 1.75em;
    border-radius: 4px;

    &:hover {
      cursor: pointer;
      background-color: ${COLORS.primary};
      color: ${COLORS.white};
    }
  `,
};
