import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';
import { Panel } from 'react-bootstrap';
import { DragSource, DropTarget } from 'react-dnd';
import { css } from 'aphrodite';
import flow from 'lodash.flow';

import Request from './Request';
import styles from './styles';
import * as Type from './dropTypes';

import * as Actions from '../../store/collections/actions';
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

class Collection extends React.Component {
  render() {
    const {
      name,
      requests,
      collectionIndex,
      connectDragSource,
      connectDropTarget,
      isDragging,
    } = this.props;

    return connectDragSource(connectDropTarget(
      <div>
        <Panel
          header={<h1>{name}</h1>}
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
  name: PropTypes.string.isRequired,
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

