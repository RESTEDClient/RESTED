import React from 'react';
import { reduxForm, Field, propTypes } from 'redux-form';
import { Col, Panel } from 'react-bootstrap';

import URLField from './URLField';
import MethodField from './MethodField';
import HeadersField from './HeadersField';
import BasicAuthField from './BasicAuthField';

function Titlebar() {
  return (
    <span>
      Request
    </span>
  );
}

function Request() {
  return (
    <Col xs={12} sm={8}>
      <Panel header={<Titlebar />}>
        <form>
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

export { Request };
export default reduxForm(formOptions)(Request);

