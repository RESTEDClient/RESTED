import React, { PropTypes } from 'react';
import { FormGroup } from 'react-bootstrap';

import Collapsable from '../Collapsable';

export function BasicAuthField({ meta }) {
  return (
    <Collapsable
      title="Basic auth"
      id="basicAuth"
    >
      <FormGroup
        controlId="method"
        validationState={meta.invalid ? 'error' : undefined}
      >
        BasicAuth
      </FormGroup>
    </Collapsable>
  );
}

BasicAuthField.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  meta: PropTypes.object.isRequired,
  /* eslint-enable react/forbid-prop-types */
};

export default BasicAuthField;

