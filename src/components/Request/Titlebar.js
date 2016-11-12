import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { getFormValues } from 'redux-form';
import UUID from 'uuid-js';

import requestPropType from '../../propTypes/request';
import collectionShape from '../../propTypes/collection';
import * as collectionsActions from '../../store/collections/actions';
import * as modalActions from '../../store/modal/actions';

function Titlebar({ request, addRequest, collections }) {
  return (
    <span>
      <h2>
        Request
      </h2>
      <button
        onClick={() => {
          // TODO Validate form data before adding

          const addableRequest = Object.assign({}, request, {
            id: UUID.create().toString(),
          });

          if (collections.size === 1) {
            addRequest(addableRequest, 0);
          } else {
            console.error('Was not 1 length');
          }
          // if (requestExists)
          // setModalData({
          //   title: action.data.title,
          //   body: action.data.body,
          //   errorData: null,
          //   visible: true,
          //   cancelClick: action.data.cancelClick,
          //   actions: action.data.actions,
          // });
        }}
      >
        +
      </button>
    </span>
  );
}

Titlebar.propTypes = {
  request: requestPropType,
  collections: ImmutablePropTypes.listOf(collectionShape),
  addRequest: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  request: getFormValues('request')(state),
  collections: state.collections.get('collections'),
});

export default connect(mapStateToProps, {
  ...collectionsActions,
  ...modalActions,
})(Titlebar);

