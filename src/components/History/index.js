import React from 'react';
import { Panel } from 'react-bootstrap';

import HistoryList from './HistoryList';

export default function History() {
  return (
    <Panel header="">
      <HistoryList />
    </Panel>
  );
}

