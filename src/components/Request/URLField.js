import React, { PropTypes } from 'react';
import { Row, Col, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

function URLField({ input, meta, placeholderUrl }) {
  return (
    <FormGroup
      controlId="url"
      validationState={meta.touched && meta.invalid ? 'error' : null}
    >
      <Row>
        <Col
          componentClass={ControlLabel}
          sm={2}
        >
          URL
        </Col>

        <Col sm={10}>
          <FormControl
            type="text"
            placeholder={placeholderUrl}
            autoFocus
            {...input}
          />
        </Col>
      </Row>
    </FormGroup>
  );
}

URLField.propTypes = {
  placeholderUrl: PropTypes.string,
  /* eslint-disable react/forbid-prop-types */
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  /* eslint-enable react/forbid-prop-types */
};

export default URLField;

