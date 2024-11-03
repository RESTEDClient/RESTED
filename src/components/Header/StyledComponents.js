import styled, { css } from 'styled-components';

/* eslint-disable import/prefer-default-export */
export const StyledHeader = styled.header`
  margin: 20px 0px 0px 0px;
  color: black;

  .navbar-brand {
    display: flex;
    alignItems: center;
    gap: 8px;
  }

  h3, li a {
    color: rgb(51, 51, 51) !important;
    margin: 0;
  }

  ${props => props.darkMode && css`
    h3, li a {
      color: white !important;
    }
    img {
      filter: invert(100%);
    }
  `}
`;

