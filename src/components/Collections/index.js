import React from 'react';
import { Panel } from 'react-bootstrap';

import CollectionList from './CollectionList';

function Titlebar() {
  return (
    <span>
      Add new collection
    </span>
  );
}

export default function Collections() {
  return (
    <Panel header={<Titlebar />}>
      <CollectionList />
    </Panel>
  );
}

