import styled from 'styled-components';

/* eslint-disable import/prefer-default-export */
export const StyledCollapsable = styled.div`
  h4 {
    margin: 0;
    color: black;
  }
  i {
    margin-left: 5px;
    transition: .25s ease-in-out;
  }
  button {
    padding-left: 0;
    padding-right: 0;
  }
  button:hover,
  button:active {
    text-decoration: none;
  }
  pre {
    padding: 0;
  }
`;

