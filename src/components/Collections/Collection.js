import React from 'react';
import { Panel } from 'react-bootstrap';
import flow from 'lodash.flow';

import Request from './Request';
import * as Type from './dropTypes';

function Collection(props) {
  return (
    <ul class="panel-body collection-body"
      data-ng-style="::{'display': collection.minimized ? 'none' : 'inherit'}"
      data-dnd-drop="handleDrop(item)"
      data-dnd-allowed-types="['request']"
      data-dnd-list="collection.requests">
      {props.requests.map((request, index) => (
        <Request
          key={request.id}
          index={index}
          collectionIndex={props.collectionIndex}
          {...request}
        />
      ))}
    </ul>
  );
}

export default Collection;

