import React from 'react';
import { connect } from 'react-redux';
import { Clearfix, Row, Col, Button, ButtonGroup, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

function ExportPane() {
  return (
    <Clearfix>
      <br />
      <Col xs={12}>
        <p>
          Here you can export data to other sources.
          Two formats are currently supported, HTTP Archive
          (HAR) and Postman json.
        </p>
        <p>
          HAR is a format that can be exported directly
          from your favourite browser&apos;s network tools.&nbsp;
          <a
            href="http://www.softwareishard.com/blog/har-adopters/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Click here
          </a>
          &nbsp;to learn more.
        </p>
        <p>
          Postman is a popular Google Chrome extension that is a
          REST client, just like RESTED.
          By using this export, you can cooperate with colleagues
          that use Postman, dispite them working with different tools.
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
              data-ng-bind="$parent.exportFeedback"
              className="text-danger"
            />
          </Col>
          <FormGroup>
            <ControlLabel>
              Collection to export
            </ControlLabel>
            <FormControl
              componentClass="select"
              data-ng-model="$parent.collectionToExport"
              data-ng-options="idx as c.name for (idx, c) in $root.collections"
            />
          </FormGroup>
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
          <Row>
            <Col xs={12}>
              <a
                data-ng-href="data:text/plain;base64,{{$parent.base64EncodedExportText}}"
                target="_blank"
                rel="noopener noreferrer"
                download="RESTED_export_{{$root.collections[collectionToExport].name}}.txt"
              >
                Download
              </a>
              <i>
                - Right click, Save Link as
              </i>
            </Col>
          </Row>
        </section>
      </Col>
    </Clearfix>
  );
}

const mapStateToProps = () => ({
});

export default connect(mapStateToProps)(ExportPane);

