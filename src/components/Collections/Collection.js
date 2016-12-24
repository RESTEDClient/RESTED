import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash.flow';

import * as Actions from 'store/collections/actions';
import requestPropType from 'propTypes/request';

import Request from './Request';
import { StyledCollection } from './styledComponents';
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
    // Ignore eslint no-use-find-dom-node here, as this seems to be the
    // recommended way of doing things in the docs
    /* eslint-disable react/no-find-dom-node */
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
    /* eslint-enable react/no-find-dom-node */

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

    // Note: we're mutating the monitor item here.
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    /* eslint-disable no-param-reassign */
    monitor.getItem().collectionIndex = hoverIndex;
    /* eslint-enable no-param-reassign */

    // Update redux orders
    props.reorderCollection(dragIndex, hoverIndex);
  },
};

function PanelHeader({ name, collectionId, deleteCollection }) {
  return (
    <span>
      <h3>{name}</h3>
      <button onClick={() => deleteCollection(collectionId)}>
        Delete
      </button>
      <hr />
    </span>
  );
}

PanelHeader.propTypes = {
  name: PropTypes.string.isRequired,
  collectionId: PropTypes.string.isRequired,
  deleteCollection: PropTypes.func.isRequired,
};

class Collection extends React.Component {
  render() {
    const {
      id,
      name,
      requests,
      collectionIndex,
      connectDragSource,
      connectDropTarget,
      isDragging,
      deleteCollection,
    } = this.props;

    return connectDragSource(connectDropTarget(
      <div> {/* Need a wrapper div for React DnD support */}
        <StyledCollection isDragging={isDragging}>
          <PanelHeader
            name={name}
            collectionId={id}
            deleteCollection={deleteCollection}
          />
          {requests.map((request, index) => (
            <Request
              key={request.id || index}
              index={index}
              collectionIndex={collectionIndex}
              {...request}
            />
          ))}
        </StyledCollection>
      </div>
    ));
  }
}

Collection.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  deleteCollection: PropTypes.func.isRequired,
  requests: PropTypes.arrayOf(requestPropType).isRequired,
  collectionIndex: PropTypes.number.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
};


export default flow(
  DropTarget(Type.Collection, collectionTarget, connector => ({
    connectDropTarget: connector.dropTarget(),
  })),
  DragSource(Type.Collection, collectionSource, (connector, monitor) => ({
    connectDragSource: connector.dragSource(),
    isDragging: monitor.isDragging(),
  })),
  connect(null, Actions)
)(Collection);

