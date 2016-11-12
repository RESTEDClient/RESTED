import styled, { css } from 'styled-components';
import { Panel } from 'react-bootstrap';

const hoverStyle = css`
  background-color: gray;
  color: gray;
`;

export const StyledPanel = styled.default(Panel)`
  padding-left: 0;
  padding-right: 0;
  padding-bottom: 0;

  ${props => props.isDragging && hoverStyle}

  .panel-default {
    background-color: red;
  }
`;

export const StyledRequest = styled.default.div`
  ul, li {
    ${props => props.isDragging && hoverStyle}
  }
`;

