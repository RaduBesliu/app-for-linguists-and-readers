import styled from 'styled-components';
import { COLORS } from '../../utils/colors.ts';
import { RADII } from '../../utils/sizes.ts';

export const LocalComponents = {
  Container: styled.div<{ width?: number | string; $wrap?: boolean }>`
    width: ${({ width }) => (typeof width === 'number' ? `${width}px` : '100%')};

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    flex-wrap: ${({ $wrap }) => ($wrap ? 'wrap' : 'nowrap')};

    gap: 16px;
  `,

  PickerItem: styled.button<{ $isActive: boolean; height: number }>`
    width: 100%;
    height: ${({ height }) => `${height}px`};

    color: ${COLORS.black};

    border: ${({ $isActive }) => ($isActive ? `2px solid ${COLORS.primary}` : `1px solid ${COLORS.gray}`)};
    font-weight: ${({ $isActive }) => ($isActive ? 'bold' : 'normal')};

    border-radius: ${RADII.default}px;

    background-color: ${COLORS.white};

    font-size: 1.4rem;

    outline: none;

    &:hover {
      cursor: pointer;
      border: 2px solid ${COLORS.primary};
    }
  `,
};
