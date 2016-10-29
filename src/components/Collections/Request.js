import React from 'react';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';
import { Panel } from 'react-bootstrap';
import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash.flow';

import * as Actions from '../../store/collections/actions';
import * as Type from './dropTypes';

/**
 * Specifies which props to inject into your component.
 */
function collect(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDragSource: connect.dragSource(),
    // You can ask the monitor about the current drag state:
    isDragging: monitor.isDragging(),
  };
}

/**
 * Specifies the drag source contract.
 * Only `beginDrag` function is required.
 */
const requestSource = {
  canDrag(props) {
    // TODO Disallow drag if editing name
    return true;
  },

  beginDrag({ index, collectionIndex }) {
    return { index, collectionIndex };
  },
};

const requestTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const dragCollectionIndex = monitor.getItem().collectionIndex;
    const hoverIndex = props.index;
    const hoverCollectionIndex = props.collectionIndex;

    // Abort further processing if dragged item is hovering over itself
    if (dragIndex === hoverIndex
    && dragCollectionIndex === hoverCollectionIndex) {
      return;
    }

    // Update redux orders
    props.reorderRequest({
      // Source
      collectionIndex: dragCollectionIndex,
      requestIndex: dragIndex
    }, {
      // Target
      collectionIndex: hoverCollectionIndex,
      requestIndex: hoverIndex
    });

    // Note: we're mutating the monitor item here.
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
    monitor.getItem().collectionIndex = hoverCollectionIndex;
  }
};

class Request extends React.Component {
  render() {
    const {
      connectDragSource,
      connectDropTarget,
      url,
    } = this.props;

    return connectDragSource(connectDropTarget(
      <li data-ng-repeat="request in collection.requests | uuidAssign:'array' track by request.id"
        data-dnd-type="'request'"
        data-dnd-draggable="request"
        data-dnd-moved="handleMoved(collection, $index)">

        <div class="list-group">
          <a href="#"
            class="list-group-item"
            data-ng-class="{active: request == selectedRequest}"
            data-ng-click="selectRequest(request)">
            <h4 class="list-group-item-heading">
              {url}
              <div class="pull-right"
                id="removeRequest">
                <slidey-button data-config="removeRequestConfig"
                  data-click-event="removeFromCollection(collection, $index, $parent.$index)">
                </slidey-button>
              </div>
            </h4>

            <p class="list-group-item-text">
              request.url
            </p>
          </a>
        </div>
      </li>
    ));
  }
}

export default flow(
  DropTarget(Type.Request, requestTarget, connect => ({
     connectDropTarget: connect.dropTarget(),
  })),
  DragSource(Type.Request, requestSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  })),
  connect(null, Actions)
)(Request);

