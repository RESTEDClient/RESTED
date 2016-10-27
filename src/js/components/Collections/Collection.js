import React from 'react';
import { Panel } from 'react-bootstrap';
import flow from 'lodash.flow';

import Request from './Request';
import * as Type from './dropTypes';

function Collection() {
  return (
    <ul class="panel-body collection-body"
      data-ng-style="::{'display': collection.minimized ? 'none' : 'inherit'}"
      data-dnd-drop="handleDrop(item)"
      data-dnd-allowed-types="['request']"
      data-dnd-list="collection.requests">
      <Request index={0} name="foo"/>
      <Request index={1} name="bar"/>
      <Request index={2} name="baz"/>
      <Request index={3} name="qrux"/>
      <Request index={4} name="qwarp"/>
    </ul>
  );
}

export default Collection;

