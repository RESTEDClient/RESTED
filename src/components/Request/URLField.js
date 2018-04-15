import React, { PropTypes } from 'react';
import { Col, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

function URLField(props) {
  const { input, meta, placeholderUrl } = props;
  return (
    <FormGroup
      controlId="url"
      validationState={meta.touched && meta.invalid ? 'error' : null}
    >
      <Col sm={12}>
        <ControlLabel
          srOnly
        >
          URL
        </ControlLabel>
        <FormControl
          type="text"
          placeholder={placeholderUrl}
          autoFocus
          {...input}
        />
      </Col>
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

