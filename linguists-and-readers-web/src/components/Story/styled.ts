import styled from 'styled-components';

export const LocalComponents = {
  Container: styled.div``,

  StoryContainer: styled.div`
    position: relative;

    width: 100%;
    height: 100%;

    overflow-y: auto;
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
};
