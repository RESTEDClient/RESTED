import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Col, Row, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';

import * as Actions from 'store/config/actions';
import { isEditMode } from 'store/config/selectors';
import { REQUEST_METHODS } from 'constants/constants';

function MethodField({ input, meta, editMode }) {
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
        {editMode
          ? (
            <Button type="submit" bsStyle="success">
              Update request
            </Button>
          )
          : (
            <Button type="submit" bsStyle="primary">
              Send request
            </Button>
          )
        }
      </Col>
    </FormGroup>
  );
}

MethodField.propTypes = {
  editMode: PropTypes.bool.isRequired,
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

