import React, { PropTypes } from 'react';
import { Col, Row, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';

import { REQUEST_METHODS } from 'constants/constants';

function MethodField({ input, meta }) {
  const isCustom = !REQUEST_METHODS.slice(0, -1).includes(input.value);

  return (
    <FormGroup
      controlId="method"
      validationState={meta.invalid ? 'error' : undefined}
    >
      <Col
        componentClass={ControlLabel}
        sm={2}
      >
        Method
      </Col>

      <Col sm={7}>
        <Row>
          <Col xs={isCustom ? 6 : 12}>
            <FormControl
              componentClass="select"
              placeholder="Method"
              {...input}
              value={isCustom ? 'CUSTOM' : input.value}
            >
              {REQUEST_METHODS.map(method => (
                <option key={method} value={method}>
                  {method}
                </option>
              ))}
            </FormControl>
          </Col>
          {isCustom && (
            <Col xs={6}>
              <FormControl {...input} />
            </Col>
          )}
        </Row>
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

