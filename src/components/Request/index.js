import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, Fields, FieldArray, propTypes, getFormValues } from 'redux-form';
import { Panel, Form } from 'react-bootstrap';
import flow from 'lodash.flow';

import * as requestActions from 'store/request/actions';
import requestValidation from 'utils/requestValidation';
import { DEFAULT_REQUEST } from 'constants/constants';

import Titlebar from './Titlebar';
import URLField from './URLField';
import MethodField from './MethodField';
import HeadersField from './HeadersField';
import BasicAuthField from './BasicAuthField';
import BodyField from './BodyField';

export const requestForm = 'request';

function Request(props) {
  const { formValues = {}, placeholderUrl, handleSubmit, sendRequest } = props;
  return (
    <Panel header={<Titlebar />}>
      <Form horizontal onSubmit={handleSubmit(sendRequest)}>
        <Field
          name="url"
          component={URLField}
          placeholderUrl={placeholderUrl}
        />
        <Field
          name="method"
          component={MethodField}
        />
        <FieldArray
          name="headers"
          component={HeadersField}
        />
        <Fields
          names={['basicAuth.username', 'basicAuth.password']}
          component={BasicAuthField}
        />
        {['POST', 'PUT', 'PATCH', 'CUSTOM'].includes(formValues.method) && (
          <BodyField />
        )}
      </Form>
    </Panel>
  );
}

Request.propTypes = {
  placeholderUrl: PropTypes.string,
  ...propTypes,
};

const formOptions = {
  form: requestForm,
  validate: requestValidation,
};

const mapStateToProps = state => ({
  useFormData: state.request.useFormData,
  placeholderUrl: state.request.placeholderUrl,
  initialValues: DEFAULT_REQUEST,
  formValues: getFormValues(requestForm)(state),
});

export { Request };

export default flow(
  reduxForm(formOptions),
  connect(mapStateToProps, requestActions),
)(Request);

