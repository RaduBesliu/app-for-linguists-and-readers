import styled from 'styled-components';
import { COLORS } from '../../utils/colors.ts';
import { RADII } from '../../utils/sizes.ts';

export const LocalComponents = {
  Container: styled.div<{ width?: number | string }>`
    width: ${({ width }) => (typeof width === 'number' ? `${width}px` : '100%')};

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 6px;
  `,

  Input: styled.input<{ $isValid: boolean; height: number; $hasIconPadding?: boolean }>`
    width: 100%;
    height: ${({ height }) => `${height}px`};

    color: ${COLORS.black};

    border: 1px solid ${({ $isValid }) => ($isValid ? COLORS.gray : COLORS.error)};
    border-radius: ${RADII.default}px;

    font-size: 1.4rem;

    padding: 20px ${({ $hasIconPadding }) => ($hasIconPadding ? '44px' : '16px')} 20px 16px;
    outline: none;
    transition: all 0.2s ease-in-out;

    &:focus {
      border-color: ${COLORS.primary};
    }

    &::placeholder {
      color: ${COLORS.grayDark};
    }
  `,

  Label: styled.h1`
    font-size: 1rem;
    font-weight: 700;

    text-transform: uppercase;

    color: ${COLORS.grayDark};
  `,

  InputWrapper: styled.div<{ width?: number | string }>`
    width: ${({ width }) => (typeof width === 'number' ? `${width}px` : '100%')};
    position: relative;

    &:focus-within {
      div {
        visibility: visible;
        opacity: 1;
      }
    }
  `,

  IconWrapper: styled.div`
    position: absolute;
    top: 50%;
    right: 16px;
    transform: translateY(-50%);

    transition:
      visibility 0.2s ease-in-out,
      opacity 0.2s ease-in-out;

    visibility: hidden;
    opacity: 0;

    &:hover {
      cursor: pointer;
    }
  `,
};
