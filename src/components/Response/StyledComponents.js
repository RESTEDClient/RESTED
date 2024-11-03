import React from 'react';
import styled from 'styled-components';
import { Panel } from 'react-bootstrap';
import Fonticon from 'components/Fonticon';

// Fix "Unknown prop" warnings
// eslint-disable-next-line
const PrunedPanel = ({ wrapResponse, ...rest }) => <Panel {...rest} />;

export const StyledResponse = styled(PrunedPanel)`
  pre {
    padding: 0;
  }
  pre, code {
    ${props => props.wrapResponse && 'white-space: pre-wrap;'};
  }
`;

export const LoadingSpinner = styled(Fonticon)`
  padding: 40px 0 40px;
  font-size: 3em;
  opacity: 0.9;
`;

export const StyledHeader = styled.div`
  ${props => props.expandable && 'cursor: pointer;'}

  h3 {
    font-size: 15px;
    margin: 4px 0;
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

export const PreviewContainer = styled(Panel)`
  .panel-body {
    padding: 0;
  }

  iframe {
    border: 0;
    width: 100%;
    height: 600px;
  }
`;

