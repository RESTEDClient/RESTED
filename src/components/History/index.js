import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import IconButton from 'components/IconButton';
import * as Actions from 'store/history/actions';

import { Panel } from './StyledComponents';
import HistoryList from './HistoryList';

function Titlebar({ clearHistory }) {
  return (
    <span className="clearfix">
      <IconButton
        onClick={clearHistory}
        tooltip="Clear history"
        icon="trash"
        className="pull-right"
      />
    </span>
  );
}

Titlebar.propTypes = {
  clearHistory: PropTypes.func.isRequired,
};

function History({ clearHistory }) {
  return (
    <Panel header={<Titlebar clearHistory={clearHistory} />}>
      <HistoryList />
    </Panel>
  );
}

History.propTypes = {
  clearHistory: PropTypes.func.isRequired,
};

export default connect(null, Actions)(History);

