import styled from 'styled-components';
import { COLORS } from '../../../../utils/colors.ts';

export const LocalComponents = {
  Container: styled.div`
    position: relative;

    width: auto;
    height: auto;
    background-color: white;

    padding: 16px;
    box-shadow: 0 0 8px ${COLORS.black};

    border-radius: 6px;
  `,

  CloseIconWrapper: styled.div`
    position: absolute;
    top: 16px;
    right: 16px;

    &:hover {
      cursor: pointer;
    }
  `,

  Title: styled.h1`
    font-size: 2rem;
    margin-bottom: 6px;

    color: ${COLORS.primary};
  `,

  ValueWrapper: styled.div`
    display: flex;
    flex-direction: row;
    gap: 6px;
  `,

  Key: styled.h2`
    font-size: 1.5rem;
    text-transform: capitalize;
  `,

  MorphologyWrapper: styled.div`
    margin-top: 6px;
  `,

  Description: styled.span<{ $isClickable?: boolean }>`
    font-size: 1.5rem;
    ${({ $isClickable }) => $isClickable && `text-decoration: underline; color: ${COLORS.primary};`}

    &:hover {
      ${({ $isClickable }) => $isClickable && `cursor: pointer;`}
    }
  `,

  AromanianDescription: styled.span`
    font-size: 1.5rem;

    text-decoration: underline;
    color: ${COLORS.primary};

    &:hover {
      cursor: pointer;
    }
  `,

  DescriptionWrapper: styled.div``,

  DescriptionList: styled.div`
    width: 100%;
    padding-left: 16px;
  `,
};
