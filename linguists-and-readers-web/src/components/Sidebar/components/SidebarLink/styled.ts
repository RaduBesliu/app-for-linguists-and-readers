import styled from 'styled-components';
import { COLORS } from '../../../../utils/colors.ts';

export const LocalComponents = {
  Container: styled.div<{ $isActive: boolean }>`
    display: flex;
    align-items: center;
    gap: 1rem;

    font-size: 3rem;

    &:hover {
      cursor: ${({ $isActive }) => ($isActive ? 'default' : 'pointer')};
      ${({ $isActive }) => !$isActive && `border-bottom: 2px solid ${COLORS.primary};`};
      ${({ $isActive }) => !$isActive && `margin-bottom: -2px;`};
    }
  `,

  Title: styled.span<{ $isSidebarOpen: boolean; $isActive: boolean }>`
    font-size: 1.6rem;
    font-weight: 500;

    color: ${({ $isActive }) => ($isActive ? COLORS.primary : COLORS.black)};

    opacity: ${({ $isSidebarOpen }) => ($isSidebarOpen ? 1 : 0)};

    transition: opacity 0.2s 0.1s;
  `,
};
