import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import {
  FormGroup,
  FormControl,
  Button,
  Col,
} from 'react-bootstrap';

import Fonticon from 'components/Fonticon';
import Collapsable from 'components/Collapsable';
import IconButton from 'components/IconButton';

function renderField({ input, placeholder }) {
  return (
    <FormControl
      type="text"
      placeholder={placeholder}
      {...input}
    />
  );
}

renderField.propTypes = {
  input: PropTypes.shape({}).isRequired,
  placeholder: PropTypes.string.isRequired,
};

function HeadersField({ meta, fields }) {
  return (
    <Collapsable
      title="Headers"
      id="headers"
    >
      {fields.map((field, key) => (
        <FormGroup
          key={key}
          controlId={`header.${field}`}
          validationState={meta.invalid ? 'error' : null}
        >
          <Col xs={5}>
            <Field
              name={`${field}.name`}
              component={renderField}
              placeholder="Name"
            />
          </Col>
          <Col xs={6}>
            <Field
              name={`${field}.value`}
              component={renderField}
              placeholder="Value"
            />
          </Col>
          <Col xs={1}>
            <IconButton
              id={`removeHeaderButton${key}`}
              tooltip="Remove header"
              icon="trash"
              onClick={() => fields.remove(key)}
            />
          </Col>
        </FormGroup>
      ))}

      <Col xs={12}>
        <Button
          id="addHeaderButton"
          onClick={() => fields.push({})}
        >
          <Fonticon icon="plus" />
          Add header
        </Button>
      </Col>
    </Collapsable>
  );
}

// ESLint is not smart enough to see that these are used
/* eslint-disable react/no-unused-prop-types */
HeadersField.propTypes = {
  fields: PropTypes.shape({
    map: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
  }).isRequired,
  meta: PropTypes.shape({
    invalid: PropTypes.bool.isRequired,
  }).isRequired,
};
/* eslint-enable react/no-unused-prop-types */

export default HeadersField;

