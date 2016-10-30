import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { Panel } from 'react-bootstrap';
import { DragSource, DropTarget } from 'react-dnd';
import { css } from 'aphrodite';
import flow from 'lodash.flow';

import Request from './Request';
import styles from './styles';
import * as Type from './dropTypes';

import requestPropType from '../../propTypes/request';

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

class Collection extends React.Component {
  render() {
    const {
      requests,
      collectionIndex,
      connectDragSource,
      connectDropTarget,
      isDragging,
    } = this.props;

    return connectDragSource(connectDropTarget(
      <div>
        <Panel
          header={<h1>TODO</h1>}
          className={css(
            isDragging && styles.dragPlaceholder,
          )}
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

Collection.propTypes = {
  requests: PropTypes.arrayOf(requestPropType).isRequired,
  collectionIndex: PropTypes.number.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
};


export default flow(
  DropTarget(Type.Collection, collectionTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
  })),
  DragSource(Type.Collection, collectionSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  })),
  /*
   * There is a weird bug where if we connect(null, Actions) here,
   * dragging between collection produces artifact requests in the
   * old collection, even though the redux store is updated. So
   * instead we pass reorderCollection as a prop, working around
   * the issue.
   *
   * It may be an issue with a redux optimization gone wrong, idk.
   */
)(Collection);

