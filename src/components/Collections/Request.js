import React from 'react';
import { connect } from 'react-redux';
import { DragSource, DropTarget } from 'react-dnd';
import { css } from 'aphrodite';
import flow from 'lodash.flow';

import * as Actions from '../../store/collections/actions';
import * as Type from './dropTypes';
import styles from './styles';

/**
 * Specifies the drag source contract.
 * Only `beginDrag` function is required.
 */
const requestSource = {
  canDrag() {
    // TODO Disallow drag if editing name
    return true;
  },

  beginDrag({ id, index, collectionIndex }) {
    return { id, index, collectionIndex };
  },
};

const requestTarget = {
  hover(props, monitor) {
    const dragIndex = monitor.getItem().index;
    const dragCollectionIndex = monitor.getItem().collectionIndex;
    const dragUUID = monitor.getItem().id;
    const hoverIndex = props.index;
    const hoverCollectionIndex = props.collectionIndex;
    const hoverUUID = props.id;

    // Abort further processing if dragged item is hovering over itself
    if (dragUUID === hoverUUID) {
      return;
    }

    // Note: we're mutating the monitor item here.
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    /* eslint-disable no-param-reassign */
    monitor.getItem().index = hoverIndex;
    monitor.getItem().collectionIndex = hoverCollectionIndex;
    /* eslint-enable no-param-reassign */

    // Update redux orders
    props.reorderRequest({
      // Source
      collectionIndex: dragCollectionIndex,
      requestIndex: dragIndex,
    }, {
      // Target
      collectionIndex: hoverCollectionIndex,
      requestIndex: hoverIndex,
    });
  },
};

function Request(props) {
  const {
    connectDragSource,
    connectDropTarget,
    isDragging,
    url,
  } = props;

  return connectDragSource(connectDropTarget(
    <li
      className={css(
        isDragging && styles.dragPlaceholder,
      )}
    >
      <div className="list-group">
        <a
          href="#"
          className={css(
            isDragging && styles.dragPlaceholder,
          )}
        >
          <h4 className="list-group-item-heading">
            {url}
          </h4>

          <p className="list-group-item-text">
            request.url
          </p>
        </a>
      </div>
    </li>
  ));
}

export default flow(
  DropTarget(Type.Request, requestTarget, connector => ({
    connectDropTarget: connector.dropTarget(),
  })),
  DragSource(Type.Request, requestSource, (connector, monitor) => ({
    connectDragSource: connector.dragSource(),
    isDragging: monitor.isDragging(),
  })),
  connect(null, Actions)
)(Request);

