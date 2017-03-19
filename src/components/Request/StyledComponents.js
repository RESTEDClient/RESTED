import styled from 'styled-components';
import { Clearfix, Button } from 'react-bootstrap';

export const StyledHeader = styled(Clearfix)`
  h2 {
    color: #333333;
    font-size: 15px;
    margin: 4px 0;
  }
`;

export const UnstyledButton = styled(Button)`
  padding: 0;
  color: black;
`;

export const SuggestWrapper = styled.div`
  .react-autosuggest__container {
    position: relative;
  }

  .react-autosuggest__input--focused {
    outline: none;
  }

  .react-autosuggest__input--open {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  .react-autosuggest__suggestions-container {
    display: none;
  }

  .react-autosuggest__suggestions-container--open {
    display: block;
    position: absolute;
    top: 33px;
    width: 100%;
    border: 1px solid #aaa;
    background-color: #fff;
    font-size: 12px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    z-index: 2;
  }

  .react-autosuggest__suggestions-list {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  .react-autosuggest__suggestion {
    cursor: pointer;
    padding: 10px;
  }

  .react-autosuggest__suggestion--highlighted {
    background-color: #ddd;
  }
`;

