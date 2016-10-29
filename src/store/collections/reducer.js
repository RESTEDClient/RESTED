import { randomURL } from '../../utils/requestUtils';
import {
  ADD_REQUEST,
  REORDER_REQUEST,
  REORDER_COLLECTION,
} from './types';

const initialState = {
  // TODO Replace mock data with collections: []
  collections: [{
    name: 'Collection',
    id: 'some-collection-UUID',
    minimized: true,
    requests: [{
      id: 'some-request-UUID1',
      url: 'www.foo.no',
      method: 'POST',
      data: '',
      useFormData: true,
      formData: [
        {
          name: 'BodyOfPOST...',
          value: '...SentViaFormData'
        }
      ],
      headers: [
       {
         name: 'Content-Type',
         value: 'angular/awesomeness'
       }
      ]
    }],
  }, {
    name: 'Collection 2',
    id: 'some-collection-UUID2',
    minimized: true,
    requests: [{
      id: 'some-request-UUID2',
      url: 'www.foo.no',
      method: 'POST',
      data: '',
      useFormData: true,
      formData: [
        {
          name: 'BodyOfPOST...',
          value: '...SentViaFormData'
        }
      ],
      headers: [
       {
         name: 'Content-Type',
         value: 'angular/awesomeness'
       }
      ]
    }, {
      id: 'some-request-UUID3',
      url: 'www.bar.no',
      method: 'POST',
      data: '',
      useFormData: true,
      formData: [
        {
          name: 'BodyOfPOST...',
          value: '...SentViaFormData'
        }
      ],
      headers: [
       {
         name: 'Content-Type',
         value: 'angular/awesomeness'
       }
      ]
    }, {
      id: 'some-request-UUID4',
      url: 'www.baz.no',
      method: 'POST',
      data: '',
      useFormData: true,
      formData: [
        {
          name: 'BodyOfPOST...',
          value: '...SentViaFormData'
        }
      ],
      headers: [
       {
         name: 'Content-Type',
         value: 'angular/awesomeness'
       }
      ]
    }],
  }]
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

    case REORDER_COLLECTION: {
      const collection = state.collections.splice(action.oldIndex, 1)[0];
      return Object.assign({}, state, {
        collections: [
          ...state.collections.slice(0, action.newIndex),
          collection,
          ...state.collections.slice(action.newIndex),
        ],
      });
    }

    case REORDER_REQUEST: {
      const request = state
        .collections[action.source.collectionIndex]
        .requests
        .splice(action.source.requestIndex, 1)[0];

      return Object.assign({}, state, {
        collections: state.collections.map((collection, index) => (
          index === action.target.collectionIndex
            ? Object.assign({}, collection, {
              requests: [
                ...collection.requests.slice(0, action.target.requestIndex),
                request,
                ...collection.requests.slice(action.target.requestIndex),
              ],
            })
            :  collection
        ))
      });
    }

    default:
      return state;
  }
}

