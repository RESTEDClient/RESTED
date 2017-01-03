import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { getFormValues, isInvalid, isPristine, touch } from 'redux-form';
import UUID from 'uuid-js';

import requestPropType from 'propTypes/request';
import collectionShape from 'propTypes/collection';
import { showChooseCollectionModal, showOptionsModal } from 'utils/modal';
import { getCollections } from 'store/collections/selectors';
import * as collectionsActions from 'store/collections/actions';
import * as modalActions from 'store/modal/actions';

function handleSubmit(props, collectionIndex = 0) {
  const addableRequest = Object.assign({}, props.request, {
    id: UUID.create().toString(),
  });

  props.addRequest(Immutable.fromJS(addableRequest), collectionIndex);
  props.removeModal();
}

function Titlebar(props) {
  const { collections, removeModal, formPristine, formInvalid } = props;

  return (
    <span>
      <h2>
        Request
      </h2>
      <button
        onClick={() => {
          if (formPristine || formInvalid) {
            // Set URL as touched to give feedback to user
            props.touch('request', 'url');
            return;
          }

          if (collections.size === 0) {
            props.addCollection();
            handleSubmit(props);
          } else if (collections.size === 1) {
            handleSubmit(props);
          } else {
            showChooseCollectionModal(props)
              .then(
                index => handleSubmit(props, index),
                removeModal,
              );
          }
          // if (requestExists)
          // Modal (do you want to replace?)
        }}
      >
        +
      </button>
      <button onClick={() => showOptionsModal(props)}>
        Options
      </button>
    </span>
  );
}

Titlebar.propTypes = {
  collections: ImmutablePropTypes.listOf(collectionShape),
  removeModal: PropTypes.func.isRequired,
  formPristine: PropTypes.bool.isRequired,
  formInvalid: PropTypes.bool.isRequired,
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
});

export default connect(mapStateToProps, {
  ...collectionsActions,
  ...modalActions,
  touch,
})(Titlebar);

