import styled from 'styled-components';

export const LocalComponents = {
  Container: styled.div<{ $isSidebarOpen: boolean }>`
    opacity: ${({ $isSidebarOpen }) => ($isSidebarOpen ? '1' : '0')};

    transition: ${({ $isSidebarOpen }) => ($isSidebarOpen ? 'opacity 1s ease' : 'opacity 0.2s ease')};
  `,
};
