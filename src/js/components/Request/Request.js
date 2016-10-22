import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, Fields, FieldArray, propTypes } from 'redux-form';
import { Panel } from 'react-bootstrap';

import URLField from './URLField';
import MethodField from './MethodField';
import HeadersField from './HeadersField';
import BasicAuthField from './BasicAuthField';

import * as Actions from '../../store/request/actions';
import { DEFAULT_REQUEST } from '../../constants/constants';

function Titlebar() {
  return (
    <span>
      Request
    </span>
  );
}

function Request({ placeholderUrl, handleSubmit, sendRequest }) {
  return (
    <Panel header={<Titlebar />}>
      <form onSubmit={handleSubmit(sendRequest)}>
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
      </form>
    </Panel>
  );
}

Request.propTypes = {
  placeholderUrl: PropTypes.string,
  ...propTypes,
};

const formOptions = {
  form: 'requestForm',
};

const mapStateToProps = ({ request: { placeholderUrl } }) => ({
  placeholderUrl,
  initialValues: DEFAULT_REQUEST,
});

export { Request };

/* eslint-disable no-func-assign */
Request = reduxForm(formOptions)(Request);
Request = connect(mapStateToProps, Actions)(Request);
/* eslint-enable no-func-assign */
export default Request;

