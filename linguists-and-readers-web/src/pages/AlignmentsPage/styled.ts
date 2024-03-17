import styled from 'styled-components';

export const LocalComponents = {
  Container: styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    gap: 16px;
  `,

  ButtonsContainer: styled.div`
    width: 95%;

    display: flex;
    gap: 16px;
  `,

  StoriesContainer: styled.div`
    width: 95%;
    height: 85%;

    max-width: 1240px;

    border-radius: 6px;
    border: 3px solid black;

    display: flex;

    @media (max-width: 900px) {
      flex-direction: column;
    }
  `,

  StoryContainer: styled.div`
    position: relative;

    width: 50%;
    height: 100%;

    max-width: 1000px;

    padding: 4px 16px 4px 4px;
    overflow-y: auto;

    @media (max-width: 900px) {
      width: 100%;
      height: 50%;
    }
  `,

  Separator: styled.div<{ $isVertical?: boolean }>`
    width: ${(props) => (props.$isVertical ? '3px' : '100%')};
    height: ${(props) => (props.$isVertical ? '100%' : '3px')};

    background-color: black;

    flex-shrink: 0;

    @media (max-width: 900px) {
      width: ${(props) => (props.$isVertical ? '100%' : '3px')};
      height: ${(props) => (props.$isVertical ? '3px' : '100%')};
    }
  `,
};
