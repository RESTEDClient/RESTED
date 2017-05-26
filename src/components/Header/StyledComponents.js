import styled, { css } from 'styled-components';

/* eslint-disable import/prefer-default-export */
export const StyledHeader = styled.header`
  margin-top: 20px;
  margin-bottom: 30px;

  img {
    margin-top: -7px;
    margin-right: 10px;
  }

  h1 {
    color: black;
  }

  ${props => props.darkMode && css`
    h1 {
      color: white;
    }
    img {
      filter: invert(100%);
    }
  `}
`;

