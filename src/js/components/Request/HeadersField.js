import React, { PropTypes } from 'react';
import {
  FormGroup,
} from 'react-bootstrap';

import Collapsable from '../Collapsable';

function HeadersField({ meta }) {
  return (
    <Collapsable
      title="Headers"
      id="headers"
    >
      <FormGroup
        controlId="method"
        validationState={meta.invalid ? 'error' : undefined}
      >
        Headers
      </FormGroup>
    </Collapsable>
  );
}

HeadersField.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  meta: PropTypes.object.isRequired,
  /* eslint-enable react/forbid-prop-types */
};

export default HeadersField;

