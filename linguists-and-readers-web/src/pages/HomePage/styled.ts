import styled from 'styled-components';
import { COLORS } from '../../utils/colors.ts';

export const LocalComponents = {
  Container: styled.div`
    width: 100%;
    max-width: 1240px;

    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 32px;
  `,

  InformationContainer: styled.div`
    width: 100%;
    max-width: 45%;
    min-width: 300px;

    height: fit-content;

    display: flex;
    flex-direction: column;
    gap: 16px;

    padding: 16px;

    border-radius: 6px;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
    border: 2px solid ${COLORS.primary};

    &:hover {
      cursor: pointer;
      border: 2px solid ${COLORS.tertiary};
    }
  `,

  InformationContainerTitle: styled.h1`
    font-size: 2rem;
    font-weight: bold;
  `,

  InformationContainerDescription: styled.p`
    font-size: 1.5rem;
  `,
};
