import React, { PropTypes } from 'react';
import {
  Col,
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
} from 'react-bootstrap';

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

      <Col sm={8}>
        <FormControl
          type="text"
          {...input}
        />
      </Col>
      <Col sm={2}>
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

