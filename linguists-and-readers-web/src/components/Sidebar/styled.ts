import styled from 'styled-components';
import { COLORS } from '../../utils/colors.ts';

export const LocalComponents = {
  Container: styled.div`
    display: flex;
  `,

  ContentContainer: styled.div`
    width: 100%;
    height: 100vh;
  `,

  SidebarContainer: styled.div<{ $isSidebarOpen: boolean }>`
    background-color: ${COLORS.backgroundDark};
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);

    width: ${({ $isSidebarOpen }) => ($isSidebarOpen ? '200' : '64')}px;
    height: 100vh;

    padding: 16px;

    position: relative;

    transition: all 0.45s ease;
  `,

  Title: styled.h1`
    font-size: 2rem;
    color: ${COLORS.primary};

    width: 150px;
  `,

  LinksContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
  `,

  SidebarVerticalFlexContainer: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    height: 100%;
    width: 100%;
  `,
};
