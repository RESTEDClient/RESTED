import Immutable from 'immutable';
import {
  FETCH_COLLECTIONS,
  RECEIVE_COLLECTIONS,
  ADD_REQUEST,
  REORDER_REQUEST,
  REORDER_COLLECTION,
} from './types';

export const initialState = Immutable.fromJS({
  collections: [],
  isFetching: false,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_COLLECTIONS: {
      return state.set('isFetching', true);
    }

    case RECEIVE_COLLECTIONS: {
      return state
        .set('isFetching', false)
        .set('collections', action.collections);
    }

    case ADD_REQUEST:
      return state
        .updateIn([
          'collections',
          action.collectionIndex,
          'requests',
        ], requests => (
          requests.unshift(action.request)
        ));

    case REORDER_COLLECTION: {
      const collection = state.getIn([
        'collections',
        action.oldIndex,
      ]);

      return state
        .deleteIn([
          'collections',
          action.oldIndex,
        ])
        .update('collections', collections => (
          collections.insert(action.newIndex, collection)
        ));
    }

    case REORDER_REQUEST: {
      const request = state
        .getIn([
          'collections',
          action.source.collectionIndex,
          'requests',
          action.source.requestIndex,
        ]);

      return state
        .deleteIn([
          'collections',
          action.source.collectionIndex,
          'requests',
          action.source.requestIndex,
        ])
        .updateIn([
          'collections',
          action.target.collectionIndex,
          'requests',
        ], requests => (
          requests.insert(action.target.requestIndex, request)
        ));
    }

    default:
      return state;
  }
}

