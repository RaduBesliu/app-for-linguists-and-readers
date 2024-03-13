import styled from 'styled-components';
import { COLORS } from '../../../utils/colors.ts';

export const LocalComponents = {
  Container: styled.div`
    position: relative;

    background-color: ${COLORS.background};
    border-radius: 6px;

    overflow-y: auto;

    padding: 16px;

    display: flex;
    flex-direction: column;
    gap: 16px;
  `,

  Label: styled.label`
    font-size: 1.5rem;
    font-weight: bold;
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
};
