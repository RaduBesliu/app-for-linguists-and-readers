import styled from 'styled-components';
import { COLORS } from '../../utils/colors.ts';

export const LocalComponents = {
  Container: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;

    &:hover {
      cursor: pointer;
    }
  `,

  Label: styled.p`
    font-size: 1.2rem;
    font-weight: 500;
    color: ${COLORS.grayDark};
  `,
};
