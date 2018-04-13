import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, Fields, FieldArray, getFormValues } from 'redux-form';
import { Row, Col, Panel, Form } from 'react-bootstrap';
import flow from 'lodash.flow';

import * as requestActions from 'store/request/actions';
import * as collectionsActions from 'store/collections/actions';
import { isEditMode } from 'store/config/selectors';
import { DEFAULT_REQUEST } from 'constants/constants';

import Titlebar from './Titlebar';
import URLField from './URLField';
import MethodField, { checkIfCustom } from './MethodField';
import SubmitButton from './SubmitButton';
import HeadersField from './HeadersField';
import BasicAuthField from './BasicAuthField';
import BodyField from './BodyField';

export const requestForm = 'request';

function Request(props) {
  const {
    formValues = {},
    placeholderUrl,
    handleSubmit,
    sendRequest,
    updateRequest,
    editMode,
  } = props;

  const isCustom = checkIfCustom(formValues.method);

  return (
    <Panel header={<Titlebar />}>
      <Form
        horizontal
        onSubmit={handleSubmit(editMode ? updateRequest : sendRequest)}
      >
        <Row>
          <Col sm={isCustom ? 4 : 2}>
            <Field
              name="method"
              component={MethodField}
            />
          </Col>
          <Col sm={isCustom ? 6 : 7}>
            <Field
              name="url"
              component={URLField}
              placeholderUrl={placeholderUrl}
            />
          </Col>
          <Col xsHidden mdHidden lgHidden sm={3}>
            <SubmitButton compact editMode={editMode} />
          </Col>
          <Col smHidden xs={12} md={3}>
            <SubmitButton compact={false} editMode={editMode} />
          </Col>
        </Row>

        <FieldArray
          name="headers"
          component={HeadersField}
        />
        <Fields
          names={['basicAuth.username', 'basicAuth.password']}
          component={BasicAuthField}
        />
        {!['GET', 'HEAD'].includes(formValues.method) && (
          <BodyField />
        )}
      </Form>
    </Panel>
  );
}

Request.propTypes = {
  placeholderUrl: PropTypes.string,
  formValues: PropTypes.shape({}),
  handleSubmit: PropTypes.func.isRequired,
  sendRequest: PropTypes.func.isRequired,
  updateRequest: PropTypes.func.isRequired,
  editMode: PropTypes.bool.isRequired,

};

const formOptions = {
  form: requestForm,
};

const mapStateToProps = state => ({
  useFormData: state.request.useFormData,
  placeholderUrl: state.request.placeholderUrl,
  initialValues: DEFAULT_REQUEST,
  formValues: getFormValues(requestForm)(state),
  editMode: isEditMode(state),
});

export { Request };
export default flow(
  reduxForm(formOptions),
  connect(mapStateToProps, {
    ...requestActions,
    ...collectionsActions,
  }),
)(Request);

