import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { DragSource, DropTarget } from 'react-dnd';
import { ListGroup } from 'react-bootstrap';
import flow from 'lodash.flow';

import IconButton from 'components/IconButton';
import * as CollectionActions from 'store/collections/actions';
import * as RequestActions from 'store/request/actions';
import * as ConfigActions from 'store/config/actions';
import { isDefaultCompact } from 'store/options/selectors';
import { getEditingRequest } from 'store/config/selectors';
import selectText from 'utils/selectText';

import { StyledRequest, RequestButtons, MainContentDiv } from './StyledComponents';
import * as Type from './dropTypes';

/**
 * Specifies the drag source contract.
 */
const requestSource = {
  canDrag(props) {
    // Disallow drag if editing request
    return !props.isEditing;
  },

  beginDrag({ request, index, collectionIndex }) {
    return { request, index, collectionIndex };
  },
};

const requestTarget = {
  hover(props, monitor) {
    const dragIndex = monitor.getItem().index;
    const dragCollectionIndex = monitor.getItem().collectionIndex;
    const dragUUID = monitor.getItem().request.id;
    const hoverIndex = props.index;
    const hoverCollectionIndex = props.collectionIndex;
    const hoverUUID = props.request.id;

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

class Request extends React.Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    index: PropTypes.number.isRequired,
    collectionIndex: PropTypes.number.isRequired,
    renameRequest: PropTypes.func.isRequired,
    selectRequest: PropTypes.func.isRequired,
    sendRequest: PropTypes.func.isRequired,
    deleteRequest: PropTypes.func.isRequired,
    toggleEditMode: PropTypes.func.isRequired,
    isEditing: PropTypes.bool.isRequired,
    defaultCompact: PropTypes.bool.isRequired,
    request: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string,
      method: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }).isRequired,
  };

  state = {
    compact: this.props.defaultCompact,
  };

  toggleCompact = () => {
    this.setState({ compact: !this.state.compact });
  }

  toggleEdit = () => {
    this.props.toggleEditMode(this.props.request);
  }

  renameRequest = e => {
    const { collectionIndex, index, renameRequest } = this.props;
    e.preventDefault();

    this.toggleEdit();
    renameRequest(collectionIndex, index, this.nameRef.value);
  }

  renderRequest() {
    const { compact } = this.state;
    const { request, index, collectionIndex, isEditing } = this.props;
    const { method, name, url } = request;

    return (
      <div>
        {!compact && <h4>{method}</h4>}
        {isEditing ? (
          <form onSubmit={this.renameRequest}>
            <label
              className="sr-only"
              htmlFor={`${collectionIndex}.${index}.RequestName`}
            >
              Request name
            </label>
            <input
              autoFocus
              onFocus={selectText}
              id={`${collectionIndex}.${index}.RequestName`}
              defaultValue={name}
              ref={ref => { this.nameRef = ref; }}
            />
            <IconButton
              tooltip="Save"
              icon="check"
            />
          </form>
        ) : (
          name || url
        )}
      </div>
    );
  }

  render() {
    const { compact } = this.state;
    const {
      connectDragSource,
      connectDropTarget,
      isDragging,
      request,
      collectionIndex,
      selectRequest,
      sendRequest,
      deleteRequest,
      isEditing,
    } = this.props;

    return connectDragSource(connectDropTarget(
      <div>{/* Need a wrapper div for React DnD support */}
        <StyledRequest isDragging={isDragging}>
          <ListGroup componentClass="div">
            <div className="list-group-item">
              <RequestButtons compact={compact}>
                {!compact && (
                  <IconButton
                    tooltip="Toggle edit"
                    icon="cog"
                    onClick={this.toggleEdit}
                  />
                )}
                {compact && (
                  <IconButton
                    tooltip="Expand"
                    icon="plus"
                    onClick={this.toggleCompact}
                  />
                )}

                {!compact && !isEditing && (
                  <IconButton
                    tooltip="Minimize"
                    icon="minus"
                    onClick={this.toggleCompact}
                  />
                )}
                {!compact && isEditing && (
                  <IconButton
                    tooltip="Delete"
                    icon="trash"
                    onClick={() => deleteRequest(request.id, collectionIndex)}
                  />
                )}
              </RequestButtons>

              {isEditing ? (
                <MainContentDiv compact={compact}>
                  {this.renderRequest()}
                </MainContentDiv>
              ) : (
                <MainContentDiv
                  compact={compact}
                  onClick={() => selectRequest(request)}
                  onDoubleClick={() => sendRequest(request)}
                >
                  {this.renderRequest()}
                </MainContentDiv>
              )}
            </div>
          </ListGroup>
        </StyledRequest>
      </div>,
    ));
  }
}

const mapStateToProps = (state, props) => ({
  isEditing: getEditingRequest(state)
    ? getEditingRequest(state).id === props.request.id
    : false,
  defaultCompact: isDefaultCompact(state),
});

export default flow(
  DropTarget(Type.Request, requestTarget, connector => ({
    connectDropTarget: connector.dropTarget(),
  })),
  DragSource(Type.Request, requestSource, (connector, monitor) => ({
    connectDragSource: connector.dragSource(),
    isDragging: monitor.isDragging(),
  })),
  connect(mapStateToProps, {
    ...CollectionActions,
    ...RequestActions,
    ...ConfigActions,
  }),
)(Request);

