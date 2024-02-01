import styled from 'styled-components';
import { COLORS } from '../../utils/colors.ts';

export const LocalComponents = {
  Container: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
  `,

  Title: styled.h1`
    font-size: 3rem;
    font-weight: bold;
  `,

  Form: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    gap: 36px;

    height: 100vh;

    width: 75vw;
    max-width: 600px;
    min-width: 300px;
  `,

  FormInputsContainer: styled.div<{ $flexDirection: string }>`
    display: flex;
    flex-direction: ${({ $flexDirection }) => $flexDirection};
    align-items: flex-start;
    justify-content: space-between;

    gap: 16px;

    width: 100%;

    @media (max-width: 600px) {
      flex-direction: column;
    }
  `,

  HelperText: styled.p`
    font-size: 1.2rem;
    color: ${COLORS.grayDark};
    margin-top: 2px;
  `,

  HelperTextLink: styled.a`
    font-size: 1.2rem;
    color: ${COLORS.primary};
    margin-top: 2px;
    cursor: pointer;
    text-decoration: underline;
  `,

  HelperTextContainer: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    gap: 6px;
  `,
};
