import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, propTypes } from 'redux-form';
import { Col, Panel } from 'react-bootstrap';

import URLField from './URLField';
import MethodField from './MethodField';
import HeadersField from './HeadersField';
import BasicAuthField from './BasicAuthField';

import * as Actions from '../../store/request/actions';
import { DEFAULT_REQUEST_METHOD } from '../../constants/constants';

function Titlebar() {
  return (
    <span>
      Request
    </span>
  );
}

function Request({ placeholderUrl, handleSubmit, sendRequest }) {
  return (
    <Col xs={12} sm={8}>
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
  placeholderUrl: PropTypes.string,
  ...propTypes,
};

const formOptions = {
  form: 'requestForm',
};

const mapStateToProps = ({ request: { placeholderUrl } }) => ({
  placeholderUrl,
  initialValues: {
    method: DEFAULT_REQUEST_METHOD,
  },
});

export { Request };

/* eslint-disable no-func-assign */
Request = reduxForm(formOptions)(Request);
Request = connect(mapStateToProps, Actions)(Request);
/* eslint-enable no-func-assign */
export default Request;

