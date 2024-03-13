import styled from 'styled-components';

export const LocalComponents = {
  Container: styled.div`
    position: relative;

    height: 100%;
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    gap: 16px;
  `,

  ButtonsContainer: styled.div`
    max-width: 368px;
    width: 100%;

    display: flex;
    flex-direction: row;

    gap: 16px;
  `,

  TitleWrapper: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    gap: 8px;

    width: 100%;
  `,

  Title: styled.h1`
    font-size: 2em;
    text-align: center;
  `,

  InfoIconWrapper: styled.div`
    &:hover {
      cursor: pointer;
    }
  `,

  StoryContainer: styled.div`
    position: relative;

    width: 95%;
    height: 90%;

    border-radius: 6px;

    max-width: 1000px;

    padding: 4px 16px 4px 4px;
    overflow-y: auto;
    border: 3px solid black;
  `,
};
