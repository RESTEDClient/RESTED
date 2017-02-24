import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { getFormValues, isInvalid, isPristine, touch } from 'redux-form';
import UUID from 'uuid-js';

import requestPropType from 'propTypes/request';
import collectionShape from 'propTypes/collection';
import IconButton from 'components/IconButton';
import { showChooseCollectionModal, showOptionsModal } from 'utils/modal';
import { getCollections } from 'store/collections/selectors';
import { getCollectionsMinimized } from 'store/options/selectors';
import * as collectionsActions from 'store/collections/actions';
import * as modalActions from 'store/modal/actions';
import * as optionsActions from 'store/options/actions';

function handleSubmit(props, collectionIndex = 0) {
  const addableRequest = Object.assign({}, props.request, {
    id: UUID.create().toString(),
  });

  props.addRequest(Immutable.fromJS(addableRequest), collectionIndex);
  props.removeModal();
}

function toggleCollectionsExpanded({ collectionsMinimized, updateOption }) {
  updateOption('collectionsMinimized', !collectionsMinimized);
}

function Titlebar(props) {
  const {
    collections,
    removeModal,
    formPristine,
    formInvalid,
    collectionsMinimized,
  } = props;

  return (
    <span className="clearfix">
      <h2 className="pull-left">
        Request
      </h2>
      <IconButton
        onClick={() => {
          if (formPristine || formInvalid) {
            // Set URL as touched to give feedback to user
            props.touch('request', 'url');
            return;
          }

          switch (collections.size) {
            case 0:
              props.addCollection();
            case 1: // eslint-disable-line no-fallthrough
              handleSubmit(props);
              break;
            default:
              showChooseCollectionModal(props).then(
                index => handleSubmit(props, index),
                removeModal,
              );
          }
          // if (requestExists)
          // Modal (do you want to replace?)
        }}
        tooltip="Add to collection"
        icon="plus"
        className="pull-right"
      />
      <IconButton
        onClick={() => showOptionsModal(props)}
        tooltip="Options"
        icon="cog"
        className="pull-right"
      />
      <IconButton
        onClick={() => toggleCollectionsExpanded(props)}
        tooltip={`${collectionsMinimized ? 'Show' : 'Hide'} collections`}
        icon={collectionsMinimized ? 'compress' : 'expand'}
        className="pull-right"
      />
    </span>
  );
}

Titlebar.propTypes = {
  collections: ImmutablePropTypes.listOf(collectionShape),
  removeModal: PropTypes.func.isRequired,
  formPristine: PropTypes.bool.isRequired,
  formInvalid: PropTypes.bool.isRequired,
  collectionsMinimized: PropTypes.bool.isRequired,
  /* eslint-disable react/no-unused-prop-types */
  touch: PropTypes.func.isRequired,
  addCollection: PropTypes.func.isRequired,
  request: requestPropType,
  addRequest: PropTypes.func.isRequired,
  setModalData: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  request: getFormValues('request')(state),
  formPristine: isPristine('request')(state),
  formInvalid: isInvalid('request')(state),
  collections: getCollections(state),
  collectionsMinimized: getCollectionsMinimized(state),
});

export default connect(mapStateToProps, {
  ...collectionsActions,
  ...modalActions,
  ...optionsActions,
  touch,
})(Titlebar);

