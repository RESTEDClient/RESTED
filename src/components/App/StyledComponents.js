import React from 'react';
import styled, { css } from 'styled-components';
import { Col } from 'react-bootstrap';

// Strip collapsed prop to avoid react warning
// eslint-disable-next-line
const Left = ({ collapsed, ...props }) => <Col {...props} />;

export const LeftCol = styled(Left)`
  transition: 0.2s ease;
  ${props => props.collapsed && css`
    float: left;
    opacity: 0;
    width: 0px;

    white-space: nowrap;
  `}
`;

export const RightCol = styled(Col)`
  transition: 0.2s ease;
`;

