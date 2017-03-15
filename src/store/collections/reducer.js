import Immutable from 'immutable';

import newCollection from 'utils/newCollection';
import {
  FETCH_COLLECTIONS,
  RECEIVE_COLLECTIONS,
  ADD_COLLECTION,
  DELETE_COLLECTION,
  ADD_REQUEST,
  DELETE_REQUEST,
  TOGGLE_COLLAPSED,
  REORDER_REQUEST,
  REORDER_COLLECTION,
  RENAME_COLLECTION,
  RENAME_REQUEST,
  UPDATE_REQUEST,
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

    case ADD_COLLECTION:
      return state
        .update('collections', collections => (
          collections.push(
            newCollection(collections.toJS(), action.requests),
          )
        ));

    case DELETE_COLLECTION:
      return state
        .update('collections', collections => (
          collections.filter(collection => (
            collection.get('id') !== action.collectionId
          ))
        ));

    case ADD_REQUEST:
      return state
        .updateIn([
          'collections',
          action.collectionIndex,
          'requests',
        ], requests => (
          requests.unshift(action.request)
        ));

    case DELETE_REQUEST:
      return state
        .updateIn([
          'collections',
          action.collectionIndex,
          'requests',
        ], requests => (
          requests.filter(request => (
            request.get('id') !== action.requestId
          ))
        ));

    case TOGGLE_COLLAPSED:
      return state
        .updateIn([
          'collections',
          action.collectionIndex,
          'minimized',
        ], minimized => !minimized);

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

    case RENAME_COLLECTION:
      return state
        .setIn([
          'collections',
          action.collectionIndex,
          'name',
        ], action.name);

    case RENAME_REQUEST:
      return state
        .setIn([
          'collections',
          action.collectionIndex,
          'requests',
          action.requestIndex,
          'name',
        ], action.name);

    case UPDATE_REQUEST:
      return state
        .setIn([
          'collections',
          action.collectionIndex,
          'requests',
          action.requestIndex,
        ], Immutable.fromJS(action.request));

    default:
      return state;
  }
}

