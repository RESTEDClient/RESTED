import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash.flow';

import IconButton from 'components/IconButton';
import * as CollectionsActions from 'store/collections/actions';
import * as ModalActions from 'store/modal/actions';
import requestPropType from 'propTypes/request';
import selectText from 'utils/selectText';

import Request from './Request';
import { StyledCollection, StyledCollectionHeader } from './StyledComponents';
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

function PanelHeader(props) {
  const {
    name,
    collectionId,
    deleteCollection,
    toggleEdit,
    edit,
    renameCollection,
    onChange,
    setModalData,
    removeModal,
  } = props;

  return (
    <StyledCollectionHeader>
      {edit ? (
        <form onSubmit={renameCollection}>
          <label
            className="sr-only"
            htmlFor={`${name}.renameRequest`}
          >
            Request name
          </label>
          <input
            autoFocus
            onFocus={selectText}
            id={`${name}.renameRequest`}
            defaultValue={name}
            onChange={e => onChange(e.target.value)}
          />
          <IconButton
            tooltip="Save"
            icon="check"
          />
        </form>
      ) : (
        <h3>{name}</h3>
      )}

      <IconButton
        tooltip="Change name"
        icon="pencil"
        className="pull-right"
        onClick={toggleEdit}
      />
      <IconButton
        tooltip="Delete"
        icon="trash"
        className="pull-right"
        onClick={() => {
          setModalData({
            title: 'Goodbye collection',
            body: `You are about to delete the collection "${name}". ` +
              'Are you sure?',
            actions: [{
              text: 'Delete',
              click() {
                deleteCollection(collectionId);
                removeModal();
              },
            }],
          });
        }}
      />
      <hr />
    </StyledCollectionHeader>
  );
}

PanelHeader.propTypes = {
  name: PropTypes.string.isRequired,
  collectionId: PropTypes.string.isRequired,
  deleteCollection: PropTypes.func.isRequired,
  toggleEdit: PropTypes.func.isRequired,
  renameCollection: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  setModalData: PropTypes.func.isRequired,
  removeModal: PropTypes.func.isRequired,
  edit: PropTypes.bool.isRequired,
};

class Collection extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    deleteCollection: PropTypes.func.isRequired,
    requests: PropTypes.arrayOf(requestPropType).isRequired,
    collectionIndex: PropTypes.number.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    renameCollection: PropTypes.func.isRequired,
    setModalData: PropTypes.func.isRequired,
    removeModal: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.renameCollection = this.renameCollection.bind(this);
  }

  state = {
    edit: false,
  };

  toggleEdit() {
    this.setState({ edit: !this.state.edit });
  }

  handleInputChange(name) {
    this.setState({ name });
  }

  renameCollection(e) {
    e.preventDefault();
    const { collectionIndex, renameCollection } = this.props;

    this.setState({ edit: false });
    renameCollection(collectionIndex, this.state.name);
  }

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
      setModalData,
      removeModal,
    } = this.props;

    return connectDragSource(connectDropTarget(
      <div> {/* Need a wrapper div for React DnD support */}
        <StyledCollection isDragging={isDragging}>
          <PanelHeader
            name={name}
            collectionId={id}
            deleteCollection={deleteCollection}
            toggleEdit={this.toggleEdit}
            onChange={this.handleInputChange}
            renameCollection={this.renameCollection}
            setModalData={setModalData}
            removeModal={removeModal}
            edit={this.state.edit}
          />
          {requests.map((request, index) => (
            <Request
              key={request.id || index}
              index={index}
              collectionIndex={collectionIndex}
              request={request}
            />
          ))}
        </StyledCollection>
      </div>,
    ));
  }
}


export default flow(
  DropTarget(Type.Collection, collectionTarget, connector => ({
    connectDropTarget: connector.dropTarget(),
  })),
  DragSource(Type.Collection, collectionSource, (connector, monitor) => ({
    connectDragSource: connector.dragSource(),
    isDragging: monitor.isDragging(),
  })),
  connect(null, {
    ...CollectionsActions,
    ...ModalActions,
  }),
)(Collection);

