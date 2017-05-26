import styled from 'styled-components';
import { Panel as UnstyledPanel, Nav } from 'react-bootstrap';

export const Panel = styled(UnstyledPanel)`
  > .panel-body {
    padding: 0;
  }

  > .panel-heading {
    padding: 10px 0 0 0;
  }

  .panel {
    border-radius: 0;
    border-width: 0;
  }

  .nav-pills a {
    border: 0 !important;
    background-image: none !important;
  }
`;

export const StyledTitlebar = styled(Nav)`
  li.active {
    border-bottom: 3px solid #c8c4c4;
    border-color: inherit;
    font-weight: bold;
  }

  li {
    width: 48%;
    text-align: center;
    cursor: pointer;
    padding-bottom: 5px;
  }

  li:last-child {
    float: right;
  }

  li a {
    padding: 0;
    color: inherit !important;
    background-color: transparent !important;
  }
`;

