import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { Alert, Clearfix, Col, Table, Checkbox } from 'react-bootstrap';

import syncIsSupported from 'utils/syncIsSupported';
import replicateStorage from 'utils/replicateStorage';
import * as OptionsActions from 'store/options/actions';
import * as ModalActions from 'store/modal/actions';

function showTargetModal() {
  this.setModalData({
    title: 'Enabling sync storage',
    body: 'You have existing data in your sync storage. Would you like ' +
      'to replace your local data with the data in the sync storage, ' +
      'or would you like to upload your local data and replace the sync' +
      'storage data?',
    actions: [{
      text: 'Upload local data to sync',
      click: () => {
        replicateStorage(false);
        this.removeModal();
      },
    }, {
      text: 'Download sync data to local',
      click: () => {
        replicateStorage(true);
        this.removeModal();
      },
    }],
  });
}

function replicate(targetLocal) {
  if (!targetLocal) {
    // FF does not support this. Show modal
    if (!chrome.storage.sync.getBytesInUse) {
      showTargetModal.call(this);
      return;
    }

    chrome.storage.sync.getBytesInUse(null, usage => {
      if (usage > 0) {
        showTargetModal.call(this);
      } else {
        replicateStorage(true);
      }
    });
  } else {
    replicateStorage(false);
  }
}

function SyncPane(props) {
  const { options, updateOption } = props;

  return (
    <Clearfix>
      <br />
      <Col xs={12}>
        {!syncIsSupported() && (
          <a
            href="https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/Storage/sync#Browser_compatibility"
            target="_blank"
            rel="noopener noreferrer"
            className="red"
          >
            <p>Sync is not yet supported by your browser :(</p>
          </a>
        )}
        <Table>
          <tbody>
            <tr>
              <td>
                <Checkbox
                  checked={options.get('sync', false)}
                  disabled={!syncIsSupported()}
                  onChange={e => {
                    updateOption('sync', e.target.checked);
                    replicate.call(props, !e.target.checked);
                  }}
                >
                  Enable BrowserSync
                  <p>
                    Synchronize collections, options and variables across all
                    browser sessions you are logged in to, for example from your
                    computer at work to your computer at home. Syncing from
                    Firefox to Chrome and vice versa does not work,
                    use export/import instead.
                  </p>
                  <Alert bsStyle="warning">
                    Data is stored unencrypted, so do not enable if you
                    do not trust your browser vendor with your data!
                  </Alert>
                </Checkbox>
              </td>
            </tr>
          </tbody>
        </Table>
      </Col>
    </Clearfix>
  );
}

SyncPane.propTypes = {
  updateOption: PropTypes.func.isRequired,
  options: ImmutablePropTypes.map,
};

const mapStateToProps = state => ({
  options: state.options.get('options'),
});

export default connect(mapStateToProps, {
  ...OptionsActions,
  ...ModalActions,
})(SyncPane);

