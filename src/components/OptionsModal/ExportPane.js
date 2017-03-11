import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { Clearfix, Row, Col, Button, ButtonGroup, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import classNames from 'classnames';

import { toPostman, toHAR } from 'utils/export';
import encode from 'utils/base64';
import { getCollections } from 'store/collections/selectors';
import { immutableCollectionShape } from 'propTypes/collection';

class ExportPane extends React.Component {
  static propTypes = {
    collections: ImmutablePropTypes.listOf(immutableCollectionShape),
  };

  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.setSelectedCollection = this.setSelectedCollection.bind(this);
  }

  state = {
    exportMethod: 'HAR',
    selectedCollection: 0,
  };

  setMethod(exportMethod) {
    this.setState({ exportMethod });
  }

  setSelectedCollection(selectedCollection) {
    this.setState({ selectedCollection });
  }

  submit() {
    const { exportMethod, selectedCollection } = this.state;
    const { collections } = this.props;
    this.setState({ importFeedback: null });

    try {
      const collection = collections.get(selectedCollection).toJS();
      const requests = collection.requests;

      let exportText;
      if (exportMethod === 'HAR') {
        exportText = toHAR(requests, collection);
      } else {
        exportText = toPostman(requests, collection);
      }

      exportText = JSON.stringify(exportText, ' ', 2);

      this.setState({
        exportText,
        base64EncodedExportText: encode(exportText),
      });
    } catch (e) {
      this.setState({
        exportFeedback: `Error while exporting: ${e}`,
      });
    }
  }

  render() {
    const {
      exportMethod,
      exportFeedback,
      exportText,
      base64EncodedExportText,
      selectedCollection,
    } = this.state;
    const { collections } = this.props;

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
                  className={classNames({ active: exportMethod === 'HAR' })}
                  onClick={() => this.setMethod('HAR')}
                >
                  HAR
                </Button>
                <Button
                  className={classNames({ active: exportMethod === 'Postman' })}
                  onClick={() => this.setMethod('Postman')}
                >
                  Postman
                </Button>
              </ButtonGroup>
              <h4 className="text-danger">
                {exportFeedback}
              </h4>
            </Col>
            <FormGroup>
              <ControlLabel>
                Collection to export
              </ControlLabel>
              <FormControl
                componentClass="select"
                onSelect={this.setSelectedCollection}
              >
                {collections.map(collection => (
                  <option key={collection.get('id')}>
                    {collection.get('name')}
                  </option>
                ))}
              </FormControl>
            </FormGroup>
            <Row>
              <Col xs={12}>
                <FormGroup>
                  <FormControl
                    componentClass="textarea"
                    rows="20"
                    value={exportText}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <a
                  href={`data:text/plain;base64,${base64EncodedExportText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  download={`RESTED_export_${collections.getIn([selectedCollection, 'name'])}.txt`}
                >
                  Download
                </a>
                <i>
                  - Right click, Save Link as
                </i>
                <Button
                  bsStyle="primary"
                  className="pull-right"
                  onClick={this.submit}
                >
                  Export
                </Button>
              </Col>
            </Row>
          </section>
        </Col>
      </Clearfix>
    );
  }
}

const mapStateToProps = state => ({
  collections: getCollections(state),
});

export default connect(mapStateToProps)(ExportPane);

