import React, { PropTypes } from 'react';
import { Col, FormGroup, FormControl } from 'react-bootstrap';

import Collapsable from '../Collapsable';

export function BasicAuthField(fields) {
  return (
    <Collapsable
      title="Basic auth"
      id="basicAuth"
    >
      <FormGroup controlId="method">
        <Col xs={5}>
          <FormControl
            type="text"
            placeholder="Username"
            {...fields.basicAuth.username.input}
          />
        </Col>
        <Col xs={5}>
          <FormControl
            type="text"
            placeholder="Password"
            {...fields.basicAuth.password.input}
          />
        </Col>
        <Col xs={2}>
          Show password?
        </Col>
      </FormGroup>
    </Collapsable>
  );
}

BasicAuthField.propTypes = {
  basicAuth: PropTypes.shape({
    username: PropTypes.shape({
      input: PropTypes.shape({}).isRequired,
    }).isRequired,
    password: PropTypes.shape({
      input: PropTypes.shape({}).isRequired,
    }).isRequired,
  }).isRequired,
};

export default BasicAuthField;

