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

  beginDrag({ id, index }) {
    return { id, index };
  },
};

const requestTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;
    console.log('dragIndex, hoverIndex', dragIndex, hoverIndex);

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    console.log("Invoking moveCard", dragIndex, hoverIndex);
    props.moveCard(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  }
};

class Request extends React.Component {
  render() {
    const { connectDragSource, connectDropTarget, name } = this.props;

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
              {name}
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

