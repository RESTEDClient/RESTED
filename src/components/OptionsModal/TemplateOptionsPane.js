import React from 'react';
import { connect } from 'react-redux';
import { Col, Clearfix } from 'react-bootstrap';

function TemplateOptionsPane() {
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
      </Col>
    </Clearfix>
  );
}

const mapStateToProps = () => ({
});

export default connect(mapStateToProps)(TemplateOptionsPane);

