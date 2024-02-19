import styled from 'styled-components';
import { COLORS } from '../../utils/colors.ts';
import { RADII } from '../../utils/sizes.ts';

export const LocalComponents = {
  Button: styled.button<{ type: string; width: number | string; height: number; $isDisabled: boolean }>`
    width: ${({ width }) => (typeof width === 'number' ? `${width}px` : '100%')};
    height: ${({ height }) => `${height}px`};
    background-color: ${({ type }) =>
      type === 'primary' ? COLORS.primary : type === 'secondary' ? COLORS.background : COLORS.error};
    color: ${({ type }) => (type === 'primary' || type === 'danger' ? COLORS.white : COLORS.black)};

    ${({ $isDisabled }) => $isDisabled && 'opacity: 0.5;'}
    ${({ $isDisabled }) => $isDisabled && 'pointer-events: none;'}

    border-radius: ${RADII.default}px;

    font-size: 1.4rem;

    transition: all 0.2s ease-in-out;

    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);

    &:hover {
      background-color: ${({ type }) =>
        type === 'primary' ? COLORS.primaryDark : type === 'secondary' ? COLORS.backgroundDark : COLORS.errorDark};
      color: ${({ type }) => (type === 'primary' || type === 'danger' ? COLORS.white : COLORS.black)};

      cursor: pointer;
    }

    &:active {
      box-shadow: none;
      transform: translateY(2px) translateX(2px);
    }
  `,
};
