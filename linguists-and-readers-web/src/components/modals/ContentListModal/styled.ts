import styled from 'styled-components';
import { COLORS } from '../../../utils/colors.ts';

export const LocalComponents = {
  ContentListModalContainer: styled.div`
    position: relative;

    width: 500px;
    height: 500px;
    background-color: ${COLORS.background};
    border-radius: 6px;

    overflow-y: auto;

    padding: 48px 16px;

    display: flex;
    flex-direction: column;
    gap: 16px;
  `,

  ContentLanguageGroupContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
  `,

  ContentListTitle: styled.h1`
    font-size: 2rem;
    text-transform: capitalize;
  `,

  ContentListStoryTitleWrapper: styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
  `,

  ContentListStoryTitle: styled.h2<{ $isSelected: boolean }>`
    font-size: 1.5rem;
    color: ${({ $isSelected }) => ($isSelected ? COLORS.primary : COLORS.black)};

    &:hover {
      cursor: pointer;
      color: ${COLORS.primary};
    }
  `,

  ContentListStoryContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
  `,

  CheckmarkIconWrapper: styled.div`
    font-size: 2rem;
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
