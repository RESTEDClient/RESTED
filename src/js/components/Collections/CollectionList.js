import React from 'react';
import { Panel } from 'react-bootstrap';
import { connectDropTarget } from 'react-dnd';

import Collection from './Collection';

function CollectionList(props) {
  return (
    <Panel header={<h1>TODO</h1>}>
      <Collection />
    </Panel>
  );
}

export default CollectionList;

