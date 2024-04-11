import styled from 'styled-components';
import { COLORS } from '../../../utils/colors.ts';

export const LocalComponents = {
  Container: styled.div`
    position: relative;

    background-color: ${COLORS.background};
    border-radius: 6px;

    overflow-y: auto;

    padding: 16px;

    max-width: 500px;
    max-height: 750px;

    display: flex;
    flex-direction: column;
  `,

  DefinitionLink: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  `,

  Key: styled.h2`
    font-size: 1.5rem;
  `,

  HighlightedKey: styled.h2`
    font-size: 1.5rem;
    color: ${COLORS.primary};
    text-decoration: underline;

    &:hover {
      cursor: pointer;
    }
  `,

  DangerTextWrapper: styled.div`
    font-size: 1.25rem;
    font-weight: bold;
    color: ${COLORS.error};

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
  `,

  CloseIconWrapper: styled.div`
    position: absolute;

    top: 16px;
    right: 16px;

    &:hover {
      cursor: pointer;
    }
  `,

  Separator: styled.div`
    margin-top: 16px;
  `,
};
