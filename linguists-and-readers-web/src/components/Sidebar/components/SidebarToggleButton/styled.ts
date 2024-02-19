import styled from 'styled-components';

export const LocalComponents = {
  Container: styled.div<{ $isSidebarOpen: boolean }>`
    height: 36px;

    position: absolute;
    right: -18px;
    top: 100px;

    font-size: 36px;

    transform: rotate(${({ $isSidebarOpen }) => ($isSidebarOpen ? '0deg' : '180deg')});

    transition: all 0.5s;

    &:hover {
      cursor: pointer;
    }
  `,
};
