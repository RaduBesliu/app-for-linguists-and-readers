import styled from 'styled-components';

export const LocalComponents = {
  Container: styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  `,

  Title: styled.h1`
    font-size: 2em;
    text-align: center;
  `,

  StoryContainer: styled.div`
    width: 80%;
    max-height: 80%;

    padding: 4px 16px 4px 4px;
    overflow-y: auto;
    border: 3px solid black;
  `,
};
