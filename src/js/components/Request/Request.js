import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, propTypes } from 'redux-form';
import { Col, Panel } from 'react-bootstrap';

import URLField from './URLField';
import MethodField from './MethodField';
import HeadersField from './HeadersField';
import BasicAuthField from './BasicAuthField';

import * as Actions from '../../store/request/actions';

function Titlebar() {
  return (
    <span>
      Request
    </span>
  );
}

function Request({ handleSubmit, sendRequest }) {
  return (
    <Col xs={12} sm={8}>
      <Panel header={<Titlebar />}>
        <form onSubmit={handleSubmit(sendRequest)}>
          <Field
            name="url"
            component={URLField}
          />
          <Field
            name="method"
            component={MethodField}
          />
          <Field
            name="headers"
            component={HeadersField}
          />
          <Field
            name="basicAuth"
            component={BasicAuthField}
          />
        </form>
      </Panel>
    </Col>
  );
}

Request.propTypes = {
  ...propTypes,
};

const formOptions = {
  form: 'requestForm',
};

const mapDispatchToProps = dispatch => ({
  sendRequest(values) { dispatch(Actions.sendRequest(values)); },
});

export { Request };

/* eslint-disable no-func-assign */
Request = reduxForm(formOptions, mapDispatchToProps)(Request);
Request = connect(null, mapDispatchToProps)(Request);
/* eslint-enable no-func-assign */
export default Request;

