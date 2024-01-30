import styled from 'styled-components';

export const LocalComponents = {
  Container: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
  `,

  Title: styled.h1`
    font-size: 3rem;
    font-weight: bold;
  `,

  Form: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    gap: 36px;

    height: 100vh;

    width: 75vw;
    max-width: 600px;
    min-width: 300px;
  `,

  FormInputsContainer: styled.div<{ $flexDirection: string }>`
    display: flex;
    flex-direction: ${({ $flexDirection }) => $flexDirection};
    align-items: center;
    justify-content: space-between;

    gap: 16px;

    width: 100%;

    @media (max-width: 600px) {
      flex-direction: column;
    }
  `,
};
