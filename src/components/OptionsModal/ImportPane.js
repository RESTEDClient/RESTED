import React from 'react';
import { connect } from 'react-redux';
import { Clearfix, Row, Col, Button, ButtonGroup, FormGroup, FormControl } from 'react-bootstrap';

function ImportPane() {
  return (
    <Clearfix>
      <br />
      <Col xs={12}>
        <p>
          Here you can import data from other sources.
          Two formats are currently supported, HTTP Archive
          (HAR) and Postman json.
        </p>
        <p>
          HAR is a format that can be exported directly
          from your favourite browser&apos;s network tools.
          This means you can do a request you would like
          to recreate or alter at a later date, and import
          it to your collected requests. See
          <a
            href="https://developer.mozilla.org/en-US/docs/Tools/Network_Monitor#CopySave_All_As_HAR"
            target="_blank"
            rel="noopener noreferrer"
          >
          this link</a> for details.
        </p>
        <p>
          An option to import data from Postman (Chrome extension)
          is also provided. In order to fetch a collection from
          postman, click the three dots next to a postman collection,
          click <code>download</code>, and copy the file&apos;s contents into
          the field below.
        </p>
        <section>
          <Col xs={12} className="text-center">
            <ButtonGroup>
              <Button
                class="btn btn-default"
                data-ng-class="{active: $parent.importMethod === 'HAR'}"
                data-ng-click="$parent.importMethod = 'HAR'"
              >
                HAR
              </Button>
              <Button
                class="btn btn-default"
                data-ng-class="{active: $parent.importMethod === 'Postman'}"
                data-ng-click="$parent.importMethod = 'Postman'"
              >
                Postman
              </Button>
            </ButtonGroup>
            <h4
              data-ng-bind="$parent.importFeedback"
              className="text-danger"
            >
            </h4>
          </Col>
          <Row>
            <Col xs={12}>
              <FormGroup>
                <FormControl
                  componentClass="textarea"
                  rows="20"
                />
              </FormGroup>
            </Col>
          </Row>
        </section>
      </Col>
    </Clearfix>
  );
}

const mapStateToProps = () => ({
});

export default connect(mapStateToProps)(ImportPane);

