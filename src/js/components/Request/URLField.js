import React, { PropTypes } from 'react';
import { Col, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import classNames from 'classnames';

function URLField({ input, meta }) {
  return (
    <FormGroup
      controlId="url"
      validationState={meta.invalid ? 'error' : undefined}>
      <Col sm={2}>
        <ControlLabel>
          URL
        </ControlLabel>
      </Col>

      <Col sm={10}>
        <FormControl
          type="text"
          {...input}
        />
      </Col>
    </FormGroup>
  );
}

URLField.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
};

export default URLField;

