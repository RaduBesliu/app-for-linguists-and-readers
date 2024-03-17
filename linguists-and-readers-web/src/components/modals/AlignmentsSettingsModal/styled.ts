import styled from 'styled-components';
import { COLORS } from '../../../utils/colors.ts';

export const LocalComponents = {
  Container: styled.div`
    position: relative;

    background-color: ${COLORS.background};
    border-radius: 6px;

    overflow-y: auto;

    padding: 48px 16px;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;

    width: 40%;
    min-width: 300px;
    max-width: 500px;
  `,

  CloseIconWrapper: styled.div`
    position: absolute;

    top: 16px;
    right: 16px;

    &:hover {
      cursor: pointer;
    }
  `,

  SectionWrapper: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;

    width: 100%;
  `,

  Title: styled.h2`
    font-size: 2rem;
    font-weight: 600;
  `,
};
