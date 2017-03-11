import ImmutablePropTypes from 'react-immutable-proptypes';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Col, Clearfix, Table, Button, FormControl } from 'react-bootstrap';

import Fonticon from 'components/Fonticon';
import * as Actions from 'store/urlVariables/actions';

function TemplateOptionsPane(props) {
  const {
    urlVariables,
    addTemplate,
    updateTemplate,
    deleteTemplate,
  } = props;

  return (
    <Clearfix>
      <br />
      <Col xs={12}>
        <p>
          You can include dynamic elements into your URLs. Simply type
          <code>{'{{something}}'}</code> into your URL, and
          then add <code>something</code> as a key here, along with
          a value for that key, and it will be resolved for you. This
          value will be resolved across all requests you have saved,
          making it great for things like API keys or IDs that you may
          have to change in several URLs at once.
        </p>
        <Table striped>
          <thead>
            <tr>
              <th>Key</th>
              <th>Value</th>
              <th />
            </tr>
          </thead>

          <tbody>
            {urlVariables.map((variable, i) => {
              const { name, value } = variable.toJS();

              return (
                <tr key={i}>
                  <td>
                    <FormControl
                      value={name}
                      placeholder="Key"
                      onChange={e => {
                        updateTemplate(i, {
                          name: e.target.value,
                          value,
                        });
                      }}
                    />
                  </td>
                  <td>
                    <FormControl
                      value={value}
                      placeholder="Value"
                      onChange={e => {
                        updateTemplate(i, {
                          name,
                          value: e.target.value,
                        });
                      }}
                    />
                  </td>
                  <td>
                    <Button
                      bsStyle="link"
                      title="Remove URL parameter"
                      onClick={() => deleteTemplate(i)}
                    >
                      <Fonticon icon="trash" />
                    </Button>
                  </td>
                </tr>
              );
            }).toArray()}

            <tr>
              <td colSpan="3">
                <Button
                  bsStyle="link"
                  title="Add a variable"
                  onClick={addTemplate}
                >
                  <Fonticon icon="plus" />
                  Add a variable
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </Col>
    </Clearfix>
  );
}

TemplateOptionsPane.propTypes = {
  addTemplate: PropTypes.func.isRequired,
  updateTemplate: PropTypes.func.isRequired,
  deleteTemplate: PropTypes.func.isRequired,
  urlVariables: ImmutablePropTypes.listOf(
    ImmutablePropTypes.contains({
      name: PropTypes.string,
      value: PropTypes.string,
    }),
  ).isRequired,
};

const mapStateToProps = state => ({
  urlVariables: state.urlVariables.get('urlVariables'),
});

export default connect(mapStateToProps, Actions)(TemplateOptionsPane);

