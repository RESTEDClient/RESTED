import React, { PropTypes } from 'react';
import {
  Col,
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
} from 'react-bootstrap';

import { REQUEST_METHODS } from 'constants/constants';

function MethodField({ input, meta }) {
  return (
    <FormGroup
      controlId="method"
      validationState={meta.invalid ? 'error' : undefined}
    >
      <Col sm={2}>
        <ControlLabel>
          Method
        </ControlLabel>
      </Col>

      <Col sm={7}>
        <FormControl
          componentClass="select"
          placeholder="Method"
          {...input}
        >
          {REQUEST_METHODS.map(method => (
            <option key={method} value={method}>
              {method}
            </option>
          ))}
        </FormControl>
      </Col>
      <Col sm={3}>
        <Button
          type="submit"
          bsStyle="primary"
        >
          Send request
        </Button>
      </Col>
    </FormGroup>
  );
}

MethodField.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  /* eslint-enable react/forbid-prop-types */
};

export default MethodField;

