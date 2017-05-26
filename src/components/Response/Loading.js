import React from 'react';
import { Col } from 'react-bootstrap';

import { LoadingSpinner } from './StyledComponents';

export default function Loading() {
  return (
    <Col xs={12} className="text-center">
      <LoadingSpinner
        icon="gear"
        className="fa-spin"
      />
    </Col>
  );
}

