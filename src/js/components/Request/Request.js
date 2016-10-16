import React from 'react';
import { reduxForm, Field, propTypes } from 'redux-form';
import { Col, Panel } from 'react-bootstrap';

import URLField from './URLField';

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

