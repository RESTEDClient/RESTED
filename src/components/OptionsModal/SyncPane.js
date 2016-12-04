import React from 'react';
import { connect } from 'react-redux';
import { Clearfix, Col, Table, Checkbox } from 'react-bootstrap';

function SyncPane() {
  return (
    <Clearfix>
      <br />
      <Col xs={12}>
        <a
          href="https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/Storage/sync#Browser_compatibility"
          target="_blank"
          rel="noopener noreferrer"
          data-ng-if="!syncIsSupported()"
          className="red"
        >
          <p>Sync is not yet supported by your browser :(</p>
        </a>
        <Table>
          <tbody>
            <tr>
              <td>
                <Checkbox>
                  Enable BrowserSync
                  <p>
                    Synchronize collections, options and variables across all
                    browser sessions you are logged in to, for example from your
                    computer at work to your computer at home. Syncing from
                    Firefox to Chrome and vice versa does not work,
                    use export/import instead.
                  </p>
                  <p>
                    NOTE: Data is stored unencrypted, so do not enable if you
                    do not trust your browser vendor with your data
                  </p>
                </Checkbox>
              </td>
            </tr>
          </tbody>
        </Table>
      </Col>
    </Clearfix>
  );
}

const mapStateToProps = () => ({
});

export default connect(mapStateToProps)(SyncPane);

