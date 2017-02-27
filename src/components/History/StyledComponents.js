import styled from 'styled-components';
import { Panel as UnstyledPanel } from 'react-bootstrap';

export const Panel = styled(UnstyledPanel)`
  border-radius: 0;
`;

export const List = styled.ul`
  padding-left: 0;
  list-style: none;
`;

export const ListGroupItem = styled.li`
  border-radius: 0 !important;
  cursor: pointer;
`;

