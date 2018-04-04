import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Col, Row, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

import * as Actions from 'store/config/actions';
import { isEditMode } from 'store/config/selectors';
import { REQUEST_METHODS } from 'constants/constants';

export function checkIfCustom(value) {
  return !REQUEST_METHODS.slice(0, -1).includes(value);
}
function MethodField({ input, meta }) {
  const isCustom = checkIfCustom(input.value);

  return (
    <FormGroup
      controlId="method"
      validationState={meta.invalid ? 'error' : undefined}
    >

      <Col sm={12}>
        <Row>
          <Col xs={isCustom ? 6 : 12}>

            <ControlLabel
              bsClass="pseudo-hidden"
            >
              Method
            </ControlLabel>

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
    </FormGroup>
  );
}

MethodField.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  /* eslint-enable react/forbid-prop-types */
};

const mapStateToProps = state => ({
  editMode: isEditMode(state),
});

export { MethodField };
export default connect(mapStateToProps, Actions)(MethodField);

