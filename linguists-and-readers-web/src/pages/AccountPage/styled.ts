import styled from 'styled-components';
import { COLORS } from '../../utils/colors.ts';

export const LocalComponents = {
  Container: styled.div`
    width: 60%;
    min-width: 300px;
    max-width: 600px;

    display: flex;
    flex-direction: column;
    gap: 32px;
  `,

  Title: styled.h1`
    font-size: 3rem;
    font-weight: bold;
  `,

  InformationContainer: styled.div<{ direction?: string }>`
    display: flex;
    flex-direction: ${({ direction }) => direction ?? 'column'};

    gap: 16px;

    @media (max-width: 800px) {
      flex-direction: column;
    }
  `,

  HelperTextLink: styled.a`
    font-size: 1.2rem;
    color: ${COLORS.primary};
    margin-top: 2px;
    cursor: pointer;
    text-decoration: underline;
  `,
};
