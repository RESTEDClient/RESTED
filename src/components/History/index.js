import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Panel } from 'react-bootstrap';

import HistoryList from './HistoryList';

export default function History() {
  return (
    <Panel header="">
      <HistoryList />
    </Panel>
  );
}

