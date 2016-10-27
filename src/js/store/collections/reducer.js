import { randomURL } from '../../utils/requestUtils';
import {
  ADD_REQUEST,
  REORDER_REQUEST,
} from './types';

const initialState = {
  collections: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_REQUEST:
      return Object.assign({}, state, {
        collections: state.collections.map((collection) => {
          if (collection.id === action.collectionId) {
            collection.requests.push(action.request);
          }

          return collection;
        }),
      });

    case REORDER_REQUEST:
      return Object.assign({}, state, {
        collections: state.collections.map(collection => {
          if (collection.id === action.collectionId) {
            const requestIndex = collection.requests.findIndex(request => (
              request.id === action.requestId
            ));

            // Splice the request out..
            const requests = [
              ...collection.requests.slice(0, requestIndex),
              ...collection.requests.slice(requestIndex + 1)
            ];
            // .. and then back in at the correct index
            requests.splice(action.order, 0, collection.requests[requestIndex]);

            return Object.assign({}, collection, { requests });
          }

          return collection;
        })
      });

    default:
      return state;
  }
}

