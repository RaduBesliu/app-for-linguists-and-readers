import styled from 'styled-components';
import { COLORS } from '../../utils/colors.ts';

export const LocalComponents = {
  Container: styled.div`
    width: 80%;
    max-width: 1240px;

    height: 90%;

    display: flex;
    flex-direction: column;
    gap: 32px;
  `,

  Header: styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
  `,

  Title: styled.h1`
    font-size: 3rem;
    font-weight: bold;
  `,

  SearchWrapper: styled.div`
    display: flex;
    flex-direction: row;
    gap: 16px;
  `,

  DictionaryResultWrapper: styled.div`
    height: 100%;

    display: flex;
    flex-direction: column;
    gap: 16px;

    overflow-y: auto;
  `,

  DictionaryEntry: styled.div`
    border: 3px solid ${COLORS.primary};
    border-radius: 6px;

    padding: 16px;

    margin-right: 16px;

    display: flex;
    flex-direction: column;
    gap: 8px;
  `,

  DictionaryEntryText: styled.p`
    font-size: 2rem !important;

    * {
      font-size: inherit !important;
    }
  `,

  DictionaryEntryAdditionalInfoContainer: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
  `,

  DictionaryEntrySource: styled.p`
    font-size: 1.5rem;
    font-style: italic;
  `,

  DictionaryEntryDatesContainer: styled.div``,

  DictionaryEntryDate: styled.p`
    font-size: 1.5rem;
  `,
};
