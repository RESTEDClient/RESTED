import React from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { Panel } from 'react-bootstrap';
import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash.flow';

import Request from './Request';
import * as Actions from '../../store/collections/actions';
import * as Type from './dropTypes';

/**
 * Specifies the drag source contract.
 * Only `beginDrag` function is required.
 */
const collectionSource = {
  beginDrag({ collectionIndex }) {
    return { collectionIndex };
  },
};

const collectionTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().collectionIndex;
    const hoverIndex = props.collectionIndex;

    // Abort further processing if dragged item is hovering over itself
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

    // Update redux orders
    props.reorderCollection(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here.
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().collectionIndex = hoverIndex;
  }
};

class Collection extends React.Component {
  render() {
    const {
      requests,
      collectionIndex,
      connectDragSource,
      connectDropTarget,
      url,
    } = this.props;

    return connectDragSource(connectDropTarget(
      <div>
        <Panel
          header={<h1>TODO</h1>}
        >
          {requests.map((request, index) => (
            <Request
              key={request.id}
              index={index}
              collectionIndex={collectionIndex}
              {...request}
            />
          ))}
        </Panel>
      </div>
    ));
  }
}

export default flow(
  DropTarget(Type.Collection, collectionTarget, connect => ({
     connectDropTarget: connect.dropTarget(),
  })),
  DragSource(Type.Collection, collectionSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  })),
  connect(null, Actions)
)(Collection);


