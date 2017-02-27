import styled from 'styled-components';
import { Panel } from 'react-bootstrap';
import Fonticon from 'components/Fonticon';

export const StyledResponse = styled(Panel)`
  pre {
    padding: 0;
  }
`;

export const LoadingSpinner = styled(Fonticon)`
  padding: 40px 0 40px;
  font-size: 3em;
  opacity: 0.9;
`;

export const StyledHeader = styled.div`
  h3 {
    color: #333333;
    font-size: 15px;
    margin: 4px 0;
  }
`;

export const Status = styled.span`
  fontSize: 32px;
  color: orange;
  ${props => props.green && 'color: green;'}
  ${props => props.red && 'color: red;'}
`;

