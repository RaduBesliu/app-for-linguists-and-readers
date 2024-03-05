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

  Title: styled.h1`
    font-size: 2em;
    text-align: center;
  `,

  StoryContainer: styled.div`
    width: 95%;
    height: 90%;

    max-width: 1000px;

    padding: 4px 16px 4px 4px;
    overflow-y: auto;
    border: 3px solid black;
  `,
};
