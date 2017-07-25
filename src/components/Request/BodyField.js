import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, FieldArray } from 'redux-form';
import { FormGroup, FormControl, Row, Col, ControlLabel } from 'react-bootstrap';

import Fonticon from 'components/Fonticon';
import Collapsable from 'components/Collapsable';
import IconButton from 'components/IconButton';
import * as RequestActions from 'store/request/actions';
import { getBodyType } from 'store/request/selectors';

import { UnstyledButton, FormDataFields } from './StyledComponents';

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

function renderFormDataFields(props) {
  const { fields, meta } = props;
  return (
    <FormDataFields>
      {fields.map((field, key) => (
        <FormGroup
          key={key}
          controlId={`requestBodyGroup${key}`}
          validationState={meta.invalid ? 'error' : null}
        >
          <Col xs={5}>
            <Field
              name={`${field}.name`}
              component={renderField}
              placeholder="Name"
            />
          </Col>
          <Col xs={5}>
            <Field
              name={`${field}.value`}
              component={renderField}
              placeholder="Value"
            />
          </Col>
          <Col xs={2}>
            <IconButton
              id={`removeFormDataButton${key}`}
              tooltip="Remove form field"
              icon="trash"
              onClick={() => fields.remove(key)}
            />
          </Col>
        </FormGroup>
      ))}
      <Row>
        <Col xs={12}>
          <UnstyledButton
            id="addParameter"
            bsStyle="link"
            onClick={() => fields.push({})}
          >
            <Fonticon icon="plus" />
            Add parameter
          </UnstyledButton>
        </Col>
      </Row>
    </FormDataFields>
  );
}

/* eslint-disable react/no-unused-prop-types */
renderFormDataFields.propTypes = {
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

function renderSingleField({ input }) {
  return (
    <Col xs={12}>
      <FormGroup controlId="requestBody">
        <FormControl
          componentClass="textarea"
          rows={10}
          {...input}
        />
      </FormGroup>
    </Col>
  );
}

renderSingleField.propTypes = {
  input: PropTypes.shape({}).isRequired,
};

function renderBodyType({ input, changeBodyType }) {
  return (
    <FormGroup controlId="bodyType">
      <Col componentClass={ControlLabel} xs={2}>
        Type
      </Col>

      <Col xs={8}>
        <FormControl
          componentClass="select"
          placeholder="Body type"
          {...input}
          onChange={newVal => {
            changeBodyType(newVal.target.value);
            input.onChange(newVal);
          }}
        >
          <option value="custom">Custom</option>
          <option value="json">JSON</option>
          <option value="multipart">Multipart form data</option>
          <option value="urlencoded">URLencoded form data</option>
        </FormControl>
      </Col>
    </FormGroup>
  );
}

renderBodyType.propTypes = {
  input: PropTypes.shape({}).isRequired,
  changeBodyType: PropTypes.func.isRequired,
};

function renderDataField(type) {
  switch (type) {
    case 'json':
    case 'multipart':
    case 'urlencoded':
      return (
        <FieldArray
          name="formData"
          component={renderFormDataFields}
        />
      );
    default:
      return (
        <Field
          name="data"
          component={renderSingleField}
        />
      );
  }
}

export function BodyField({ bodyType, changeBodyType }) {
  return (
    <Collapsable title="Request body" id="requestBody">
      <Field
        name="bodyType"
        component={renderBodyType}
        changeBodyType={changeBodyType}
      />
      {renderDataField(bodyType)}
    </Collapsable>
  );
}

BodyField.defaultProps = {
  bodyType: 'json',
};

BodyField.propTypes = {
  bodyType: PropTypes.oneOf(['json', 'multipart', 'urlencoded', 'custom']),
  changeBodyType: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  bodyType: getBodyType(state),
});

export default connect(mapStateToProps, RequestActions)(BodyField);

