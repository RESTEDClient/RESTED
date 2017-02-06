import React from 'react';

import { Panel } from './StyledComponents';
import HistoryList from './HistoryList';

export default function History() {
  return (
    <Panel header="">
      <HistoryList />
    </Panel>
  );
}

