import styled from 'styled-components';
import { Panel as UnstyledPanel } from 'react-bootstrap';

/* eslint-disable import/prefer-default-export */
export const Panel = styled(UnstyledPanel)`
  border-radius: 0;
  border-width: 0;

  > .panel-body {
    padding: 0;
  }
`;

